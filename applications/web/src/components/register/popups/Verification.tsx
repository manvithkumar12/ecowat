"use client";

import { X, Mail } from "lucide-react";
import { useEffect } from "react";

interface VerificationProps {
  email: string;
  open: boolean;
  onClose: () => void;
}

const Verification = ({ email, open, onClose }: VerificationProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleClose();
  };

  const openGmail = () => {
    window.open("https://mail.google.com", "_blank");
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    if (open) {
      window.addEventListener("keydown", handler);
    }

    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        onClick={handleBackdrop}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
        }}
      >
        <div
          className="relative w-full max-w-md bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1f1f1f] rounded-2xl shadow-2xl px-8 py-8"
          style={{
            animation:
              "verificationPopupSlideUp 0.28s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222] transition-all cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="flex flex-col items-center text-center gap-5">
            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Mail size={32} className="text-emerald-500" />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Verification Email Sent
              </h2>

              <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-6">
                We've sent a verification link to
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-slate-200 break-all">
                {email}
              </p>

              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 leading-6">
                Open your inbox and click the verification link to activate your
                EcoWatt account.
              </p>

              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                After verification you'll be signed in automatically and
                redirected to your dashboard.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-3 w-full">
              <button
                type="button"
                onClick={openGmail}
                className="w-full h-11 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-sm font-semibold shadow-sm shadow-emerald-500/20 transition-all cursor-pointer"
              >
                Open Gmail
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes verificationPopupSlideUp {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default Verification;
