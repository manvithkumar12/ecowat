"use client";
import { KeyRound } from "lucide-react";
import OtpInput from "./OtpInput";

interface StepOtpProps {
  otp: string[];
  hasError: boolean;
  onChange: (val: string[]) => void;
  onVerify: () => void;
  onBack: () => void;
}

const StepOtp = ({ otp, hasError, onChange, onVerify, onBack }: StepOtpProps) => (
  <div className="flex flex-col gap-5">
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 text-center">
        6-digit verification code
      </label>
      <OtpInput value={otp} onChange={onChange} hasError={hasError} />
      {hasError && (
        <p className="text-xs text-red-500 dark:text-red-400 text-center font-medium mt-1">
          ✕&nbsp;&nbsp;Invalid OTP. Please try again.
        </p>
      )}
    </div>

    <button
      type="button"
      onClick={onVerify}
      disabled={otp.join("").length < 6}
      className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer"
    >
      Verify code <KeyRound size={15} className="shrink-0" />
    </button>

    <button
      type="button"
      onClick={onBack}
      className="text-xs text-center text-slate-500 dark:text-slate-400 hover:text-emerald-500 transition-colors cursor-pointer bg-transparent border-none"
    >
      ← Change email
    </button>
  </div>
);

export default StepOtp;
