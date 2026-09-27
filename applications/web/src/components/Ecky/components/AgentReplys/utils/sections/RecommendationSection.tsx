"use client";

import React from "react";
import Link from "next/link";
import {
  Zap,
  Clock,
  Leaf,
  TrendingDown,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Plus,
} from "lucide-react";
import { useRecommendations } from "@/src/context/useRecommendations.Context";
import { Availableappliances } from "@ecowat/shared";
import { getApplianceIcon } from "@/src/utils/appliances/icon";
import { Card, CardContent, CardHeader } from "@/shadcn/ui/card";

interface RecommendationSectionProps {
  applianceName?: string | string[];
}

const RecommendationSection = ({ applianceName }: RecommendationSectionProps) => {
  const {
    recommendations,
    isLoading,
    isError,
    refetch,
  } = useRecommendations();

  const filteredRecs = React.useMemo(() => {
    if (!recommendations) return [];
    if (!applianceName) return recommendations;

    const names = Array.isArray(applianceName)
      ? applianceName.map((n) => n.toLowerCase())
      : [applianceName.toLowerCase()];

    if (names.length === 0) return recommendations;

    return recommendations.filter((rec) => {
      const appName = rec.appliance.toLowerCase();
      const category = rec.category?.toLowerCase() || "";
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
  }, [recommendations, applianceName]);

  if (isLoading) {
    return (
      <div className="w-full mt-3 space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
          <span>Analyzing optimal usage windows...</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-28 rounded-xl border border-slate-200/60 dark:border-stone-800/80 bg-white/50 dark:bg-stone-900/40 animate-pulse p-3.5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-stone-800" />
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
          <span>Unable to generate recommendations.</span>
        </div>
        <button
          onClick={() => refetch?.()}
          className="flex items-center gap-1 font-medium px-2 py-1 rounded bg-white dark:bg-rose-900/40 border border-rose-200 dark:border-rose-800 hover:bg-rose-50 transition-colors"
        >
          <RefreshCw className="h-3 w-3" /> Retry
        </button>
      </div>
    );
  }

  if (!filteredRecs || filteredRecs.length === 0) {
    return (
      <div className="w-full mt-3 p-4 rounded-xl border border-dashed border-slate-200 dark:border-stone-800 bg-white/40 dark:bg-stone-900/30 text-center flex flex-col items-center justify-center gap-2">
        <div className="h-9 w-9 rounded-full bg-slate-100 dark:bg-stone-800 flex items-center justify-center text-slate-400 dark:text-stone-500">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-slate-700 dark:text-stone-300">
            {applianceName
              ? "No recommendations for this appliance"
              : "No recommendations available right now"}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-stone-400 mt-0.5">
            Add or schedule your appliances to view optimal operating slots.
          </p>
        </div>
        <Link
          href="/recommendations"
          className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
        >
          <Plus className="h-3.5 w-3.5" />
          Explore Recommendations
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full mt-3 space-y-2.5">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-stone-400 px-0.5">
        <span className="font-medium">
          {filteredRecs.length}{" "}
          {filteredRecs.length === 1 ? "Suggestion" : "Suggestions"} Available
        </span>
        <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
          <Sparkles className="h-3 w-3" />
          Optimal Timing
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
        {filteredRecs.slice(0, 4).map((rec, index) => {
          const displayName =
            Availableappliances.find((a) => a.dbName === rec.appliance)?.name ||
            rec.appliance;

          return (
            <Card
              key={rec.appliance + index}
              className="group w-full relative overflow-hidden transition-all duration-200 hover:shadow-sm border border-slate-200/80 dark:border-stone-800 bg-white dark:bg-[#0c0a09] rounded-xl"
            >
              <CardHeader className="p-3 pb-2.5 border-b border-slate-100 dark:border-stone-900/60">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center shrink-0 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
                      {getApplianceIcon(rec.category || rec.appliance)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-xs text-slate-900 dark:text-stone-100 truncate capitalize">
                        {displayName}
                      </h4>
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 mt-0.5">
                        <TrendingDown className="h-2.5 w-2.5" />
                        Save €{rec.potentialSaving.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <Clock className="h-2.5 w-2.5" />
                    {rec.bestTimeSlot}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-stone-900/60 text-center">
                  <div className="p-2 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 dark:text-stone-500 flex items-center gap-0.5">
                      <Leaf className="h-2.5 w-2.5 text-emerald-500" /> Green
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-stone-200 font-mono mt-0.5">
                      {rec.renewableScore}%
                    </span>
                  </div>

                  <div className="p-2 flex flex-col items-center justify-center bg-slate-50/40 dark:bg-stone-900/20">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-slate-400 dark:text-stone-500 flex items-center gap-0.5">
                      <Zap className="h-2.5 w-2.5 text-amber-500" /> Price
                    </span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-stone-200 font-mono mt-0.5">
                      {rec.priceAtBestTime === 0
                        ? "Free"
                        : `${(rec.priceAtBestTime * 100).toFixed(1)}¢`}
                    </span>
                  </div>

                  <div className="p-2 flex flex-col items-center justify-center bg-emerald-50/20 dark:bg-emerald-950/10">
                    <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-600/80 dark:text-emerald-500">
                      Est. Cost
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                      €{rec.estimatedRunCost?.toFixed(2) ?? "0.00"}
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

export default RecommendationSection;