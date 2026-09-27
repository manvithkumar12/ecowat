"use client";
import { X, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import StepIndicator from "./StepIndicator";
import StepEmail from "./StepEmail";
import StepOtp from "./StepOtp";
import StepPassword from "./StepPassword";

const STEP_SUBTITLES = [
  "We'll send a 6-digit code to your email.",
  "", // filled dynamically
  "Create a strong new password.",
];

const ForgotPass = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState(false);
  const [done, setDone] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(0);
      setEmail("");
      setOtp(["", "", "", "", "", ""]);
      setOtpError(false);
      setDone(false);
    }, 300);
  };

  const handleOtpVerify = () => {
    if (otp.join("") === "123456") {
      setOtpError(false);
      setStep(2);
    } else {
      setOtpError(true);
    }
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const subtitle =
    step === 1 ? `Enter the code sent to ${email}` : STEP_SUBTITLES[step];

  return (
    <>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer bg-transparent border-none p-0"
      >
        Forgot password?
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={handleBackdrop}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1f1f1f] rounded-2xl shadow-2xl px-8 py-8 transition-all duration-300"
            style={{ animation: "fpSlideUp 0.28s cubic-bezier(.22,1,.36,1)" }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222] transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            {!done ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Reset your password
                  </h2>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {subtitle}
                  </p>
                </div>

                <StepIndicator current={step} />

                {step === 0 && (
                  <StepEmail
                    email={email}
                    onChange={setEmail}
                    onNext={() => {
                      if (email.trim()) setStep(1);
                    }}
                  />
                )}

                {step === 1 && (
                  <StepOtp
                    otp={otp}
                    hasError={otpError}
                    onChange={setOtp}
                    onVerify={handleOtpVerify}
                    onBack={() => {
                      setStep(0);
                      setOtp(["", "", "", "", "", ""]);
                      setOtpError(false);
                    }}
                  />
                )}

                {step === 2 && <StepPassword onSubmit={() => setDone(true)} />}
              </>
            ) : (
              /* Success */
              <div className="flex flex-col items-center gap-4 py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Password updated!
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Your password has been reset successfully. You can now sign
                    in.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  Back to sign in
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fpSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  );
};

export default ForgotPass;
