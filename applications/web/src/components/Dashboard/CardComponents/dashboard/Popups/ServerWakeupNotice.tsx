"use client";

import { useEffect, useState } from "react";
import { X, Server, Clock, Info } from "lucide-react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "ecowat_server_free_tier_notice_dismissed";

export default function ServerWakeupNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Dashboard.serverNotice");

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setIsOpen(true);
      }
    } catch {
      // ignore in case localStorage is unavailable in iframe/private mode
    }
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // ignore
    }
    setIsOpen(false);
  };

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleDismiss();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#222222] rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 animate-in zoom-in-95 duration-200"
      >
        {/* Top glowing ambient accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500" />

        {/* X Close button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t("close")}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1f1f1f] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
            <Server className="w-5 h-5" />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                {t("badge")}
              </span>
              <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                <Clock className="w-3 h-3" />
                2–3 min
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
              {t("title")}
            </h3>
          </div>
        </div>

        {/* Message */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-3.5">
          {t("message")}
        </p>

        {/* Tip Box */}
        <div className="mt-3.5 p-3 rounded-xl bg-slate-50 dark:bg-[#171717] border border-slate-200/80 dark:border-[#222222] flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <Info className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>{t("tip")}</span>
        </div>

        {/* Got it CTA */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full sm:w-auto px-5 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm shadow-emerald-500/20 cursor-pointer"
          >
            {t("gotIt")}
          </button>
        </div>
      </div>
    </div>
  );
}
