import { CheckCircle2 } from "lucide-react";

const STEPS = ["Email", "Verify OTP", "New Password"];

interface StepIndicatorProps {
  current: number;
}

const StepIndicator = ({ current }: StepIndicatorProps) => (
  <div className="flex items-center gap-0 mb-7">
    {STEPS.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                done
                  ? "bg-emerald-500 text-white"
                  : active
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-500/20"
                    : "bg-slate-100 dark:bg-[#2a2a2a] text-slate-400 dark:text-slate-500"
              }`}
            >
              {done ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span
              className={`text-[10px] font-semibold whitespace-nowrap ${
                active
                  ? "text-emerald-500"
                  : done
                    ? "text-emerald-400"
                    : "text-slate-400 dark:text-slate-500"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`flex-1 h-px mx-2 mb-4 transition-all duration-500 ${
                done ? "bg-emerald-400" : "bg-slate-200 dark:bg-[#2a2a2a]"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default StepIndicator;
