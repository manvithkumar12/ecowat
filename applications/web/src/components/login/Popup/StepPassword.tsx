"use client";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { validatePassword } from "@/src/utils/validation/validatePassword";

interface StepPasswordProps {
  onSubmit: (newPass: string) => void;
}

const StepPassword = ({ onSubmit }: StepPasswordProps) => {
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passErrors, setPassErrors] = useState<string[]>([]);
  const [passTouched, setPassTouched] = useState(false);
  const [confirmError, setConfirmError] = useState("");

  const handlePassBlur = () => {
    setPassTouched(true);
    setPassErrors(validatePassword(newPass));
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPass(e.target.value);
    if (passTouched) setPassErrors(validatePassword(e.target.value));
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass(e.target.value);
    if (e.target.value && e.target.value !== newPass) {
      setConfirmError("Passwords do not match");
    } else {
      setConfirmError("");
    }
  };

  const handleSubmit = () => {
    const errors = validatePassword(newPass);
    setPassTouched(true);
    setPassErrors(errors);
    if (newPass !== confirmPass) {
      setConfirmError("Passwords do not match");
      return;
    }
    if (errors.length > 0) return;
    onSubmit(newPass);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* New password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="fp-new-pass"
          className="text-xs font-semibold text-slate-600 dark:text-slate-300"
        >
          New password
        </label>
        <div className="relative">
          <input
            id="fp-new-pass"
            type={showNew ? "text" : "password"}
            placeholder="••••••••"
            value={newPass}
            onChange={handlePassChange}
            onBlur={handlePassBlur}
            className={`block w-full h-10 px-3 pr-10 rounded-lg border bg-white dark:bg-[#1a1a1a] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-2 transition-all ${
              passErrors.length > 0 && passTouched
                ? "border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/10"
                : "border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/10"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
          >
            {showNew ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {passTouched && passErrors.length > 0 && (
          <ul className="flex flex-col gap-1 mt-0.5">
            {passErrors.map((err) => (
              <li
                key={err}
                className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400"
              >
                <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400 shrink-0" />
                {err}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Confirm password */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="fp-confirm-pass"
          className="text-xs font-semibold text-slate-600 dark:text-slate-300"
        >
          Confirm new password
        </label>
        <div className="relative">
          <input
            id="fp-confirm-pass"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPass}
            onChange={handleConfirmChange}
            className={`block w-full h-10 px-3 pr-10 rounded-lg border bg-white dark:bg-[#1a1a1a] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 outline-none focus:ring-2 transition-all ${
              confirmError
                ? "border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/10"
                : "border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/10"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus:outline-none cursor-pointer"
          >
            {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        {confirmError && (
          <p className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 mt-0.5">
            <span className="inline-block w-1 h-1 rounded-full bg-red-500 dark:bg-red-400 shrink-0" />
            {confirmError}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer mt-1"
      >
        Reset password <Lock size={15} className="shrink-0" />
      </button>
    </div>
  );
};

export default StepPassword;
