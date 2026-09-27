"use client";
import React from "react";
import { Clock, Star, Calendar, Play } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { RescheduledApplicationItem } from "../types";
import { Availableappliances } from "@ecowat/shared";
import { getApplianceName } from "@/src/utils/appliances/applianceName";
import EmptySection from "./EmptySection";
import { useTranslations } from "next-intl";

interface UpcomingSectionProps {
  schedules: RescheduledApplicationItem[];
  currentHour: number;
  formatHour: (h: number) => string;
  triggerReschedule: (item: RescheduledApplicationItem) => void;
  handleGenerateSchedule: () => void;
  showGenerateBtn: boolean;
}

const parseTimeStr = (timeStr: string): number => {
  if (!timeStr) return 0;
  if (timeStr.includes(":")) {
    const [h, m] = timeStr.split(":").map(Number);
    return h + (m || 0) / 60;
  }
  return Number(timeStr) || 0;
};

export default function UpcomingSection({
  schedules,
  currentHour,
  formatHour,
  triggerReschedule,
  handleGenerateSchedule,
  showGenerateBtn,
}: UpcomingSectionProps) {
  const tSections = useTranslations("Schedule.sections");
  const tCard = useTranslations("Schedule.card");

  if (schedules.length === 0) {
    return (
      <EmptySection
        type="upcoming"
        showGenerateBtn={showGenerateBtn}
        handleGenerateSchedule={handleGenerateSchedule}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in duration-200">
      {schedules.map((item) => {
        const startHourNum = parseTimeStr(item.startHour);
        const endHourNum = parseTimeStr(item.endHour);
        const isRunTime =
          currentHour >= startHourNum && currentHour < endHourNum;
        const staticApp = Availableappliances?.find(
          (a) =>
            a.name === item.appliance?.name ||
            a.dbName === item.appliance?.name,
        );
        const category = staticApp
          ? staticApp.category
          : tCard("generalCategory");
        const cost = item.powerConsumed * 0.24;

        return (
          <Card
            key={item.id}
            className="group transition-all duration-200 hover:shadow-md border overflow-hidden border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09]"
          >
            <CardHeader className="flex flex-row items-start justify-between p-5 pb-4 border-b border-slate-100 dark:border-stone-900/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors bg-slate-100 dark:bg-stone-800 text-slate-700 dark:text-stone-300 group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                  {getApplianceIcon(category)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-stone-100 line-clamp-1">
                    {getApplianceName(item.appliance?.name) ||
                      tCard("applianceFallback")}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-stone-400 mt-0.5">
                    {category}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-450 border border-blue-500/20">
                {tSections("upcoming")}
              </span>
            </CardHeader>

            <CardContent className="p-0">
              {/* Grid of Key parameters */}
              <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-stone-900/50">
                <div className="px-1.5 sm:px-2 py-3.5 sm:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                    {tCard("usageTime")}
                  </span>
                  <span className="text-[11px] sm:text-sm font-bold text-slate-755 dark:text-stone-250 font-mono">
                    {formatHour(startHourNum)}-{formatHour(endHourNum)}
                  </span>
                </div>
                <div className="px-1.5 sm:px-2 py-3.5 sm:p-4 flex flex-col items-center justify-center text-center bg-slate-50/50 dark:bg-stone-900/20">
                  <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                    {tCard("power")}
                  </span>
                  <span className="text-[11px] sm:text-sm font-bold text-slate-755 dark:text-stone-250 font-mono">
                    {item.powerConsumed.toFixed(2)} kWh
                  </span>
                </div>
                <div className="px-1.5 sm:px-2 py-3.5 sm:p-4 flex flex-col items-center justify-center text-center bg-blue-50/10 dark:bg-blue-900/5">
                  <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-stone-400 mb-1">
                    {tCard("rating")}
                  </span>
                  <span className="text-[11px] sm:text-sm font-bold text-slate-755 dark:text-stone-200 flex items-center gap-0.5 sm:gap-1 font-mono">
                    <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                    {item.rating}
                  </span>
                </div>
              </div>

              {/* Actions footer bar */}
              <div className="px-3 sm:px-5 py-3 sm:py-4 bg-slate-50/20 dark:bg-stone-900/5 border-t border-slate-100 dark:border-stone-900/40 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-500 dark:text-stone-455 font-mono shrink-0">
                  {tCard("cost")}: €{cost.toFixed(2)}
                </span>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  {isRunTime && (
                    <button className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-xs">
                      <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{" "}
                      {tCard("startRun")}
                    </button>
                  )}
                  <button
                    onClick={() => triggerReschedule(item)}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border border-slate-200 dark:border-stone-850 bg-white dark:bg-[#0c0a09] hover:bg-slate-50 dark:hover:bg-stone-900 text-[10px] sm:text-xs font-semibold text-slate-650 dark:text-slate-400 transition-colors cursor-pointer text-center"
                  >
                    {tCard("reschedule")}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
