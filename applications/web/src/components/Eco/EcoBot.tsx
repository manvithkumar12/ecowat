"use client";
import React, { useState } from "react";
import { BotSteps } from "@ecowat/shared";
import EcoNavbar from "./EcoComponents/EcoNavbar";
import ChatSection from "./EcoComponents/ChatSection";
import MultiSelection from "./EcoComponents/MultiSelection";
import { handleTextSubmit } from "@/src/utils/EcoBot/textSubmit";
import { useUser } from "@/src/context/userContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EcoBotProps {
  onClose: () => void;
}

export interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}
export type UserData = {
  name: string;
  houseSize: number;
  appliances: string[];
  hasSolar: boolean;
  monthlyConsumption: string;
};

const EcoBot: React.FC<EcoBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      text: BotSteps[1].question || BotSteps[1].Info || "",
    },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [userName, setUserName] = useState("");
  const stepData = BotSteps[currentStep];
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
  const user = useUser();
  const [userData, setUserData] = useState({
    name: "",
    houseSize: 0,
    appliances: [] as string[],
    hasSolar: false,
    monthlyConsumption: "",
  });
  const updateUserData = (field: string, value: any) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatText = (text: string, name: string) => {
    return text.replace(/\${name}/g, name || "Guest");
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput;
    setCustomInput("");

    const stepData = BotSteps[currentStep];
    if (stepData && stepData.inputType === "text") {
      handleTextSubmit(userText, {
        currentStep,
        setUserName,
        updateUserData,
        setMessages,
        setIsTyping,
        setCurrentStep,
        formatText,
      });
      return;
    }

    const userMsg: Message = {
      id: `user-custom-${Date.now()}`,
      sender: "user",
      text: userText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      const botResponse: Message = {
        id: `bot-reply-${Date.now()}`,
        sender: "bot",
        text: "That is a great question! Based on today's real-time grid forecasts, shifting your heavy electricity usage away from the evening peak hours (4 PM - 9 PM) will reduce grid demand and lower your bills. I highly recommend scheduling major appliances in our optimized green window (2 PM - 4 PM)!",
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const router = useRouter();

  const submitUserData = async (data: UserData) => {
    try {
      const res = await fetch("/api/energyRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        router.refresh();
      }
      return res.ok;
    } catch (error) {
      toast.error("SOMETHING_WRONG");
      return false;
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-199 bg-black/30 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 bottom-0 z-200 w-full md:w-[40%] md:rounded-bl-3xl md:rounded-tl-3xl bg-background border-l border-border/40 shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
        <EcoNavbar onClose={onClose} />

        <ChatSection isTyping={isTyping} messages={messages} />

        <MultiSelection
          userData={userData}
          submitUserData={submitUserData}
          setMessages={setMessages}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          currentStep={currentStep}
          setUserData={setUserData}
          setCurrentStep={setCurrentStep}
          userName={userName}
          stepData={stepData}
          selectedAppliances={selectedAppliances}
          setSelectedAppliances={setSelectedAppliances}
          onClose={onClose}
          customInput={customInput}
          setCustomInput={setCustomInput}
          handleCustomSend={handleCustomSend}
        />
      </div>
    </>
  );
};

export default EcoBot;
