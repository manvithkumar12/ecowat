import { Button } from "@/shadcn/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddAppliancePopup from "./AddAppliancePopup";
import { useTranslations } from "next-intl";

const Scheduleheader = ({
  germanDateStr,
  germanTimeStr,
}: {
  germanDateStr: string;
  germanTimeStr: string;
}) => {
  const t = useTranslations("Schedule.header");
  const [addDialog, setAddDialog] = useState(false);
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-4 sm:p-6 rounded-2xl shadow-xs">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1.5">
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {t("title")}
          </h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 w-fit">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("timezoneActive")}
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 ">
          {t("description")}
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 shrink-0 self-start md:self-center">
        <div className="bg-slate-50 dark:bg-[#161616] border border-slate-100 dark:border-[#222222] px-4 py-2.5 rounded-xl text-left">
          <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            {t("berlinLocalTime")}
          </span>
          <span className="text-sm font-mono font-black text-slate-800 dark:text-white block mt-0.5">
            {germanTimeStr || "--:--"}
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">
            {germanDateStr || t("loading")}
          </span>
        </div>
        <Button
          onClick={() => setAddDialog(true)}
          className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white transition-all shadow-sm cursor-pointer"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("addAppliance")}
        </Button>
      </div>
      <AddAppliancePopup open={addDialog} onOpenChange={setAddDialog} />
    </div>
  );
};

export default Scheduleheader;
