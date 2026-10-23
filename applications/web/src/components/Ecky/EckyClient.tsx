"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@teispace/next-themes";
import InitialState from "./components/InitialState";
import ChatSection from "./components/ChatSection";
import InputBox from "./components/InputBox";
import { getBgStyle } from "@/src/utils/ecky/backgroundClr";
import { EckyModelResponse, useEckyModel } from "@ecowat/shared";
import { handleSendMessage as handleSendMessageUtil } from "@/src/utils/ecky/handleSendMessage";
import { Info } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EckyClient() {
  const { mutate, isPending, error, isError } = useEckyModel();
  const t = useTranslations("Dashboard.eckyNotice");
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
      <aside
        role="status"
        className="mx-4 mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"
      >
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="leading-relaxed">
            <strong>{t("title")}</strong>{" "}
            {t("message")}{" "}
            <a
              href="https://colab.research.google.com/drive/1awqBBa1jCy6iFEIhvVUGiin9IxKQsq3H?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-200"
            >
              {t("colabLink")}
            </a>
            . {t("demoMessage")}{" "}
            <a
              href="https://drive.google.com/file/d/1OBhJwa-JKujGQfJoutZCm2jYz9Z9jIJP/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="font-semibold underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-200"
            >
              {t("demoLink")}
            </a>
            .
          </p>
        </div>
      </aside>

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
