import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { RescheduledApplicationItem } from "../types";
import { useTranslations } from "next-intl";

export type SectionButtonsProps = {
  groupedSchedules: {
    upcoming: RescheduledApplicationItem[];
    pending: RescheduledApplicationItem[];
    completed: RescheduledApplicationItem[];
  };
  activeSection: "upcoming" | "pending" | "completed";
  setActiveSection: (section: "upcoming" | "pending" | "completed") => void;
};
const SectionButtons = ({
  groupedSchedules,
  activeSection,
  setActiveSection,
}: SectionButtonsProps) => {
  const t = useTranslations("Schedule.sections");
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setActiveSection("upcoming")}
        className={
          activeSection === "upcoming"
            ? "bg-blue-600 dark:bg-blue-500 text-white border-transparent shadow-md shadow-blue-200/50 dark:shadow-blue-900/30 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all duration-200"
            : "bg-white dark:bg-[#0c0a09] border border-slate-200 dark:border-stone-800 text-slate-600 dark:text-stone-400 hover:border-slate-350 dark:hover:border-stone-700 hover:bg-slate-50 dark:hover:bg-stone-900/50 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all duration-200"
        }
      >
        <Clock className="h-3.5 w-3.5" />
        {t("upcoming")}
        <span
          className={
            activeSection === "upcoming"
              ? "bg-white/20 text-white ml-1.5 text-[10px] font-bold rounded-md min-w-[18px] h-[18px] flex items-center justify-center px-1"
              : "bg-slate-100 dark:bg-stone-850 text-slate-500 dark:text-stone-400 ml-1.5 text-[10px] font-bold rounded-md min-w-[18px] h-[18px] flex items-center justify-center px-1"
          }
        >
          {groupedSchedules.upcoming.length}
        </span>
      </button>

      <button
        onClick={() => setActiveSection("pending")}
        className={
          activeSection === "pending"
            ? "bg-rose-500 dark:bg-rose-500 text-white border-transparent shadow-md shadow-rose-200/50 dark:shadow-rose-900/30 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all duration-200"
            : "bg-white dark:bg-[#0c0a09] border border-slate-200 dark:border-stone-800 text-slate-650 dark:text-stone-400 hover:border-slate-350 dark:hover:border-stone-700 hover:bg-slate-50 dark:hover:bg-stone-900/50 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all duration-200"
        }
      >
        <AlertTriangle className="h-3.5 w-3.5" />
        {t("pending")}
        <span
          className={
            activeSection === "pending"
              ? "bg-white/20 text-white ml-1.5 text-[10px] font-bold rounded-md min-w-[18px] h-[18px] flex items-center justify-center px-1"
              : "bg-slate-100 dark:bg-stone-850 text-slate-500 dark:text-stone-400 ml-1.5 text-[10px] font-bold rounded-md min-w-[18px] h-[18px] flex items-center justify-center px-1"
          }
        >
          {groupedSchedules.pending.length}
        </span>
      </button>

      <button
        onClick={() => setActiveSection("completed")}
        className={
          activeSection === "completed"
            ? "bg-emerald-600 dark:bg-emerald-500 text-white border-transparent shadow-md shadow-emerald-200/50 dark:shadow-emerald-900/30 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all duration-200"
            : "bg-white dark:bg-[#0c0a09] border border-slate-200 dark:border-stone-800 text-slate-650 dark:text-stone-400 hover:border-slate-350 dark:hover:border-stone-700 hover:bg-slate-50 dark:hover:bg-stone-900/50 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all duration-200"
        }
      >
        <CheckCircle2 className="h-3.5 w-3.5" />
        {t("completed")}
        <span
          className={
            activeSection === "completed"
              ? "bg-white/20 text-white ml-1.5 text-[10px] font-bold rounded-md min-w-[18px] h-[18px] flex items-center justify-center px-1"
              : "bg-slate-100 dark:bg-stone-850 text-slate-500 dark:text-stone-400 ml-1.5 text-[10px] font-bold rounded-md min-w-[18px] h-[18px] flex items-center justify-center px-1"
          }
        >
          {groupedSchedules.completed.length}
        </span>
      </button>
    </div>
  );
};

export default SectionButtons;
