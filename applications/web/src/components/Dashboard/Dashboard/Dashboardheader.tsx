"use client";
import { useDashboardReport } from "@/src/context/useDashboardExport.context";
import { exportReport } from "@/src/utils/pdf/exportPdf";
import { Download, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

const Dashboardheader = () => {
  const [exporting, setExporting] = useState(false);
  const exportData = useDashboardReport();
  const t = useTranslations("Dashboard.header");

  const handleExport = () => {
    setExporting(true);
    try {
      exportReport(exportData);
    } catch (error) {
      toast.error(t("exportFailed"));
      console.log(error);
    } finally {
      setTimeout(() => {
        setExporting(false);
      }, 1200);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          {t("title")}
          <span className="text-xs lg:whitespace-nowrap font-semibold bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-full border border-emerald-500/20">
            {t("aiForecastsActive")}
          </span>
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleExport}
          disabled={exporting}
          className="h-9 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-500/10 hover:shadow-emerald-500/20 disabled:bg-emerald-500/70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
        >
          {exporting ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
              {t("exporting")}
            </>
          ) : (
            <>
              <Download className="h-3.5 w-3.5" />
              {t("exportReport")}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboardheader;
