"use client";

import { Mail, X, CheckCircle2, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MagicLink = () => {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const handleMagicLink = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.code);
        return;
      }

      toast.success("Magic link sent successfully");
      setLinkSent(true);
    } catch (error: any) {
      toast.error(error?.code || "SOMETHING_WRONG");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setLinkSent(false);
      setEmail("");
    }, 200);
  };

  return (
    <>
      <div className="flex flex-col gap-2.5 mb-5">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full h-10 flex items-center justify-center gap-2.5 border border-slate-200 dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-[#222222] transition-colors cursor-pointer"
        >
          <Mail
            size={16}
            className="text-slate-400 dark:text-slate-500 shrink-0"
          />
          Continue with Magic Link
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            className="relative w-full max-w-md bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1f1f1f] rounded-2xl shadow-2xl px-8 py-8"
            style={{ animation: "fpSlideUp 0.28s cubic-bezier(.22,1,.36,1)" }}
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#222] transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            {!linkSent ? (
              <>
                <div className="mb-6">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Magic Link Login
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                    Enter your email address and we'll send you a secure sign-in
                    link.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="magic-email"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="magic-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-emerald-500 transition-all"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleMagicLink}
                  disabled={loading || !email.trim()}
                  className="w-full h-11 mt-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                    </>
                  ) : (
                    "Send Magic Link"
                  )}
                </button>
              </>
            ) : (
              <div className="text-center">
                <CheckCircle2
                  size={52}
                  className="mx-auto text-emerald-500 mb-4"
                />

                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Link Sent Successfully
                </h2>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  We've sent a secure sign-in link to:
                </p>

                <p className="mt-2 font-medium text-emerald-600 dark:text-emerald-400 break-all">
                  {email}
                </p>

                <div className="flex flex-col gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://mail.google.com", "_blank")
                    }
                    className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all"
                  >
                    Open Gmail
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full h-11 rounded-xl border border-slate-200 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a] text-slate-700 dark:text-slate-200 font-medium transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MagicLink;
