"use client";

// ── Skeleton: matches the WeeklyEst section shape ──────────────────────────
export const WeeklyEstSkeleton = () => (
  <section className="animate-pulse">
    {/* Title + subtitle */}
    <div className="mb-4 h-6 w-52 rounded-md bg-slate-200 dark:bg-slate-800" />
    <div className="mb-6 h-4 w-72 rounded bg-slate-200 dark:bg-slate-800" />

    {/* Chart area */}
    <div className="relative h-75 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50">
      {/* Fake Y-axis lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t border-slate-200 dark:border-slate-700/50"
          style={{ top: `${i * 25}%` }}
        />
      ))}

      {/* Fake bars rising from the bottom */}
      <div className="absolute bottom-0 left-8 right-4 flex items-end justify-between gap-2 px-4 pb-2">
        {[55, 80, 40, 95, 65, 30, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-emerald-200 dark:bg-emerald-800/60"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </div>

    {/* Stats row */}
    <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-4 rounded bg-slate-200 dark:bg-slate-800" />
      ))}
    </div>
  </section>
);

// ── Error state ─────────────────────────────────────────────────────────────
type WeeklyEstErrorProps = {
  refetch?: () => Promise<unknown>;
};

// ── Skeleton: matches the MonthlyEst Card shape ─────────────────────────────
export const MonthlyEstSkeleton = () => (
  <section className="animate-pulse">
    {/* Card shell */}
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-stone-800 dark:bg-[#0c0a09]">
      {/* Card header */}
      <div className="border-b border-slate-100 p-6 pb-5 dark:border-stone-900/50">
        <div className="mb-2 h-6 w-56 rounded-md bg-slate-200 dark:bg-slate-800" />
        <div className="h-4 w-72 rounded bg-slate-200 dark:bg-slate-800" />
      </div>

      {/* Chart area */}
      <div className="p-6">
        <div className="relative h-80 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50">
          {/* Fake horizontal gridlines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-slate-200 dark:border-slate-700/50"
              style={{ top: `${i * 22}%` }}
            />
          ))}
          {/* Fake bars — 30 narrow columns */}
          <div className="absolute bottom-0 left-4 right-4 flex items-end gap-[3px]">
            {Array.from({ length: 30 }, (_, i) => {
              const h = [40, 55, 70, 50, 80, 60, 45, 75, 65, 90,
                         50, 35, 68, 72, 55, 48, 83, 60, 40, 70,
                         58, 77, 63, 88, 52, 44, 69, 76, 61, 85][i];
              return (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-emerald-200 dark:bg-emerald-800/60"
                  style={{ height: `${h}%` }}
                />
              );
            })}
          </div>
        </div>

        {/* Stat cards */}
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-stone-800 dark:bg-stone-950/40"
            >
              <div className="h-3 w-32 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="mt-3 h-7 w-24 rounded-md bg-slate-200 dark:bg-slate-800" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── Error state ──────────────────────────────────────────────────────────────
type MonthlyEstErrorProps = {
  refetch?: () => Promise<unknown>;
};

import { useTranslations } from "next-intl";

export const MonthlyEstError = ({ refetch }: MonthlyEstErrorProps) => {
  const t = useTranslations("Footprint.states");
  const tMonthly = useTranslations("Footprint.monthly");

  return (
    <section>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-stone-800 dark:bg-[#0c0a09]">
        {/* Card header */}
        <div className="border-b border-slate-100 p-6 pb-5 dark:border-stone-900/50">
          <p className="text-xl font-semibold text-slate-900 dark:text-stone-100">
            {tMonthly("title")}
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-stone-400">
            {tMonthly("subtitle")}
          </p>
        </div>

        {/* Error body */}
        <div className="flex min-h-80 flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
            <svg
              className="h-7 w-7 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-rose-500">
            {t("unableMonthlyTitle")}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-stone-400">
            {t("unableMonthlyDesc")}
          </p>
          {refetch && (
            <button
              onClick={() => void refetch()}
              className="mt-4 rounded-lg bg-emerald-500 px-5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-600 cursor-pointer"
            >
              {t("retry")}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export const WeeklyEstError = ({ refetch }: WeeklyEstErrorProps) => {
  const t = useTranslations("Footprint.states");
  const tWeekly = useTranslations("Footprint.weekly");

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-stone-100">
        {tWeekly("title")}
      </h2>

      <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-stone-800 dark:bg-[#0c0a09]">
        {/* Icon */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
          <svg
            className="h-7 w-7 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <p className="text-sm font-semibold text-rose-500">
          {t("unableWeeklyTitle")}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-stone-400">
          {t("unableWeeklyDesc")}
        </p>

        {refetch && (
          <button
            onClick={() => void refetch()}
            className="mt-4 rounded-lg bg-emerald-500 px-5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-600 cursor-pointer"
          >
            {t("retry")}
          </button>
        )}
      </div>
    </section>
  );
};

// ── Skeleton: matches CarbonReduction section shape ─────────────────────────
export const CarbonReductionSkeleton = () => (
  <section className="animate-pulse">
    {/* Title + subtitle */}
    <div className="mb-4 h-6 w-56 rounded-md bg-slate-200 dark:bg-slate-800" />
    <div className="mb-6 h-4 w-72 rounded bg-slate-200 dark:bg-slate-800" />

    {/* Chart area */}
    <div className="relative h-75 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800/50">
      {/* Fake horizontal gridlines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="absolute left-0 right-0 border-t border-slate-200 dark:border-slate-700/50"
          style={{ top: `${i * 25}%` }}
        />
      ))}

      {/* Fake line / data points */}
      <div className="absolute inset-x-8 inset-y-12 flex items-center justify-between">
        {[45, 60, 35, 75, 50, 85, 65].map((val, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-emerald-300 dark:bg-emerald-700"
            style={{ transform: `translateY(${(50 - val) * 1.5}px)` }}
          />
        ))}
      </div>
    </div>

    {/* Projected summary */}
    <div className="mt-4 h-4 w-52 rounded bg-slate-200 dark:bg-slate-800" />
  </section>
);

// ── Error state: CarbonReduction ─────────────────────────────────────────────
type CarbonReductionErrorProps = {
  refetch?: () => Promise<unknown>;
};

export const CarbonReductionError = ({ refetch }: CarbonReductionErrorProps) => {
  const t = useTranslations("Footprint.states");
  const tReduction = useTranslations("Footprint.reduction");

  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100">
          {tReduction("title")}
        </h2>
      </div>

      <div className="flex min-h-75 flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-stone-800 dark:bg-[#0c0a09]">
        {/* Icon */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900/30">
          <svg
            className="h-7 w-7 text-rose-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <p className="text-sm font-semibold text-rose-500">
          {t("unableReductionTitle")}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-stone-400">
          {t("unableReductionDesc")}
        </p>

        {refetch && (
          <button
            onClick={() => void refetch()}
            className="mt-4 rounded-lg bg-emerald-500 px-5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-600 cursor-pointer"
          >
            {t("retry")}
          </button>
        )}
      </div>
    </section>
  );
};
