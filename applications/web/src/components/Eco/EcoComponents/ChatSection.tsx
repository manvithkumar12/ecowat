import { Sparkles, User } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Message } from "../EcoBot";
interface ChatProps {
  isTyping: boolean;
  messages: Message[];
}
const ChatSection = ({ isTyping, messages }: ChatProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5 bg-card/10">
      {messages.map((msg) => {
        const isBot = msg.sender === "bot";
        return (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-[85%] ${
              isBot ? "self-start" : "self-end flex-row-reverse text-right"
            }`}
          >
            {/* Avatar Badge */}
            <div
              className={`h-7 w-7 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold shadow-xs ${
                isBot
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/10"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              {isBot ? (
                <Sparkles className="h-3.5 w-3.5" />
              ) : (
                <User className="h-3.5 w-3.5" />
              )}
            </div>

            {/* Bubble Text Card */}
            <div
              className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed border ${
                isBot
                  ? "bg-card text-foreground border-border/30 rounded-tl-sm text-left whitespace-pre-line"
                  : "bg-primary text-primary-foreground border-primary rounded-tr-sm text-left"
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex gap-3 max-w-[85%] self-start">
          <div className="h-7 w-7 rounded-full shrink-0 flex items-center justify-center bg-emerald-500/10 text-emerald-500 border border-emerald-500/10 shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="bg-card text-muted-foreground border border-border/30 rounded-2xl rounded-tl-sm px-4 py-3 text-[13px] flex items-center gap-1.5 shadow-xs">
            <span
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        </div>
      )}

      {/* Anchor Scroll Ref */}
      <div ref={chatEndRef} />
    </div>
  );
};

export default ChatSection;
