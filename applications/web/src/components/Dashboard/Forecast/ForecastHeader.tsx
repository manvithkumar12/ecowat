"use client";
import { Button } from "@/shadcn/ui/button";
import { Calendar, Download, RefreshCw, TrendingUp } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const ForecastHeader = () => {
  const [exporting, setExporting] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const t = useTranslations("Forecast.header");

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(t("exportSuccess"));
    }, 1000);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 dark:border-stone-900 pb-5">
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-stone-100 flex items-center gap-2.5">
            <TrendingUp className="h-7 w-7 text-emerald-500" />
            {t("title")}
          </h1>
        </div>

        <p className="text-sm text-slate-500 dark:text-stone-400 max-w-3xl leading-relaxed">
          {t("description")}
        </p>
      </div>
    </div>
  );
};

export default ForecastHeader;
