"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Clock,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Plus,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useUserAppliancesContext } from "@/src/context/userAppliances";
import { Availableappliances } from "@ecowat/shared";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";

interface SavedAppliancesProps {
  applianceName?: string | string[];
}

const SavedAppliances = ({ applianceName }: SavedAppliancesProps) => {
  const {
    data: appliances,
    isLoading,
    isError,
    refetch,
  } = useUserAppliancesContext();

  const filteredAppliances = React.useMemo(() => {
    if (!appliances) return [];
    if (!applianceName) return appliances;

    const names = Array.isArray(applianceName)
      ? applianceName.map((n) => n.toLowerCase().replace(/[^a-zA-Z0-9]/g, ""))
      : [applianceName.toLowerCase()];

    if (names.length === 0) return appliances;

    return appliances.filter((app) => {
      const appName = app.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
      const category = app.category?.toLowerCase() || "";
      const matchedDb = Availableappliances.find(
        (a) => a.dbName.toLowerCase() === appName,
      )?.name.toLowerCase();

      return names.some(
        (target) =>
          appName.includes(target) ||
          target.includes(appName) ||
          (matchedDb && matchedDb.includes(target)) ||
          category.includes(target),
      );
    });
  }, [appliances, applianceName]);

  if (isLoading) {
    return (
      <div className="w-full mt-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="h-3 w-3 rounded-full bg-blue-500 animate-ping" />
          <span>Fetching your saved appliances...</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-28 rounded-xl border border-slate-200/60 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/40 animate-pulse p-3.5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-lg bg-slate-200 dark:bg-stone-800" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 w-24 rounded bg-slate-200 dark:bg-stone-800" />
                  <div className="h-2.5 w-16 rounded bg-slate-100 dark:bg-stone-850" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-1 pt-2 border-t border-slate-100 dark:border-stone-850/60">
                <div className="h-3 rounded bg-slate-100 dark:bg-stone-850" />
                <div className="h-3 rounded bg-slate-100 dark:bg-stone-850" />
                <div className="h-3 rounded bg-slate-100 dark:bg-stone-850" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full mt-3 p-3 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <span>Unable to load your saved appliances.</span>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-1 font-medium px-2 py-1 rounded bg-white dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800 hover:bg-rose-50 transition-colors"
        >
          <RefreshCw className="h-3 w-3" /> Retry
        </button>
      </div>
    );
  }

  if (!filteredAppliances || filteredAppliances.length === 0) {
    return (
      <div className="w-full mt-3 p-4 rounded-xl border border-dashed border-slate-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/30 text-center flex flex-col items-center justify-center gap-2">
        <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-stone-800 flex items-center justify-center text-slate-400 dark:text-stone-500">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700 dark:text-stone-300">
            {applianceName
              ? "No matching saved appliance found"
              : "No appliances registered yet"}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-stone-400 mt-0.5">
            {applianceName
              ? "Check your saved appliances list in the dashboard."
              : "Add appliances to track energy usage and receive optimal scheduling."}
          </p>
        </div>
        <Link
          href="/dashboard/appliances"
          className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Appliance
        </Link>
      </div>
    );
  }

  const activeCount = filteredAppliances.filter(
    (a) => a.status === true,
  ).length;

  return (
    <div className="w-full mt-3 space-y-2.5">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-stone-400 px-0.5">
        <span className="font-medium">
          {filteredAppliances.length}{" "}
          {filteredAppliances.length === 1 ? "Appliance" : "Appliances"}{" "}
          {applianceName ? "Found" : "Registered"}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {activeCount} Active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
        {filteredAppliances.slice(0, 4).map((appliance) => {
          const displayName =
            Availableappliances.find((a) => a.dbName === appliance.name)
              ?.name || appliance.name;
          const dailyKwh = (
            (appliance.powerRatingW * appliance.dailyUsageHours) /
            1000
          ).toFixed(2);
          const isActive = appliance.status === true;

          return (
            <Card
              key={appliance.id}
              className="group w-full relative overflow-hidden transition-all duration-200 hover:shadow-sm border border-slate-200/80 dark:border-stone-800 bg-white dark:bg-[#0c0a09] rounded-xl"
            >
              <CardHeader className="p-3 pb-2.5 border-b border-slate-100 dark:border-stone-900/60">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "bg-slate-100 text-slate-400 dark:bg-stone-900 dark:text-stone-500"
                      }`}
                    >
                      {getApplianceIcon(appliance.category || appliance.name)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-stone-100 truncate capitalize">
                        {displayName}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-stone-400 truncate capitalize">
                        {appliance.category || "General"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-slate-100 text-slate-500 dark:bg-stone-900 dark:text-stone-400"
                    }`}
                  >
                    {isActive ? (
                      <>
                        <CheckCircle2 className="h-2.5 w-2.5 text-emerald-500" />
                        <span>On</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-2.5 w-2.5 text-slate-400" />
                        <span>Off</span>
                      </>
                    )}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-stone-900/60 text-center">
                  <div className="p-2 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 dark:text-stone-500 flex items-center gap-0.5">
                      <Zap className="h-2.5 w-2.5" /> Power
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-stone-200 font-mono mt-0.5">
                      {appliance.powerRatingW} W
                    </span>
                  </div>

                  <div className="p-2 flex flex-col items-center justify-center bg-slate-50/40 dark:bg-stone-900/20">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 dark:text-stone-500 flex items-center gap-0.5">
                      <Clock className="h-2.5 w-2.5" /> Daily
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-stone-200 font-mono mt-0.5">
                      {appliance.dailyUsageHours} h
                    </span>
                  </div>

                  <div className="p-2 flex flex-col items-center justify-center bg-emerald-50/20 dark:bg-emerald-950/10">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-600/80 dark:text-emerald-500">
                      Energy
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      {dailyKwh}{" "}
                      <span className="text-[9px] font-normal">kWh</span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SavedAppliances;
