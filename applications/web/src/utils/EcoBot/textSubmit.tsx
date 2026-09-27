import React from "react";
import { Message } from "../../components/Eco/EcoBot";
import { BotSteps } from "@ecowat/shared";

interface TextSubmitProps {
  currentStep: number;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  updateUserData: (field: string, value: any) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  formatText: (text: string, name: string) => string;
}
export const handleTextSubmit = (
  text: string,
  {
    currentStep,
    setUserName,
    updateUserData,
    setMessages,
    setIsTyping,
    setCurrentStep,
    formatText,
  }: TextSubmitProps,
) => {
  if (currentStep === 2) {
    setUserName(text);
    updateUserData("name", text);
  }
  const userMsg: Message = {
    id: `user-text-${Date.now()}`,
    sender: "user",
    text: text,
  };
  setMessages((prev) => [...prev, userMsg]);
  setIsTyping(true);
  setTimeout(() => {
    setIsTyping(false);

    const targetStep = BotSteps[currentStep].nextStep || currentStep + 1;
    setCurrentStep(targetStep);

    const nextStepData = BotSteps[targetStep];
    if (nextStepData) {
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: formatText(
          nextStepData.question || nextStepData.Info || "",
          text,
        ),
      };
      setMessages((prev) => [...prev, botMsg]);
    }
  }, 850);
};
