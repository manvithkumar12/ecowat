"use client";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

const EmptySection = ({
  type,
  showGenerateBtn,
  handleGenerateSchedule,
}: {
  type: "pending" | "upcoming" | "completed";
  showGenerateBtn?: boolean;
  handleGenerateSchedule?: () => void;
}) => {
  const t = useTranslations("Schedule.empty");

  const getTitle = () => {
    switch (type) {
      case "upcoming":
        return t("noUpcomingTitle");
      case "pending":
        return t("noPendingTitle");
      case "completed":
        return t("noCompletedTitle");
    }
  };

  const getDescription = () => {
    switch (type) {
      case "upcoming":
        return t("noUpcomingDesc");
      case "pending":
        return t("noPendingDesc");
      case "completed":
        return t("noCompletedDesc");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[400px] px-4 text-center bg-white dark:bg-[#0c0a09] rounded-2xl border border-dashed border-slate-200 dark:border-stone-800 w-full">
      <div className="h-20 w-20 bg-slate-50 dark:bg-stone-900/50 rounded-full flex items-center justify-center mb-6">
        <Calendar className="h-10 w-10 text-slate-400 dark:text-stone-500" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-2">
        {getTitle()}
      </h2>
      <p className="text-slate-500 dark:text-stone-400 max-w-md mb-6 text-sm">
        {getDescription()}
      </p>
      {showGenerateBtn && handleGenerateSchedule && (
        <button
          onClick={handleGenerateSchedule}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer transition-all shadow-sm"
        >
          {t("generateAiSchedule")}
        </button>
      )}
    </div>
  );
};

export default EmptySection;
