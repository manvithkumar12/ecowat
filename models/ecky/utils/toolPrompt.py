import json
import datetime
from zoneinfo import ZoneInfo
from ecky.utils.tools import TOOLS
from langchain_core.prompts import PromptTemplate

def format_available_tools(tools):
    tool_sections = []
    for i, tool in enumerate(tools, 1):
        arg_keys = ", ".join(tool.get("Arguments", {}).keys())
        tool_str = (
            f"{i}. {tool['name']}({arg_keys})\n"
            f"Description: {tool['info']}\n"
            f"Arguments:\n"
            f"{json.dumps(tool.get('Arguments', {}))}"
        )
        tool_sections.append(tool_str)
    return "\n\n".join(tool_sections)


AVAILABLE_TOOLS_TEXT = format_available_tools(TOOLS)


def get_current_context():
    now = datetime.datetime.now(ZoneInfo("Europe/Berlin"))
    today = now.date()
    next_7_days = today + datetime.timedelta(days=6)
    last_7_days_start = today - datetime.timedelta(days=6)
    return (
        f"Current Date: {today.isoformat()} ({now.strftime('%A')})\n"
        f"Current Time: {now.strftime('%H:%M')} (Europe/Berlin)\n"
        f"This week (past 7 days): {last_7_days_start.isoformat()} to {today.isoformat()}\n"
        f"Upcoming 7 Days: {today.isoformat()} to {next_7_days.isoformat()}"
    )


TOOL_DISAMBIGUATION = """
CRITICAL DISTINCTION — SAVED vs SCHEDULED:
1. "SCHEDULED APPLIANCES" / "SCHEDULE" / "RUNNING TODAY" ("is it in my scheduled appliances", "is X scheduled", "what is scheduled today", "show my schedule"):
   → ALWAYS use `userScheduledAppliances` (with applianceName=["<appliance>"]).
   → NEVER use `isSavedAppliance` for questions containing "scheduled" or "schedule"!
2. "SAVED APPLIANCES" / "REGISTERED" / "MY APPLIANCES" ("is it in my saved appliances", "do I have X saved", "is X in my appliances", "my saved appliances"):
   → Use `isSavedAppliance` (to check specific appliance) or `userSavedAppliances` (to list all).
   → NEVER use `userScheduledAppliances` when the user specifically asks about saved appliances!

Other tool selections:
- "usage", "consumption", "how much did I use", "kWh", "cost", "spent on electricity", "electricity bill", "my usage this week/today/yesterday" → use useUserUsage
- "is X running between time A and B", "is X scheduled from HH:MM to HH:MM" (with specific start and end time) → use isScheduled
- "schedule X", "schedule appliance X to run at HH:MM", "run X at HH:MM", "set run time for X" → use addScheduleAppliance
- "add X to my appliances", "save X", "add appliance X", "register X to dashboard" → use addSavedAppliance
- "delete X from my appliances", "remove X from saved appliances", "delete appliance X", "delete X and Y from dashboard" → use deleteSavedAppliance
- "edit X in my appliances", "update X in saved appliances", "modify appliance X", "change power/usage of X" → use editSavedAppliance
- "recommendations", "best time to run", "cheapest time to run X" → use useRecommendations
- "live price", "current electricity price right now" → use useLivePrice
- "today's prices", "cheapest slot today", "price chart today" → use PriceDataToday
- "historical price", "past price", "price last week" → use usePriceHistory
- "predicted price", "future price", "price next week" → use usePredictedPrice
- "predicted consumption", "forecast my usage", "next week consumption" → use userWeeklyconsumptionPredicted
- "renewable", "green energy", "solar", "wind forecast" → use useRenewableData
- "is X allowed", "can I add X to EcoWat" → use isApplianceAllowed
- "what appliances are supported", "list allowed appliances" → use useAllowedAppliances
- "what is EcoWat", "how does EcoWat work", "general EcoWat question" → use useEcowat
- "Germany electricity news", "electricity market", "regulations" → use UseSerp
"""


TOOL_PROMPT_TEMPLATE = PromptTemplate.from_template("""You are the EcoWatt assistant. Use ONLY the tools listed below. Never invent information.

Context:
{context}

{TOOL_DISAMBIGUATION}

Available tools:

{AVAILABLE_TOOLS_TEXT}

Tool Call Format:
To invoke a tool, you MUST respond in this exact format:
<tool_call>
{{"name": "tool_name", "arguments": {{"arg_name": "value"}}}}
</tool_call>

Rules:
- For questions asking for a good time to use an appliance AND whether it is scheduled (or any multi-part question), call BOTH tools before answering (emit multiple <tool_call> tags).
- For questions about user schedules, saved appliances, usage, prices, recommendations, or status, you MUST ALWAYS call the corresponding tool(s) using <tool_call>.
- NEVER answer from memory or hallucination whether an appliance is saved, scheduled, or running. ALWAYS call the corresponding tool first.
- When the user uses pronouns like "it", "this appliance", resolve the appliance name from previous conversation turns and pass it to the tool (e.g. applianceName=["EV Charger"]).
- Never invent parameters or time ranges not explicitly mentioned by the user.
- Only include optional parameters if explicitly mentioned or resolved from context.
- If the user asks for overall usage, all appliances, or does not name specific appliances, do NOT pass applianceName (never pass "all").
""")

def get_tool_prompt():
    context = get_current_context()
    return TOOL_PROMPT_TEMPLATE.format(
        context=context,
        TOOL_DISAMBIGUATION=TOOL_DISAMBIGUATION,
        AVAILABLE_TOOLS_TEXT=AVAILABLE_TOOLS_TEXT,
    )


def get_tool_messages(user_query: str, history: list = None):
    """
    Returns the message payload to prompt the model for tool calls,
    including previous conversation history if available.
    """
    msgs = [
        {
            "role": "system",
            "content": get_tool_prompt()
        }
    ]
    if history:
        msgs.extend(history)
    msgs.append({
        "role": "user",
        "content": user_query
    })
    return msgs