"use client";
import EcoBot from "@/src/components/Eco/EcoBot";
import { useUser } from "@/src/context/userContext";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

interface EcoButtonProps {
  label?: string;
}

const EcoButton = ({ label = "Get Started" }: EcoButtonProps) => {
  const [bot, setBot] = useState(false);
  const router = useRouter();
  const user = useUser();
  const handleNavigation = () => {
    if (!user || !user.id) {
      router.push("/login");
      return;
    }
    if (user?.hasEnergyId === false) {
      setBot(true);
    } else {
      router.push("/dashboard");
    }
  };
  return (
    <>
      <button
        onClick={() => handleNavigation()}
        className="inline-flex items-center justify-center px-6 py-3 rounded-md text-[13px] font-semibold bg-primary text-primary-foreground hover:bg-primary/95 transition-all text-center shadow-xs cursor-pointer"
      >
        {label}
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
      {bot && <EcoBot onClose={() => setBot(false)} />}
    </>
  );
};

export default EcoButton;
