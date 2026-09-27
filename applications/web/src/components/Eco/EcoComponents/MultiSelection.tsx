import React from "react";
import { Check, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { Message } from "../EcoBot";
import { BotSteps } from "@ecowat/shared";
import { MultiSelectionProps } from "@ecowat/shared";

const MultiSelection: React.FC<MultiSelectionProps> = ({
  setMessages,
  isTyping,
  setIsTyping,
  submitUserData,
  currentStep,
  setUserData,
  setCurrentStep,
  userName,
  stepData,
  userData,
  selectedAppliances,
  setSelectedAppliances,
  onClose,
  customInput,
  setCustomInput,
  handleCustomSend,
}) => {
  const router = useRouter();
  const hasOptions = !!(stepData && (stepData.options || stepData.multiSelect));

  const formatText = (text: string, name: string) => {
    return text.replace(/\${name}/g, name || "Guest");
  };

  const handleOptionClick = async (opt: {
    label: string;
    nextStep?: number;
    exit?: boolean;
  }) => {
    if (currentStep === 3) {
      setUserData((prev) => ({
        ...prev,
        houseSize: Number.parseInt(opt.label),
      }));
    }
    if (currentStep === 5) {
      setUserData((prev) => ({
        ...prev,
        hasSolar: opt.label === "Yes" ? true : false,
      }));
    }
    if (currentStep === 6) {
      setUserData((prev) => ({
        ...prev,
        monthlyConsumption: opt.label,
      }));
    }
    if (currentStep === 7) {
      const res = await submitUserData(userData);
      if (!res) {
        setCurrentStep(500);
        return;
      }
    }
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: opt.label,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      if (opt.exit) {
        const currentStepData = BotSteps[currentStep];
        if (currentStepData && currentStepData.navUrl) {
          router.push(currentStepData.navUrl);
        }
        onClose();
        return;
      }

      const targetStep =
        opt.nextStep || BotSteps[currentStep].nextStep || currentStep + 1;
      setCurrentStep(targetStep);

      const nextStepData = BotSteps[targetStep];
      if (nextStepData) {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: formatText(
            nextStepData.question || nextStepData.Info || "",
            userName,
          ),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    }, 850);
  };

  const handleMultiSubmit = () => {
    if (selectedAppliances.length === 0) return;
    setUserData((prev) => ({
      ...prev,
      appliances: selectedAppliances,
    }));
    const selectedText = `Selected: ${selectedAppliances.join(", ")}`;
    const userMsg: Message = {
      id: `user-multi-${Date.now()}`,
      sender: "user",
      text: selectedText,
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
            userName,
          ),
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    }, 850);
  };

  return (
    <div className="border-t border-border/40 p-4 shrink-0 bg-background/90 backdrop-blur-md flex flex-col gap-3">
      {!isTyping && stepData && stepData.multiSelect && stepData.values && (
        <div className="flex flex-col gap-2.5 pt-1">
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto border border-border/40 rounded-xl p-2 bg-muted/10 w-full scrollbar-thin">
            <div className="grid grid-cols-2 gap-1.5">
              {stepData.values.map((val: string) => {
                const isSelected = selectedAppliances.includes(val);
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setSelectedAppliances((prev) =>
                        prev.includes(val)
                          ? prev.filter((v) => v !== val)
                          : [...prev, val],
                      );
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border text-left flex items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-card border-border hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`h-3.5 w-3.5 rounded-sm border shrink-0 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border bg-background"
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5" />}
                    </span>
                    <span className="truncate">{val}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <button
            type="button"
            onClick={handleMultiSubmit}
            disabled={selectedAppliances.length === 0}
            className="w-full h-9 rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/95 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-1"
          >
            Confirm Selected ({selectedAppliances.length})
          </button>
        </div>
      )}

      {/* Render Standard Quick-Reply Buttons if step has options and isn't multi-select */}
      {!isTyping && stepData && !stepData.multiSelect && stepData.options && (
        <div className="flex flex-wrap gap-2 pt-1">
          {stepData.options.map((opt: any) => (
            <button
              key={opt.label}
              onClick={() => handleOptionClick(opt)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-border bg-card hover:bg-muted/80 text-foreground transition-all cursor-pointer shadow-2xs"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Custom Text input bar */}
      <form
        onSubmit={handleCustomSend}
        className="relative flex items-center mt-1"
      >
        <input
          type="text"
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          disabled={hasOptions}
          placeholder={
            hasOptions
              ? "Please select an option above..."
              : stepData && stepData.inputType === "text"
                ? "Type your answer..."
                : "Ask anything about grid forecast..."
          }
          className="h-10 w-full rounded-full border border-border/60 bg-muted/20 px-4 pr-12 text-xs outline-none transition-all focus:border-primary focus:bg-background placeholder:text-muted-foreground/60 disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-muted/10"
        />
        <button
          type="submit"
          disabled={hasOptions}
          className="absolute right-1.5 h-7 w-7 rounded-full bg-primary hover:bg-primary/95 text-primary-foreground flex items-center justify-center cursor-pointer transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Send message"
        >
          <Send className="h-3 w-3" />
        </button>
      </form>
    </div>
  );
};

export default MultiSelection;
