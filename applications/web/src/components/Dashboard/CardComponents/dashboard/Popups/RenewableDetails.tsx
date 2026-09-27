import NullData from "@/src/components/generalComponents/NullData";
import {
  statusGlowMap,
  statusLabelMap,
  statusToneMap,
} from "@/src/utils/renewable/colour-utils";
import { RenewableData } from "@ecowat/shared/dataServices/Dashboard/renewabilityCheck";
import {
  Leaf,
  SunMedium,
  Wind,
  X,
  Clock,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useTranslations } from "next-intl";

const RenewableDetails = ({
  setIsModalOpen,
  RenewableData,
}: {
  setIsModalOpen: (val: boolean) => void;
  RenewableData: RenewableData;
}) => {
  const t = useTranslations("Dashboard.popups.renewableDetails");

  if (!RenewableData)
    return (
      <NullData
        Action1={() => setIsModalOpen(false)}
        Action2={() => setIsModalOpen(false)}
        title={t("title")}
        info={"No Renewable Data Available"}
        description={
          "No renewable data is available yet. Please try again later."
        }
      />
    );

  const scoreColorClass =
    RenewableData.status === "Excellent"
      ? "text-cyan-500"
      : RenewableData.status === "High"
        ? "text-emerald-500"
        : RenewableData.status === "Moderate"
          ? "text-amber-500"
          : "text-rose-500";

  const scoreColorHex =
    RenewableData.status === "Excellent"
      ? "#06b6d4"
      : RenewableData.status === "High"
        ? "#10b981"
        : RenewableData.status === "Moderate"
          ? "#f59e0b"
          : "#ef4444";

  const scoreBgGradient =
    RenewableData.status === "Excellent"
      ? "from-cyan-500/10 to-teal-500/5"
      : RenewableData.status === "High"
        ? "from-emerald-500/10 to-teal-500/5"
        : RenewableData.status === "Moderate"
          ? "from-amber-500/10 to-orange-500/5"
          : "from-rose-500/10 to-red-500/5";

  // Calculate circular gauge metrics
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (RenewableData.score / 100) * circumference;

  // Format data for Recharts
  const chartData =
    RenewableData.hourlyData?.map((item) => ({
      hour: `${String(item.hour).padStart(2, "0")}:00`,
      score: item.renewableScore,
      Solar: item.solarScore,
      Wind: item.windScore,
    })) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-zinc-800/80 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-zinc-800/60 flex items-center justify-between bg-slate-50/50 dark:bg-zinc-900/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 animate-pulse">
              <Leaf className="h-5 w-5 fill-emerald-500/20" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white tracking-tight">
                  {t("title")}
                </h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[9px] font-black bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">
                  {t("live")}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium flex items-center gap-1.5 mt-0.5">
                <Clock className="h-3 w-3" />
                {t("germanyTime")} • {RenewableData.currentTime || "12:00"}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="h-8 w-8 rounded-lg border border-slate-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 hover:bg-slate-50 dark:hover:bg-zinc-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Main Grid: Score Gauge and Side stats */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Hero Card: circular gauge */}
            <div
              className={`md:col-span-5 rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-6 flex flex-col items-center justify-center text-center bg-linear-to-b ${scoreBgGradient} shadow-lg ${statusGlowMap[RenewableData.status]}`}
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                {t("ecoPotential")}
              </span>

              {/* Gauge */}
              <div className="relative h-36 w-36 my-4 flex items-center justify-center">
                <svg className="h-full w-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="currentColor"
                    className="text-slate-200/50 dark:text-zinc-800"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r={radius}
                    stroke="currentColor"
                    className={`${scoreColorClass} transition-all duration-1000 ease-out`}
                    strokeWidth="9"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {RenewableData.score}%
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${scoreColorClass} mt-0.5`}
                  >
                    {RenewableData.status}
                  </span>
                </div>
              </div>

              <div
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusToneMap[RenewableData.status]}`}
              >
                {RenewableData.status} {t("status")}
              </div>

              <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400 leading-normal max-w-50">
                {statusLabelMap[RenewableData.status]}
              </p>
            </div>

            {/* Right Side Metrics Grid */}
            <div className="md:col-span-7 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-200/60 dark:border-zinc-800 p-5 flex flex-col justify-between bg-slate-50/30 dark:bg-zinc-900/10 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <SunMedium
                      className="h-4 w-4 text-amber-500 animate-spin"
                      style={{ animationDuration: "15s" }}
                    />
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-bold">
                      {t("solarGeneration")}
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {RenewableData.solarScore}%
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">
                  {t("solarFactor")}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200/60 dark:border-zinc-800 p-5 flex flex-col justify-between bg-slate-50/30 dark:bg-zinc-900/10 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <Wind
                      className="h-4 w-4 text-cyan-500 animate-bounce"
                      style={{ animationDuration: "3s" }}
                    />
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-bold">
                      {t("windGeneration")}
                    </span>
                  </div>
                  <p className="mt-3 text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {RenewableData.windScore}%
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 mt-2">
                  {t("windFactor")}
                </p>
              </div>

              {/* Best Windows List Summary */}
              <div className="col-span-2 rounded-2xl border border-slate-200/60 dark:border-zinc-800 p-5 bg-slate-50/30 dark:bg-zinc-900/10">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-bold mb-3">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-500" />
                  {t("peakWindows")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {RenewableData.bestHours.map((hour) => (
                    <span
                      key={hour}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 dark:border-emerald-500/5 hover:scale-105 transition-transform"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {String(hour).padStart(2, "0")}:00
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recharts Hourly AreaChart */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-6 bg-slate-50/20 dark:bg-zinc-900/5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">
                  {t("timelineTitle")}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {t("timelineSubtitle")}
                </p>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {t("ecoIndex")}
                </span>
              </div>
            </div>

            <div className="h-44 w-full text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="renewableGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={scoreColorHex}
                        stopOpacity={0.25}
                      />
                      <stop
                        offset="95%"
                        stopColor={scoreColorHex}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="hour"
                    tickLine={false}
                    axisLine={false}
                    stroke="var(--muted-foreground)"
                    interval={2}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    stroke="var(--muted-foreground)"
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                      fontSize: "11px",
                    }}
                    itemStyle={{ color: "var(--foreground)" }}
                    formatter={(val) => [`${val}%`, t("ecoIndex")]}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke={scoreColorHex}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#renewableGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Eco Guide / User Actions */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-zinc-800 p-5 bg-linear-to-r from-emerald-500/3 to-teal-500/3 dark:from-emerald-500/2 dark:to-transparent">
            <h4 className="text-sm font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
              <Sparkles className="h-4 w-4 text-emerald-500" />
              {t("actionsTitle")}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-zinc-300">
                    {t("shiftApplianceTitle")}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    {t("shiftApplianceDesc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-zinc-300">
                    {t("coordinateChargingTitle")}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
                    {t("coordinateChargingDesc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-zinc-800/60 bg-slate-50/50 dark:bg-zinc-900/10 flex items-center justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-bold">
              {t("currentPeakStatus")}
            </p>
            <p className="font-extrabold text-slate-900 dark:text-white text-xs mt-0.5">
              {RenewableData.score}% {t("scoreLabel")} • {RenewableData.status} {t("gridLabel")}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 rounded-xl bg-slate-900 dark:bg-zinc-100 hover:bg-slate-800 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-black transition-colors cursor-pointer shadow-sm hover:shadow"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RenewableDetails;
