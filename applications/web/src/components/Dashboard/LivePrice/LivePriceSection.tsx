"use client";

import React, { useState } from "react";
import {
  TrendingDown,
  TrendingUp,
  Zap,
  Clock,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  RefreshCw,
  Layers,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { useLivePrice } from "@/src/context/usePriceData";
import { getGermanDate, getGermanTime } from "@ecowat/shared";
import StatLoading from "@/src/components/statsElements/StatLoading";
import StatError from "@/src/components/statsElements/StatError";
import Link from "next/link";

export default function LivePriceSection() {
  const { PriceData, isPriceLoading, priceError, refetch } = useLivePrice();
  const [filter, setFilter] = useState<"all" | "cheap" | "peak">("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (isPriceLoading || (!PriceData && !priceError)) {
    return (
      <div className="p-6">
        <StatLoading />
      </div>
    );
  }

  if (priceError || !PriceData) {
    return (
      <div className="p-6">
        <StatError refetch={refetch} />
      </div>
    );
  }

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch?.();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const now = Date.now();
  const hourlyPrices = PriceData.hourlyPrices || [];
  const isLower = PriceData.priceTrend === "lower";

  // Find cheapest slot and peak slot
  const cheapestSlot = hourlyPrices.length
    ? [...hourlyPrices].sort((a, b) => a.price - b.price)[0]
    : null;
  const peakSlot = hourlyPrices.length
    ? [...hourlyPrices].sort((a, b) => b.price - a.price)[0]
    : null;

  // Prepare chart data
  const chartData = hourlyPrices.map((item) => {
    const isCurrent = now >= item.start && now < item.end;
    const isCheap = item.price <= PriceData.todayAveragePrice * 0.9;
    const isPeak = item.price >= PriceData.todayAveragePrice * 1.1;

    return {
      time: `${getGermanTime(item.start)}`,
      timeRange: `${getGermanTime(item.start)} - ${getGermanTime(item.end)}`,
      price: item.price,
      isCurrent,
      isCheap,
      isPeak,
      timestamp: item.start,
    };
  });

  const filteredHours = hourlyPrices.filter((item) => {
    if (filter === "cheap") {
      return item.price <= PriceData.todayAveragePrice * 0.9;
    }
    if (filter === "peak") {
      return item.price >= PriceData.todayAveragePrice * 1.1;
    }
    return true;
  });

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 select-text max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111111] p-6 rounded-2xl border border-slate-200 dark:border-[#1e1e1e] shadow-sm">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
              <Zap className="h-5 w-5 fill-emerald-500/20" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Live Electricity Price
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time EPEX Spot Market tariff feed & hourly cost
                intelligence
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Market Feed
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-50 dark:hover:bg-[#1a1a1a] text-xs font-semibold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Current Price */}
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Current Hour Rate
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Zap className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {PriceData.currentPrice.toFixed(4)}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {PriceData.unit}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                  isLower
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-rose-500/10 text-rose-500"
                }`}
              >
                {isLower ? (
                  <TrendingDown className="h-3 w-3" />
                ) : (
                  <TrendingUp className="h-3 w-3" />
                )}
                {isLower ? "-" : "+"}
                {PriceData.percentageChange}%
              </span>
              <span className="text-[11px] text-slate-400">vs 24h avg</span>
            </div>
          </div>
        </div>

        {/* Card 2: 24h Average */}
        <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Today&apos;s 24h Average
            </span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Layers className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {PriceData.todayAveragePrice.toFixed(4)}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                {PriceData.unit}
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              EPEX Day-Ahead Benchmark
            </p>
          </div>
        </div>

        {/* Card 3: Lowest Price (Best Window) */}
        <div className="bg-white dark:bg-[#111111] border border-emerald-500/30 dark:border-emerald-500/20 bg-linear-to-b from-emerald-500/5 to-transparent p-5 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Cheapest Window
            </span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <ArrowDownRight className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight">
                {cheapestSlot
                  ? cheapestSlot.price.toFixed(4)
                  : PriceData.lowestPrice.toFixed(4)}
              </span>
              <span className="text-xs font-semibold text-emerald-500/70">
                {PriceData.unit}
              </span>
            </div>
            <p className="mt-2 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {cheapestSlot
                ? `${getGermanTime(cheapestSlot.start)} - ${getGermanTime(cheapestSlot.end)} (Optimal)`
                : "Optimal period"}
            </p>
          </div>
        </div>

        {/* Card 4: Peak Rate (Avoid Window) */}
        <div className="bg-white dark:bg-[#111111] border border-rose-500/30 dark:border-rose-500/20 bg-linear-to-b from-rose-500/5 to-transparent p-5 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
              Peak Rate Window
            </span>
            <span className="p-2 rounded-xl bg-rose-500/10 text-rose-500">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight">
                {peakSlot
                  ? peakSlot.price.toFixed(4)
                  : PriceData.highestPrice.toFixed(4)}
              </span>
              <span className="text-xs font-semibold text-rose-500/70">
                {PriceData.unit}
              </span>
            </div>
            <p className="mt-2 text-[11px] font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {peakSlot
                ? `${getGermanTime(peakSlot.start)} - ${getGermanTime(peakSlot.end)} (Avoid loads)`
                : "Peak period"}
            </p>
          </div>
        </div>
      </div>

      {/* Hourly Trend Chart */}
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              24-Hour Price Curve
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Hourly pricing trajectory with day-ahead average reference line
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-500">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Cheap Rate (&le; -10%)
            </div>
            <div className="flex items-center gap-1.5 text-rose-500">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              Peak Rate (&ge; +10%)
            </div>
          </div>
        </div>

        <div className="w-full h-72 text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="livePriceGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                opacity={0.15}
              />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                stroke="#94a3b8"
                fontSize={11}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                stroke="#94a3b8"
                fontSize={11}
                tickFormatter={(val) => `${val.toFixed(3)}€`}
                domain={["auto", "auto"]}
              />
              <ReferenceLine
                y={PriceData.todayAveragePrice}
                stroke="#64748b"
                strokeDasharray="4 4"
                label={{
                  value: `Avg: ${PriceData.todayAveragePrice.toFixed(4)}€`,
                  position: "insideTopRight",
                  fill: "#94a3b8",
                  fontSize: 11,
                }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2a2a2a] p-3 rounded-xl shadow-xl text-xs space-y-1">
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          {data.timeRange}
                        </p>
                        <p className="text-emerald-500 font-mono font-bold text-sm">
                          {data.price.toFixed(4)} {PriceData.unit}
                        </p>
                        {data.isCurrent && (
                          <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                            Current Slot
                          </span>
                        )}
                        {data.isCheap && (
                          <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                            Cheap Window
                          </span>
                        )}
                        {data.isPeak && (
                          <span className="inline-block px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 text-[10px] font-bold">
                            Peak Window
                          </span>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#livePriceGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Hourly Price Breakdown Table */}
      <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-[#1e1e1e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-base text-slate-900 dark:text-white">
              Hourly Price Schedule
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Complete hourly breakdown with status tags & optimal timing
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#1a1a1a] p-1 rounded-xl">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === "all"
                  ? "bg-white dark:bg-[#252525] text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              All ({hourlyPrices.length})
            </button>
            <button
              onClick={() => setFilter("cheap")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === "cheap"
                  ? "bg-emerald-500 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Cheap Hours
            </button>
            <button
              onClick={() => setFilter("peak")}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filter === "peak"
                  ? "bg-rose-500 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Peak Hours
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#1e1e1e] text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-[#141414]">
                <th className="py-3 px-6">Time Slot</th>
                <th className="py-3 px-6">Rate ({PriceData.unit})</th>
                <th className="py-3 px-6">Difference vs Avg</th>
                <th className="py-3 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1a1a1a] text-xs font-semibold">
              {filteredHours.map((item, idx) => {
                const startTime = getGermanTime(item.start);
                const endTime = getGermanTime(item.end);
                const todayString = getGermanDate(now);
                const itemString = getGermanDate(item.start);
                const isDifferentDay = todayString !== itemString;
                const isCurrent = now >= item.start && now < item.end;
                const isPast = item.end < now;
                const isCheap = item.price <= PriceData.todayAveragePrice * 0.9;
                const isPeak = item.price >= PriceData.todayAveragePrice * 1.1;

                const diffPct = (
                  ((item.price - PriceData.todayAveragePrice) /
                    PriceData.todayAveragePrice) *
                  100
                ).toFixed(1);

                return (
                  <tr
                    key={idx}
                    className={`hover:bg-slate-50/60 dark:hover:bg-[#161616] transition-colors ${
                      isCurrent
                        ? "bg-emerald-500/10 dark:bg-emerald-500/15"
                        : isPast
                          ? "opacity-60"
                          : ""
                    }`}
                  >
                    <td className="py-3.5 px-6 text-slate-800 dark:text-slate-200 font-medium">
                      <div className="flex items-center gap-2">
                        <span>
                          {startTime} - {endTime}
                        </span>
                        {isDifferentDay && (
                          <span className="text-[10px] text-slate-400">
                            (Next Day)
                          </span>
                        )}
                        {isCurrent && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">
                            NOW
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900 dark:text-slate-100">
                      {item.price.toFixed(4)}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`font-semibold ${
                          Number(diffPct) < 0
                            ? "text-emerald-500"
                            : Number(diffPct) > 0
                              ? "text-rose-500"
                              : "text-slate-400"
                        }`}
                      >
                        {Number(diffPct) > 0 ? `+${diffPct}%` : `${diffPct}%`}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isCheap
                            ? "bg-emerald-500/15 text-emerald-500 dark:bg-emerald-500/20"
                            : isPeak
                              ? "bg-rose-500/15 text-rose-500 dark:bg-rose-500/20"
                              : "bg-slate-500/10 text-slate-500 dark:text-slate-400"
                        }`}
                      >
                        {isCheap ? "Cheap" : isPeak ? "Peak" : "Normal"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Smart AI Action Recommendations */}
      <div className="bg-linear-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-emerald-500/30 p-6 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Optimize Appliance Schedules for Today
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
              Running EV chargers, heat pumps, and dishwashers during the
              cheapest window (
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {cheapestSlot
                  ? `${getGermanTime(cheapestSlot.start)} - ${getGermanTime(cheapestSlot.end)}`
                  : "off-peak"}
              </span>
              ) can save up to <span className="font-bold">34%</span> on daily
              electricity expenses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/en/schedule"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm"
          >
            Auto-Schedule Now
          </Link>
          <Link
            href="/en/ecky"
            className="px-4 py-2 bg-white dark:bg-[#1a1a1a] hover:bg-slate-50 dark:hover:bg-[#252525] border border-slate-200 dark:border-[#2a2a2a] text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition-colors"
          >
            Ask Ecky AI
          </Link>
        </div>
      </div>
    </main>
  );
}
