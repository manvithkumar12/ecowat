"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@teispace/next-themes";
import InitialState from "./components/InitialState";
import ChatSection from "./components/ChatSection";
import InputBox from "./components/InputBox";
import { getBgStyle } from "@/src/utils/ecky/backgroundClr";
import { EckyModelResponse, useEckyModel } from "@ecowat/shared";
import { handleSendMessage as handleSendMessageUtil } from "@/src/utils/ecky/handleSendMessage";

export default function EckyClient() {
  const { mutate, isPending, error, isError } = useEckyModel();
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<EckyModelResponse[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("Ecky-Chat");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("Ecky-Chat", JSON.stringify(messages.slice(-50)));
  }, [messages]);

  const [showPlusTooltip, setShowPlusTooltip] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null,
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { resolvedTheme } = useTheme();

  const handleSendMessage = (text: string) => {
    handleSendMessageUtil(text, {
      setMessages,
      setInputVal,
      setShowPlusTooltip,
      setStreamingMessageId,
      messages,
      inputVal,
      showPlusTooltip,
      streamingMessageId,
      isPending,
      mutate,
    });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, isPending]);

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "/" || e.code === "Slash")) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isInitialState = messages.length === 0;

  return (
    <div
      style={getBgStyle(resolvedTheme)}
      className="flex-1 flex flex-col h-[calc(100vh-4rem)] transition-all relative overflow-scroll"
    >
      {isInitialState ? (
        <InitialState
          setShowPlusTooltip={setShowPlusTooltip}
          inputRef={inputRef}
          showPlusTooltip={showPlusTooltip}
          inputVal={inputVal}
          setInputVal={setInputVal}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <ChatSection
          messages={messages}
          isThinking={isPending}
          handleSendMessage={handleSendMessage}
          setMessages={setMessages}
          messagesEndRef={messagesEndRef}
        />
      )}

      {!isInitialState && (
        <InputBox
          handleSendMessage={handleSendMessage}
          inputVal={inputVal}
          setInputVal={setInputVal}
          isThinking={isPending}
          streamingMessageId={streamingMessageId}
          showPlusTooltip={showPlusTooltip}
          setShowPlusTooltip={setShowPlusTooltip}
          inputRef={inputRef}
        />
      )}
    </div>
  );
}
