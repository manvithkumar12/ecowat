"use client";

import { Star, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { RescheduledApplicationItem } from "../types";
import {
  Availableappliances,
  getGermanDateString,
  useAddUsedAppliance,
  calculateDetailedUsage,
} from "@ecowat/shared";
import { useLivePrice } from "@/src/context/usePriceData";
import { getApplianceName } from "@/src/utils/appliances/applianceName";
import EmptySection from "./EmptySection";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface PendingSectionProps {
  schedules: RescheduledApplicationItem[];
  formatHour: (h: number) => string;
  handleRemoveSchedule: (id: string) => void;
  setCompletedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const parseTimeStr = (timeStr: string): number => {
  if (!timeStr) return 0;
  if (timeStr.includes(":")) {
    const [h, m] = timeStr.split(":").map(Number);
    return h + (m || 0) / 60;
  }
  return Number(timeStr) || 0;
};

export default function PendingSection({
  schedules,
  formatHour,
  handleRemoveSchedule,
  setCompletedIds,
}: PendingSectionProps) {
  const tToasts = useTranslations("Schedule.toasts");

  const tSections = useTranslations("Schedule.sections");
  const tCard = useTranslations("Schedule.card");
  const today = getGermanDateString(new Date());
  const addMutation = useAddUsedAppliance(today, true);
  const hourlyPrices = useLivePrice().PriceData?.hourlyPrices ?? [];

  if (schedules.length === 0) {
    return <EmptySection type={"pending"} />;
  }
  const handleMarkAsCompleted = (
    item: RescheduledApplicationItem,
    cost: number,
  ) => {
    let start = parseTimeStr(item.startHour);
    let end = parseTimeStr(item.endHour);
    if (end < start) end += 24; // midnight crossover e.g. 23:00 → 01:00 = 2hrs
    addMutation.mutate(
      {
        applianceName: item.appliance?.name || "",
        rating: Number(item.rating),
        usageHours: end - start,
        kwh: item.rating,
        totalPrice: cost,
        date: today,
        startHour: item.startHour,
        endHour: item.endHour,
        scheduleId: item.id,
      },
      {
        onSuccess: () => {
          setCompletedIds((prev: any) => [...prev, item.id]);
          toast.success(tToasts("markCompleted"));
        },
      },
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-in fade-in duration-200">
      {schedules.map((item) => {
        const startHourNum = parseTimeStr(item.startHour);
        const endHourNum = parseTimeStr(item.endHour);
        const staticApp = Availableappliances?.find(
          (a) =>
            a.name === item.appliance?.name ||
            a.dbName === item.appliance?.name,
        );
        const category = staticApp
          ? staticApp.category
          : tCard("generalCategory");
        const { totalPrice: cost } = calculateDetailedUsage(
          Number(item.rating),
          item.startHour,
          item.endHour,
          hourlyPrices,
        );

        return (
          <Card
            key={item.id}
            className="group transition-all duration-200 hover:shadow-md border overflow-hidden border-rose-200/50 dark:border-[#2a1d1d] bg-rose-500/1 dark:bg-[#150f0f]/10"
          >
            <CardHeader className="flex flex-row items-start justify-between p-5 pb-4 border-b border-slate-100 dark:border-stone-900/50">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors bg-rose-500/10 text-rose-600 dark:text-rose-400">
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

              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-600 border border-rose-500/30 animate-pulse">
                {tSections("pending")}
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
                <div className="px-1.5 sm:px-2 py-3.5 sm:p-4 flex flex-col items-center justify-center text-center bg-rose-50/5">
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
                  <button
                    onClick={() => handleMarkAsCompleted(item, cost)}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] sm:text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />{" "}
                    {tCard("markAsUsed")}
                  </button>
                  <button
                    onClick={() => handleRemoveSchedule(item.id.toString())}
                    className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-md border border-rose-200 hover:bg-rose-500/5 text-rose-500 text-[10px] sm:text-xs font-semibold cursor-pointer transition-colors text-center"
                  >
                    {tCard("remove")}
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
