import json
import os
import uuid
import time
import re
import requests
from dotenv import load_dotenv
from langchain_core.runnables import RunnableLambda
from ecky.utils.toolPrompt import get_tool_messages
from ecky.utils.extractJson import extract_json
from ecky.utils.allowedTools import use_allowed_tools

HF_API_URL = os.getenv("ECKY_URL", "http://localhost:11434/api/chat").strip()
USER_ID = "08334a7b-52ee-415c-a365-1b5dceea83e0"
session_history: dict = {}

def call_llm(messages: list) -> str:
    """Calls the model API with standard OpenAI/ChatML messages."""
    payload = {
        "model": "hf.co/manvith09/ecowat:Q4_K_M",
        "messages": messages,
        "options": {"temperature": 0, "seed": 42},
        "stream": False,
    }
    response = requests.post(HF_API_URL, json=payload, timeout=300)
    response.raise_for_status()
    data = response.json()
    return data.get("response") or data.get("message", {}).get("content", "")

model = RunnableLambda(call_llm)

tool_prompt = RunnableLambda(lambda x: get_tool_messages(x["user_query"], history=x.get("history", [])))


def parse_tool_output(content_str: str) -> dict:
    assistant_msg = {"role": "assistant", "content": content_str, "tool_calls": []}
    
    # 1. Check for all <tool_call>...</tool_call> tags (support single or multiple tool calls)
    tool_matches = re.findall(r"<tool_call>(.*?)</tool_call>", content_str, re.DOTALL)
    if tool_matches:
        for idx, match in enumerate(tool_matches, 1):
            try:
                tool_data = json.loads(match.strip())
                tool_id = str(tool_data.get("id") or idx)
                assistant_msg["tool_calls"].append({
                    "id": tool_id,
                    "type": "function",
                    "function": {
                        "name": tool_data.get("name"),
                        "arguments": tool_data.get("arguments", {})
                    }
                })
            except Exception:
                pass
        if assistant_msg["tool_calls"]:
            return assistant_msg

    # 2. Check for markdown code fence with JSON or direct JSON array/object
    trimmed = content_str.strip()
    if trimmed.startswith("```"):
        lines = trimmed.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].startswith("```"):
            lines = lines[:-1]
        trimmed = "\n".join(lines).strip()

    if (trimmed.startswith("{") and trimmed.endswith("}")) or (trimmed.startswith("[") and trimmed.endswith("]")):
        try:
            parsed = json.loads(trimmed)
            if isinstance(parsed, list):
                for idx, item in enumerate(parsed, 1):
                    if isinstance(item, dict) and "name" in item:
                        tool_id = str(item.get("id") or idx)
                        assistant_msg["tool_calls"].append({
                            "id": tool_id,
                            "type": "function",
                            "function": {
                                "name": item.get("name"),
                                "arguments": item.get("arguments") or item.get("parameters", {})
                            }
                        })
                if assistant_msg["tool_calls"]:
                    return assistant_msg
            elif isinstance(parsed, dict) and "name" in parsed:
                tool_id = str(parsed.get("id") or "1")
                assistant_msg["tool_calls"].append({
                    "id": tool_id,
                    "type": "function",
                    "function": {
                        "name": parsed.get("name"),
                        "arguments": parsed.get("arguments") or parsed.get("parameters", {})
                    }
                })
                return assistant_msg
        except Exception:
            pass

    return assistant_msg

tool_parser = RunnableLambda(parse_tool_output)

response_parser = RunnableLambda(extract_json)

tool_chain = tool_prompt | model | tool_parser
synthesis_chain = model | response_parser

def invoke_agent(user_query: str, user_id: str = USER_ID):
    start_time = time.time()
    history = session_history.get(user_id, [])[-6:]

    assistant_msg = tool_chain.invoke({"user_query": user_query, "history": history})
    tool_calls = assistant_msg.get("tool_calls", [])

    if tool_calls:
        print(f"\n[Tool Selection] Detected {len(tool_calls)} tool call(s):")
        for tc in tool_calls:
            fn = tc.get("function", {})
            print(f"  -> Function: {fn.get('name')} | Arguments: {json.dumps(fn.get('arguments', {}))}")

        conversation = get_tool_messages(user_query, history=history)
        conversation.append({"role": "assistant", "tool_calls": tool_calls})

        for i, tool_call in enumerate(tool_calls):
            tool_name = tool_call.get("function", {}).get("name")
            tool_args = tool_call.get("function", {}).get("arguments", {})
            tool_id = str(tool_call.get("id") or str(i + 1))

            print(f"\n[Tool Executing] Running tool '{tool_name}' with args: {tool_args}")
            tool_result = use_allowed_tools(tool_name, tool_args)
            print(f"[Tool Output] Result: {json.dumps(tool_result, indent=2) if isinstance(tool_result, (dict, list)) else tool_result}")

            tool_content = json.dumps(tool_result) if not isinstance(tool_result, str) else tool_result
            conversation.append({
                "role": "tool",
                "tool_call_id": tool_id,
                "content": tool_content
            })

        content = synthesis_chain.invoke(conversation)
    else:
        print(f"\n[Tool Selection] No tool called. Model raw output:\n{assistant_msg.get('content')}\n")
        content = response_parser.invoke(assistant_msg.get("content", ""))

    result = {
        "role": "assistant",
        "message": content.get("message", assistant_msg.get("content", "")),
        "messageId": f"{uuid.uuid4()}_{user_id}",
        "action": content.get("action", "answer"),
        "parameters": content.get("parameters", {})
    }

    if user_id not in session_history:
        session_history[user_id] = []
    session_history[user_id].append({"role": "user", "content": user_query})
    session_history[user_id].append({"role": "assistant", "content": result.get("message", "")})

    return result
