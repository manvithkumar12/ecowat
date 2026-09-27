import React, { useRef } from "react";

interface OtpInputProps {
  value: string[];
  onChange: (val: string[]) => void;
  hasError: boolean;
}

const OtpInput = ({ value, onChange, hasError }: OtpInputProps) => {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
    if (e.key === "Backspace" && !value[idx] && idx > 0) {
      refs.current[idx - 1]?.focus();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[idx] = char;
    onChange(next);
    if (char && idx < 5) refs.current[idx + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const next = [...value];
    pasted.split("").forEach((c, i) => {
      next[i] = c;
    });
    onChange(next);
    refs.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };
  return (
    <div className="flex gap-2 justify-center">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKey(e, i)}
          onPaste={handlePaste}
          className={`w-11 h-12 text-center text-lg font-bold rounded-lg border bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white outline-none transition-all duration-200 focus:ring-2 ${
            hasError
              ? "border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-400/10"
              : digit
                ? "border-emerald-400 dark:border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/10"
                : "border-slate-200 dark:border-[#2a2a2a] focus:border-emerald-500 focus:ring-emerald-500/10"
          }`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
