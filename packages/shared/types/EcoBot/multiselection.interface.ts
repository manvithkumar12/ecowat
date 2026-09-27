import { Message, UserData } from "@/src/components/Eco/EcoBot";

export interface MultiSelectionProps {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  userName: string;
  userData: UserData;
  submitUserData: (data: UserData) => Promise<boolean>;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  stepData: any;
  selectedAppliances: string[];
  setSelectedAppliances: React.Dispatch<React.SetStateAction<string[]>>;
  onClose: () => void;
  customInput: string;
  setCustomInput: React.Dispatch<React.SetStateAction<string>>;
  handleCustomSend: (e: React.FormEvent) => void;
}
