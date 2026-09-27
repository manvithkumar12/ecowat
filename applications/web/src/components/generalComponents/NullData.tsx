import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Activity, X } from "lucide-react";
import { useTranslations } from "next-intl";

interface NullProps {
  Action1: () => void;
  Action2: () => void;
  title: string;
  info: string;
  description: string;
}
export const NullData = ({
  Action1,
  Action2,
  title,
  info,
  description,
}: NullProps) => {
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Dashboard.popups.consumptionDetails");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1e1e1e] flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            {title}
          </h3>

          <button
            onClick={() => Action1()}
            className="h-8 w-8 rounded-lg border border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-6 py-12 flex flex-col items-center text-center">
          <div className="h-16 w-16 rounded-full bg-slate-100 dark:bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Activity className="h-8 w-8 text-slate-400" />
          </div>

          <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
            {info}
          </h4>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs">
            {description}
          </p>

          <button
            onClick={() => Action2()}
            className="mt-6 px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
          >
            {t("gotIt")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default NullData;
