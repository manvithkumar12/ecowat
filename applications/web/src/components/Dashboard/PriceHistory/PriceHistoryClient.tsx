"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  Calendar as CalendarIcon,
  TrendingDown,
  TrendingUp,
  Zap,
  BarChart3,
  RefreshCw,
  Clock,
  ArrowRight,
  Euro,
  Info,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { Badge } from "@/shadcn/ui/badge";
import { usePriceHistory } from "@ecowat/shared";
import { useTranslations } from "next-intl";
import { PriceHistorySkeleton } from "./loading";
import { PriceHistoryError } from "./error";

export interface PriceDataPoint {
  start_timestamp: number;
  end_timestamp: number;
  marketprice: number; // in Eur/MWh
  unit: string;
}

interface PriceHistoryClientProps {
  initialStartDate?: string;
  initialEndDate?: string;
}

export default function PriceHistoryClient({
  initialStartDate,
  initialEndDate,
}: PriceHistoryClientProps = {}) {
  const tHeader = useTranslations("PriceHistory.header");
  const tPresets = useTranslations("PriceHistory.presets");
  const tFilter = useTranslations("PriceHistory.filter");
  const tMetrics = useTranslations("PriceHistory.metrics");
  const tChart = useTranslations("PriceHistory.chart");
  const tTable = useTranslations("PriceHistory.table");
  const tStates = useTranslations("PriceHistory.states");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const now = useMemo(() => new Date(), []);
  const defaultEnd = useMemo(() => now.toISOString().split("T")[0], [now]);
  const defaultStart = useMemo(() => {
    const d = new Date();
    d.setDate(now.getDate() - 3);
    return d.toISOString().split("T")[0];
  }, [now]);

  const startDate =
    searchParams.get("startDate") || initialStartDate || defaultStart;
  const endDate = searchParams.get("endDate") || initialEndDate || defaultEnd;

  const [inputStartDate, setInputStartDate] = useState(startDate);
  const [inputEndDate, setInputEndDate] = useState(endDate);
  const [viewMode, setViewMode] = useState<"chart" | "table">("table");

  const {
    data: priceResponse,
    isLoading,
    isError,
    refetch,
  } = usePriceHistory(startDate, endDate);

  const rawData: PriceDataPoint[] = (priceResponse as any)?.data || [];

  const formattedData = useMemo(() => {
    return (rawData || []).map((item) => {
      const dt = new Date(item.start_timestamp);
      const priceEurPerKwh = Number((item.marketprice / 1000).toFixed(4));
      const priceCentPerKwh = Number((item.marketprice / 10).toFixed(2));
      const formattedTime = dt.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Berlin",
      });
      const formattedDate = dt.toLocaleDateString("en-GB", {
        month: "short",
        day: "numeric",
        timeZone: "Europe/Berlin",
      });

      return {
        timestamp: item.start_timestamp,
        time: formattedTime,
        date: formattedDate,
        displayLabel: `${formattedDate} ${formattedTime}`,
        priceEur: priceEurPerKwh,
        priceCent: priceCentPerKwh,
        rawPrice: item.marketprice,
      };
    });
  }, [rawData]);

  const stats = useMemo(() => {
    if (!formattedData.length) {
      return {
        min: 0,
        max: 0,
        avg: 0,
        cheapestSlot: "N/A",
        expensiveSlot: "N/A",
      };
    }
    let min = formattedData[0].priceEur;
    let max = formattedData[0].priceEur;
    let sum = 0;
    let cheapestItem = formattedData[0];
    let expensiveItem = formattedData[0];

    formattedData.forEach((d) => {
      if (d.priceEur < min) {
        min = d.priceEur;
        cheapestItem = d;
      }
      if (d.priceEur > max) {
        max = d.priceEur;
        expensiveItem = d;
      }
      sum += d.priceEur;
    });

    const avg = Number((sum / formattedData.length).toFixed(4));

    return {
      min: Number(min.toFixed(4)),
      max: Number(max.toFixed(4)),
      avg,
      cheapestSlot: `${cheapestItem.date} ${cheapestItem.time}`,
      expensiveSlot: `${expensiveItem.date} ${expensiveItem.time}`,
    };
  }, [formattedData]);

  const handleApplyDates = (start: string, end: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("startDate", start);
    params.set("endDate", end);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const handlePreset = (daysAgo: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - daysAgo);

    const startStr = start.toISOString().split("T")[0];
    const endStr = end.toISOString().split("T")[0];
    setInputStartDate(startStr);
    setInputEndDate(endStr);
    handleApplyDates(startStr, endStr);
  };

  return (
    <div className="space-y-8 w-full max-w-7xl mx-auto min-w-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {tHeader("title")}
            </h1>
            <Badge
              variant="outline"
              className="text-[10px] font-mono border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5"
            >
              {tHeader("badge")}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            {tHeader("description")}
          </p>
        </div>

        {/* Quick Range Presets */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 dark:bg-[#181818] p-1.5 rounded-xl border border-slate-200 dark:border-[#282828]">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handlePreset(1)}
            className="text-xs h-8 px-2.5 font-medium hover:bg-white dark:hover:bg-[#222] cursor-pointer"
          >
            {tPresets("past24h")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handlePreset(3)}
            className="text-xs h-8 px-2.5 font-medium hover:bg-white dark:hover:bg-[#222] cursor-pointer"
          >
            {tPresets("days3")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handlePreset(7)}
            className="text-xs h-8 px-2.5 font-medium hover:bg-white dark:hover:bg-[#222] cursor-pointer"
          >
            {tPresets("days7")}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handlePreset(30)}
            className="text-xs h-8 px-2.5 font-medium hover:bg-white dark:hover:bg-[#222] cursor-pointer"
          >
            {tPresets("days30")}
          </Button>
        </div>
      </div>

      {/* Date Picker Filter Toolbar */}
      <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111] shadow-xs">
        <CardContent className="p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Start Date */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#181818] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2a2a2a]">
              <CalendarIcon className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold text-slate-400">
                {tFilter("from")}
              </span>
              <input
                type="date"
                value={inputStartDate}
                onChange={(e) => setInputStartDate(e.target.value)}
                className="bg-transparent text-xs font-mono font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
              />
            </div>

            <ArrowRight className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />

            {/* End Date */}
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-[#181818] px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2a2a2a]">
              <CalendarIcon className="h-4 w-4 text-emerald-500" />
              <span className="text-xs font-semibold text-slate-400">
                {tFilter("to")}
              </span>
              <input
                type="date"
                value={inputEndDate}
                onChange={(e) => setInputEndDate(e.target.value)}
                className="bg-transparent text-xs font-mono font-bold text-slate-800 dark:text-slate-100 outline-none cursor-pointer"
              />
            </div>

            <Button
              size="sm"
              disabled={isPending || !inputStartDate || !inputEndDate}
              onClick={() => handleApplyDates(inputStartDate, inputEndDate)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 h-9 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              {isPending ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin mr-1.5" />
                  {tFilter("updating")}
                </>
              ) : (
                tFilter("applyFilter")
              )}
            </Button>
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#181818] p-1 rounded-xl border border-slate-200 dark:border-[#2a2a2a] self-end md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-[#282828] text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {tFilter("table")}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("chart")}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                viewMode === "chart"
                  ? "bg-white dark:bg-[#282828] text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
            >
              {tFilter("chart")}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Content: Loading Skeleton, Error State, or Data */}
      {isLoading ? (
        <PriceHistorySkeleton />
      ) : isError ? (
        <PriceHistoryError refetch={refetch} t={tStates} />
      ) : (
        <>
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Average Price */}
            <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {tMetrics("avgPrice")}
                  </span>
                  <div className="p-2 rounded-xl bg-sky-500/10 text-sky-500">
                    <Euro className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                    €{stats.avg.toFixed(4)}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    /kWh
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  {tMetrics("avgAcross", { count: formattedData.length })}
                </p>
              </CardContent>
            </Card>

            {/* Lowest Price */}
            <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {tMetrics("lowestPrice")}
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <TrendingDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                    €{stats.min.toFixed(4)}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    /kWh
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {tMetrics("at", { slot: stats.cheapestSlot })}
                </p>
              </CardContent>
            </Card>

            {/* Peak Price */}
            <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {tMetrics("peakPrice")}
                  </span>
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-mono text-red-600 dark:text-red-400">
                    €{stats.max.toFixed(4)}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    /kWh
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 truncate">
                  {tMetrics("at", { slot: stats.expensiveSlot })}
                </p>
              </CardContent>
            </Card>

            {/* Total Data Slots */}
            <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111]">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {tMetrics("totalSlots")}
                  </span>
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                    <Clock className="h-4 w-4" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                    {formattedData.length}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    {tMetrics("hours")}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  {tMetrics("range", { start: startDate, end: endDate })}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content: Chart or Table */}
          {viewMode === "chart" ? (
            <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111] shadow-sm">
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                      {tChart("title")}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
                    >
                      {startDate === endDate
                        ? startDate
                        : `${startDate} → ${endDate}`}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-slate-400 mt-0.5">
                    {tChart("description")}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {formattedData.length === 0 ? (
                  <div className="h-72 flex flex-col items-center justify-center text-slate-400 gap-2">
                    <Info className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm">{tChart("noData")}</p>
                  </div>
                ) : (
                  <div className="h-80 sm:h-96 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={formattedData}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="priceGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#10b981"
                              stopOpacity={0.4}
                            />
                            <stop
                              offset="95%"
                              stopColor="#10b981"
                              stopOpacity={0.0}
                            />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="currentColor"
                          className="text-slate-100 dark:text-[#1f1f1f]"
                        />
                        <XAxis
                          dataKey="time"
                          tickLine={false}
                          axisLine={false}
                          tick={{
                            fill: "#888888",
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                          interval="preserveStartEnd"
                          minTickGap={30}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tick={{
                            fill: "#888888",
                            fontSize: 11,
                            fontWeight: 500,
                          }}
                          tickFormatter={(val) => `€${val}`}
                        />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (!active || !payload?.length) return null;
                            const data = payload[0].payload;
                            return (
                              <div className="bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2c2c2c] p-3 rounded-xl shadow-lg">
                                <p className="text-xs text-slate-400 font-medium mb-1">
                                  {data.displayLabel}
                                </p>
                                <p className="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400">
                                  €{data.priceEur.toFixed(4)} / kWh
                                </p>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                  {data.priceCent.toFixed(2)} ct/kWh (
                                  {data.rawPrice.toFixed(2)} €/MWh)
                                </p>
                              </div>
                            );
                          }}
                        />
                        <ReferenceLine
                          y={stats.avg}
                          stroke="#0284c7"
                          strokeDasharray="4 4"
                          label={{
                            value: tChart("avgLabel", {
                              value: stats.avg.toFixed(3),
                            }),
                            fill: "#0284c7",
                            fontSize: 10,
                            position: "top",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="priceEur"
                          stroke="#10b981"
                          strokeWidth={2.5}
                          fillOpacity={1}
                          fill="url(#priceGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111] overflow-hidden">
              <div className="max-h-120 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="sticky top-0 bg-slate-50 dark:bg-[#161616] border-b border-slate-200 dark:border-[#222] z-10">
                    <tr>
                      <th className="p-3 font-bold text-slate-500 dark:text-slate-400">
                        {tTable("dateHour")}
                      </th>
                      <th className="p-3 font-bold text-slate-500 dark:text-slate-400">
                        {tTable("eurKwh")}
                      </th>
                      <th className="p-3 font-bold text-slate-500 dark:text-slate-400">
                        {tTable("centKwh")}
                      </th>
                      <th className="p-3 font-bold text-slate-500 dark:text-slate-400">
                        {tTable("epex")}
                      </th>
                      <th className="p-3 font-bold text-slate-500 dark:text-slate-400">
                        {tTable("relativeTier")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#1f1f1f] font-mono">
                    {formattedData.map((d, i) => {
                      const isLow = d.priceEur <= stats.avg * 0.9;
                      const isHigh = d.priceEur >= stats.avg * 1.1;

                      return (
                        <tr
                          key={i}
                          className="hover:bg-slate-50/60 dark:hover:bg-[#161616]/60 transition-colors"
                        >
                          <td className="p-3 font-sans font-medium text-slate-800 dark:text-slate-200">
                            {d.displayLabel}
                          </td>
                          <td className="p-3 font-bold text-slate-900 dark:text-white">
                            €{d.priceEur.toFixed(4)}
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-300">
                            {d.priceCent.toFixed(2)} ct
                          </td>
                          <td className="p-3 text-slate-400">
                            {d.rawPrice.toFixed(2)}
                          </td>
                          <td className="p-3 font-sans">
                            {isLow ? (
                              <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px]">
                                {tTable("tierCheap")}
                              </Badge>
                            ) : isHigh ? (
                              <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 text-[10px]">
                                {tTable("tierHigh")}
                              </Badge>
                            ) : (
                              <Badge
                                variant="secondary"
                                className="text-[10px]"
                              >
                                {tTable("tierAverage")}
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
