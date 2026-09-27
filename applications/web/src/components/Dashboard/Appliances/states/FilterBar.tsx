"use client";

import React from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownUp,
  Layers,
  PowerOff,
} from "lucide-react";
import { useTranslations } from "next-intl";

export type FilterType =
  | "all"
  | "active"
  | "inactive"
  | "highUsage"
  | "Optimizable";

interface FilterBarProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    inactive: number;
    highUsage: number;
    Optimizable: number;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  setActiveFilter,
  counts,
}) => {
  const t = useTranslations("Appliances.filters");

  const filters: {
    key: FilterType;
    label: string;
    icon: React.ReactNode;
    activeColor: string;
    activeBg: string;
  }[] = [
    {
      key: "all",
      label: t("all"),
      icon: <Layers className="h-3.5 w-3.5" />,
      activeColor: "text-slate-900 dark:text-stone-100",
      activeBg:
        "bg-slate-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-md",
    },
    {
      key: "active",
      label: t("active"),
      icon: <Activity className="h-3.5 w-3.5" />,
      activeColor: "text-emerald-700 dark:text-emerald-400",
      activeBg:
        "bg-emerald-600 dark:bg-emerald-500 text-white dark:text-white shadow-md shadow-emerald-200 dark:shadow-emerald-900/30",
    },
    {
      key: "inactive",
      label: t("inactive"),
      icon: <PowerOff className="h-3.5 w-3.5" />,
      activeColor: "text-slate-500 dark:text-stone-400",
      activeBg:
        "bg-slate-500 dark:bg-stone-500 text-white dark:text-white shadow-md",
    },
    {
      key: "highUsage",
      label: t("highUsage"),
      icon: <AlertTriangle className="h-3.5 w-3.5" />,
      activeColor: "text-amber-600 dark:text-amber-400",
      activeBg:
        "bg-amber-500 dark:bg-amber-500 text-white dark:text-white shadow-md shadow-amber-200 dark:shadow-amber-900/30",
    },
    {
      key: "Optimizable",
      label: t("optimizable"),
      icon: <ArrowDownUp className="h-3.5 w-3.5" />,
      activeColor: "text-rose-600 dark:text-rose-400",
      activeBg:
        "bg-rose-500 dark:bg-rose-500 text-white dark:text-white shadow-md shadow-rose-200 dark:shadow-rose-900/30",
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f) => {
        const isActive = activeFilter === f.key;
        const count = counts[f.key];
        return (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`
              inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold
              transition-all duration-200 ease-out border cursor-pointer
              ${
                isActive
                  ? `${f.activeBg} border-transparent`
                  : "bg-white dark:bg-[#0c0a09] border-slate-200 dark:border-stone-800 text-slate-600 dark:text-stone-400 hover:border-slate-300 dark:hover:border-stone-700 hover:bg-slate-50 dark:hover:bg-stone-900/50"
              }
            `}
          >
            {f.icon}
            {f.label}
            <span
              className={`
                ml-0.5 text-[10px] font-bold rounded-md min-w-[18px] h-[18px] flex items-center justify-center px-1
                ${
                  isActive
                    ? "bg-white/20 text-inherit"
                    : "bg-slate-100 dark:bg-stone-800 text-slate-500 dark:text-stone-400"
                }
              `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default FilterBar;
