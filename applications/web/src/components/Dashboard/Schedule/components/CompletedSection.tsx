"use client";

import { CheckCircle2, Star, AlertTriangle, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { Availableappliances } from "@ecowat/shared";
import { getApplianceName } from "@/src/utils/appliances/applianceName";
import EmptySection from "./EmptySection";
import { useTranslations } from "next-intl";
import { userConsumption } from "@/src/context/usedAppliance.context";
import { RescheduledApplicationItem } from "../types";

interface CompletedSectionProps {
  schedules?: RescheduledApplicationItem[];
  formatHour?: (h: number) => string;
}

export default function CompletedSection({}: CompletedSectionProps) {
  const tSections = useTranslations("Schedule.sections");
  const tCard = useTranslations("Schedule.card");
  const tErrors = useTranslations("Schedule.errors");
  const { Appliances, isLoading, isError, refetch } = userConsumption();

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-pulse">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="border border-slate-200 dark:border-stone-850 bg-white dark:bg-[#111111] overflow-hidden"
          >
            <CardHeader className="p-5 pb-4 border-b border-slate-100 dark:border-stone-900/50 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
                  <div className="h-3 w-16 bg-slate-100 dark:bg-slate-800/60 rounded" />
                </div>
              </div>
              <div className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-stone-900/50 py-3.5 px-2">
                <div className="h-8 bg-slate-100 dark:bg-slate-800/40 rounded mx-1" />
                <div className="h-8 bg-slate-100 dark:bg-slate-800/40 rounded mx-1" />
                <div className="h-8 bg-slate-100 dark:bg-slate-800/40 rounded mx-1" />
              </div>
              <div className="p-4 bg-slate-50/20 dark:bg-stone-900/5 border-t border-slate-100 dark:border-stone-900/40 flex justify-between">
                <div className="h-4 w-20 bg-slate-100 dark:bg-slate-800/60 rounded" />
                <div className="h-4 w-24 bg-slate-100 dark:bg-slate-800/60 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // 2. Error State
  if (isError) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-[#111111] border border-red-200 dark:border-red-950/40 rounded-2xl">
        <div className="h-12 w-12 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center mb-3">
          <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-stone-100 mb-1">
          {tErrors("failedTitle")}
        </h3>
        <p className="text-sm text-slate-500 dark:text-stone-400 mb-4 max-w-sm">
          {tErrors("fetchSchedules")} {tErrors("retrySuffix")}
        </p>
        <Button
          onClick={() => refetch()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 px-4 font-bold flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" />
          {tErrors("retry")}
        </Button>
      </div>
    );
  }

  // 3. Null / Empty State
  if (!Appliances || Appliances.length === 0) {
    return <EmptySection type="completed" />;
  }

  // 4. Completed Appliances List
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in duration-200">
      {Appliances.map((item, index) => {
        const staticApp = Availableappliances?.find(
          (a) =>
            a.name === item.appliance?.name ||
            a.dbName === item.appliance?.name,
        );
        const category = staticApp
          ? staticApp.category
          : tCard("generalCategory");
        const durationHours = item.usageHours ?? 0;
        const durationText = `${durationHours} ${durationHours === 1 ? "hr" : "hrs"}`;
        const cost = item.totalPrice ?? (item.kwh ?? 0) * 0.24;

        return (
          <Card
            key={item.id ?? `${item.appliance?.name}-${index}`}
            className="group transition-all duration-200 hover:shadow-md border overflow-hidden border-emerald-500/20 dark:border-emerald-950/20 bg-emerald-500/1 dark:bg-[#0f150f]/10"
          >
            <CardHeader className="flex flex-row items-start justify-between p-5 pb-4 border-b border-slate-100 dark:border-stone-900/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {getApplianceIcon(category)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-stone-100 line-clamp-1">
                    {getApplianceName(item.appliance?.name) ||
                      tCard("applianceFallback")}{" "}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5">
                    {category}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                {tSections("completed")}
              </span>
            </CardHeader>

            <CardContent className="p-0">
              {/* Grid of Key parameters */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-stone-900/50">
                <div className="px-1.5 sm:px-2 py-3.5 sm:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                    {tCard("duration")}
                  </span>
                  <span className="text-[11px] sm:text-sm font-bold text-slate-755 dark:text-stone-250 font-mono">
                    {durationText}
                  </span>
                </div>
                <div className="px-1.5 sm:px-2 py-3.5 sm:p-4 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-stone-900/20">
                  <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                    {tCard("power")}
                  </span>
                  <span className="text-[11px] sm:text-sm font-bold text-slate-755 dark:text-stone-250 font-mono">
                    {(item.kwh ?? 0).toFixed(2)} kWh
                  </span>
                </div>
                <div className="px-1.5 sm:px-2 py-3.5 sm:p-4 flex flex-col items-center justify-center text-center bg-emerald-50/5">
                  <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                    {tCard("rating")}
                  </span>
                  <span className="text-[11px] sm:text-sm font-bold text-slate-755 dark:text-stone-200 flex items-center gap-0.5 sm:gap-1 font-mono">
                    <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                    {item.rating ?? 0}
                  </span>
                </div>
              </div>

              {/* Actions footer bar */}
              <div className="px-3 sm:px-5 py-3 sm:py-4 bg-slate-50/20 dark:bg-stone-900/5 border-t border-slate-100 dark:border-stone-900/40 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-stone-450 font-mono shrink-0">
                  {tCard("cost")}: €{cost.toFixed(2)}
                </span>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />{" "}
                    {tCard("runCompleted")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
