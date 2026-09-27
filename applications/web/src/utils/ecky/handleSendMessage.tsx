import { EckyModelResponse } from "@ecowat/shared";
import { UseMutateFunction } from "@tanstack/react-query";

export type data = {
  setMessages: React.Dispatch<React.SetStateAction<EckyModelResponse[]>>;
  setInputVal: React.Dispatch<React.SetStateAction<string>>;
  setShowPlusTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  setStreamingMessageId: React.Dispatch<React.SetStateAction<string | null>>;
  messages: EckyModelResponse[];
  inputVal: string;
  showPlusTooltip: boolean;
  streamingMessageId: string | null;
  isPending: boolean;
  mutate: UseMutateFunction<EckyModelResponse, Error, string, unknown>;
};

export const handleSendMessage = (text: string, data: data) => {
  if (!text.trim()) return;

  const userMsg: EckyModelResponse = {
    messageId: Math.random().toString(36).substring(7),
    role: "user",
    message: text,
    action: "",
  };

  data.setMessages((prev) => [...prev, userMsg]);
  data.setInputVal("");
  data.setShowPlusTooltip(false);

  data.mutate(text, {
    onSuccess: (response) => {
      const botMsgId = response.messageId;
      const botMsg: EckyModelResponse = {
        messageId: botMsgId,
        role: "assistant",
        message: response.message,
        action: response.action || "",
        parameters: response.parameters || null,
      };
      data.setMessages((prev) => [...prev, botMsg]);
      data.setStreamingMessageId(botMsgId);

      const words = (response.message ?? "No response received").split(" ");
      let currentWordIndex = 0;
      let currentContent = "";

      const interval = setInterval(() => {
        if (currentWordIndex < words.length) {
          currentContent +=
            (currentWordIndex === 0 ? "" : " ") + words[currentWordIndex];
          data.setMessages((prev) =>
            prev.map((msg) =>
              msg.messageId === botMsgId
                ? { ...msg, message: currentContent }
                : msg,
            ),
          );
          currentWordIndex++;
        } else {
          clearInterval(interval);
          data.setStreamingMessageId(null);
        }
      }, 30);
    },
    onError: (error: any) => {
      console.error(error);
      const botMsgId = Math.random().toString(36).substring(7);
      const botMsg: EckyModelResponse = {
        messageId: botMsgId,
        role: "assistant",
        message: error?.message || "Sorry, model is not reachable",
        action: "systemError",
      };
      data.setMessages((prev) => [...prev, botMsg]);
    },
  });
};
