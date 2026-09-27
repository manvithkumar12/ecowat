import { useUser } from "@/src/context/userContext";
import {
  ArrowUp,
  Plus,
  X,
  Lightbulb,
  Zap,
  LineChart,
  Calendar,
} from "lucide-react";
import { RefObject } from "react";
import Image from "next/image";

interface InitialProps {
  setShowPlusTooltip: (val: boolean) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  showPlusTooltip: boolean;
  inputVal: string;
  setInputVal: (val: string) => void;
  handleSendMessage: (val: string) => void;
}

const quickActions = [
  {
    id: "ac",
    title: "Optimize AC Use",
    desc: "How can I optimize my AC use to save on peak grid tariffs?",
    icon: Lightbulb,
  },
  {
    id: "grid",
    title: "Grid Status Updates",
    desc: "Analyze cheap tariff times for today.",
    icon: Zap,
  },
  {
    id: "bills",
    title: "Weekly Cost Analysis",
    desc: "Analyze my weekly energy bills and costs.",
    icon: LineChart,
  },
  {
    id: "appliances",
    title: "Appliance Scheduling",
    desc: "Recommend high-energy appliance scheduling.",
    icon: Calendar,
  },
];

const InitialState = ({
  setShowPlusTooltip,
  inputRef,
  showPlusTooltip,
  inputVal,
  setInputVal,
  handleSendMessage,
}: InitialProps) => {
  const userName = useUser()?.name || "User";
  return (
    <div className="flex-1 flex flex-col overflow-y-auto px-4 md:px-6 lg:px-8 py-6 relative z-10">
      <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full mb-16 animate-fade-in">
        <div className="mb-6 relative group">
          <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-500/10 blur-xl rounded-full scale-75 group-hover:scale-110 transition-transform duration-500" />
          <Image
            src="/dark_logo.png"
            alt="Ecky Logo"
            width={200}
            height={64}
            className="h-14 md:h-16 w-auto block dark:hidden object-contain relative z-10 transition-transform hover:scale-102"
          />
          <Image
            src="/white_logo.png"
            alt="Ecky Logo"
            width={200}
            height={64}
            className="h-14 md:h-16 w-auto hidden dark:block object-contain relative z-10 transition-transform hover:scale-102"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-5xl font-light tracking-tight text-center mb-6 sm:mb-8 text-slate-800 dark:text-white px-4">
          Hi {userName}, let's get into it
        </h1>

        <div className="w-full max-w-2xl mb-6 px-3 sm:px-0 transition-all duration-300 flex flex-col items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="w-full flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2.5 rounded-full bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-emerald-500 shadow-[0_10px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_40px_rgba(16,185,129,0.05)] dark:ring-2 dark:ring-emerald-500/20 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all"
          >
            {/* Left Plus Add Button */}
            <div className="relative flex items-center justify-center pl-1">
              <button
                type="button"
                onClick={() => setShowPlusTooltip(!showPlusTooltip)}
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-slate-100 dark:hover:bg-[#1a1a1a] text-slate-500 dark:text-slate-400 flex items-center justify-center transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-hover:text-emerald-500" />
              </button>
              {showPlusTooltip && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setShowPlusTooltip(false)}
                  />
                  <div className="absolute left-0 bottom-full mb-3 w-48 rounded-xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#151515] p-1.5 shadow-lg z-40 text-xs text-slate-600 dark:text-slate-400 animate-fade-in">
                    <div className="px-2 py-1 border-b border-slate-100 dark:border-[#222222] font-semibold text-slate-400">
                      Ecky Bot Features
                    </div>
                    <div className="p-2 space-y-1">
                      <p>💬 Text messaging only</p>
                      <p>💡 Power optimization advice</p>
                      <p>⚡ Real-time grid tariff tips</p>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="relative flex-1 flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Ecky..."
                className="w-full bg-transparent py-2 sm:py-2 pl-1 pr-10 sm:pl-2 sm:pr-10 text-xs sm:text-sm text-slate-800 dark:text-slate-100 outline-none placeholder-slate-400 dark:placeholder-slate-650"
              />
              <div className="absolute right-2.5 flex items-center gap-1 pointer-events-none">
                <kbd className="inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                  <span className="text-xs">⌘</span>/
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 pr-0.5 sm:pr-1">
              {inputVal && (
                <button
                  type="button"
                  onClick={() => setInputVal("")}
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#1a1a1a] dark:hover:bg-[#252525] text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all duration-200 animate-in zoom-in-50 shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                disabled={!inputVal.trim()}
                className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 ${
                  inputVal.trim()
                    ? "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer hover:shadow-emerald-500/25"
                    : "bg-slate-100 dark:bg-[#161616] text-slate-300 dark:text-slate-700 cursor-not-allowed shadow-none"
                }`}
              >
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-3" />
              </button>
            </div>
          </form>
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 text-center px-4">
            Ecky is an AI assistant and may make mistakes. Double-check
            important information.
          </p>
        </div>

        <div className="w-full max-w-2xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  onClick={() => handleSendMessage(action.desc)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-full border border-slate-200 dark:border-[#222222] bg-white/80 dark:bg-[#0f0f0f]/60 text-slate-600 dark:text-slate-300 hover:border-emerald-500/50 hover:bg-emerald-500/5 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 cursor-pointer flex items-center gap-1.5 shadow-sm transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Icon className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                  <span>{action.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InitialState;
