import { Bot } from "lucide-react";
import { EckyModelResponse } from "@ecowat/shared";
import { UserQuery } from "./AgentReplys/AgentReplys";
import ReplyTypes from "./ReplyTypes";
import EckyResError from "./EckyResError";
import { UserAppliancesProvider } from "@/src/context/userAppliances";

interface Props {
  messages: EckyModelResponse[];
  isThinking: boolean;
  handleSendMessage: (query: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<EckyModelResponse[]>>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const ChatSection = ({
  messages,
  isThinking,
  setMessages,
  handleSendMessage,
  messagesEndRef,
}: Props) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 py-6 relative w-full max-w-5xl mx-auto z-10 no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="space-y-6 pb-32 w-full">
        {messages.map((message, index) => {
          const isBot = message.role === "assistant";
          const isMsgError = message.action === "systemError";
          console.log(message);
          return (
            <div key={index} className="w-full">
              {isBot ? (
                <div className="flex gap-2.5 sm:gap-4 items-start animate-fade-in">
                  <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center shrink-0 border bg-emerald-500/10 border-emerald-500/20 text-emerald-500 shadow-sm">
                    <Bot className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Ecky AI
                      </span>
                    </div>
                    <div
                      className={`text-xs sm:text-sm px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl w-fit max-w-[92%] sm:max-w-[85%] ${
                        isMsgError
                          ? "bg-red-500/10 dark:bg-red-950/10 border border-red-500/30 text-red-600 dark:text-red-400 shadow-sm"
                          : "bg-white dark:bg-[#0f0f0f] border border-slate-150 dark:border-[#1e1e1e] shadow-sm text-slate-800 dark:text-slate-100"
                      } overflow-x-auto`}
                    >
                      {isMsgError ? (
                        <EckyResError
                          message={message}
                          setMessages={setMessages}
                          handleSendMessage={handleSendMessage}
                          messages={messages}
                        />
                      ) : (
                        <ReplyTypes
                          messageId={message.messageId}
                          role={message.role}
                          message={message.message}
                          action={message.action}
                          parameters={message.parameters}
                          isThinking={isThinking}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <UserQuery text={message.message} />
              )}
            </div>
          );
        })}

        {isThinking && (
          <div className="flex gap-2.5 sm:gap-4 items-start animate-pulse">
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm bg-emerald-50/20 dark:bg-emerald-950/10">
              <div className="absolute inset-0 rounded-xl border border-dashed border-black dark:border-white animate-spin" />
              <Bot className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-emerald-500 " />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-400">
                  Ecky AI is thinking
                </span>
              </div>
              <div className="w-full max-w-[92%] sm:max-w-md bg-white dark:bg-[#0f0f0f] border border-slate-150 dark:border-[#1e1e1e] p-3 sm:p-4 rounded-2xl shadow-sm space-y-3">
                <div className="h-3.5 bg-emerald-100 dark:bg-emerald-950/40 rounded-full w-3/4 animate-pulse" />
                <div className="h-3.5 bg-emerald-100 dark:bg-emerald-950/40 rounded-full w-5/6 animate-pulse" />
                <div className="h-3.5 bg-emerald-100 dark:bg-emerald-950/40 rounded-full w-1/2 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatSection;
