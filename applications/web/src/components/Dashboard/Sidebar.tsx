"use client";
import {
  BarChart3,
  Bot,
  CalendarClock,
  Euro,
  FileText,
  LayoutDashboard,
  Lightbulb,
  Sliders,
  Timer,
  X,
  Zap,
} from "lucide-react";
import { Link } from "@/src/i18n/routing";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const Sidebar = ({ currentPage }: { currentPage: string }) => {
  const t = useTranslations("Sidebar");

  const navItems = [
    {
      name: t("dashboard"),
      id: "dashboard",
      icon: LayoutDashboard,
      url: "/dashboard",
    },
    { name: t("forecast"), id: "forecast", icon: Timer, url: "/forecast" },
    {
      name: t("appliances"),
      id: "appliances",
      icon: Sliders,
      url: "/appliances",
    },
    {
      name: t("recommendations"),
      id: "recommendations",
      icon: Lightbulb,
      url: "/recommendations",
    },
    {
      name: t("schedule"),
      id: "schedule",
      icon: CalendarClock,
      url: "/schedule",
    },
    { name: t("tracker"), id: "tracker", icon: BarChart3, url: "/tracker" },
    {
      name: t("footprint"),
      id: "footprint",
      icon: FileText,
      url: "/footprint",
    },
    {
      name: t("priceHistory"),
      id: "price-history",
      icon: Euro,
      url: "/price-history",
    },
    { name: t("ecky"), id: "ecky", icon: Bot, url: "/ecky" },
    { name: t("docs"), id: "docs", icon: Bot, url: "/docs/installation" },
  ];
  const [activeTab, setActiveTab] = useState(currentPage);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-[#1f1f1f] bg-white dark:bg-[#0d0d0d] shrink-0 sticky top-0 h-screen select-none z-30">
        {/* Brand */}
        <div className="h-16 px-6 flex items-center gap-2.5 border-b border-slate-200 dark:border-[#1f1f1f]">
          <div className="h-9 w-9 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
            <Zap className="h-5 w-5 text-primary fill-primary" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
            EcoWatt
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.url as any}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-[3px] border-primary pl-3"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1a1a1a] hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 shrink-0 ${isActive ? "text-primary" : "text-slate-400 group-hover:text-slate-500 dark:group-hover:text-slate-300"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-[#1f1f1f] bg-slate-50/50 dark:bg-[#0f0f0f]/30">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#151515] border border-slate-150 dark:border-[#242424] shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              AI
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                {t("assistantTitle")}
              </p>
              <p className="text-[10px] text-primary font-semibold truncate">
                {t("assistantSubtitle")}
              </p>
            </div>
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 border-r border-slate-200 dark:border-[#1f1f1f] bg-white dark:bg-[#0d0d0d] flex flex-col z-50 transform lg:hidden transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-[#1f1f1f]">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary fill-primary" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-linear-to-r from-primary to-teal-500 bg-clip-text text-transparent">
              EcoWatt
            </span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1a1a1a]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                href={item.url as any}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? "bg-primary/10 text-primary border-l-[3px] border-primary pl-3"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#1a1a1a]"
                }`}
              >
                <Icon
                  className={`h-4.5 w-4.5 ${isActive ? "text-primary" : "text-slate-400"}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
