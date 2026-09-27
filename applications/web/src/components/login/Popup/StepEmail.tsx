"use client";
import { Mail, ArrowRight } from "lucide-react";

interface StepEmailProps {
  email: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

const StepEmail = ({ email, onChange, onNext }: StepEmailProps) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="fp-email"
        className="text-xs font-semibold text-slate-600 dark:text-slate-300"
      >
        Email address
      </label>
      <div className="relative">
        <Mail
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
        />
        <input
          id="fp-email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onNext()}
          className="block w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all"
        />
      </div>
    </div>
    <button
      type="button"
      onClick={onNext}
      disabled={!email.trim()}
      className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer"
    >
      Send code <ArrowRight size={15} className="shrink-0" />
    </button>
  </div>
);

export default StepEmail;
