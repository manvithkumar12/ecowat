import { EckyModelResponse } from "@ecowat/shared";
import { AlertTriangle } from "lucide-react";
import React from "react";

interface EckyError {
  message: EckyModelResponse;
  setMessages: React.Dispatch<React.SetStateAction<EckyModelResponse[]>>;
  handleSendMessage: (query: string) => void;
  messages: EckyModelResponse[];
}
const EckyResError = ({
  message,
  setMessages,
  handleSendMessage,
  messages,
}: EckyError) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4.5 w-4.5 text-red-500 shrink-0" />
        <span className="font-semibold">{message.message}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          const msgIndex = messages.findIndex(
            (m) => m.messageId === message.messageId,
          );
          if (msgIndex > 0) {
            const prevMsg = messages[msgIndex - 1];
            if (prevMsg && prevMsg.role === "user") {
              setMessages((prev) =>
                prev.filter(
                  (m) =>
                    m.messageId !== message.messageId &&
                    m.messageId !== prevMsg.messageId,
                ),
              );
              handleSendMessage(prevMsg.message);
            }
          }
        }}
        className="text-left text-xs font-bold underline text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 w-fit cursor-pointer"
      >
        Try again
      </button>
    </div>
  );
};

export default EckyResError;
