"use client";
import { LivePriceContext } from "@/src/context/usePriceData";
import { Menu, Search } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "../Theme/theme-toggle";
import SearchBox from "../Navbar/SearchBox";
import LanguageSwitcher from "../Navbar/client/LanguageSwitcher";

const DashboardNavbar = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [field, setField] = useState(false);
  const [Query, setQuery] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target;
      let currentScrollY = 0;

      if (target === document) {
        currentScrollY = window.scrollY;
      } else if (target instanceof HTMLElement) {
        currentScrollY = target.scrollTop;
      } else {
        return;
      }

      if (Math.abs(currentScrollY - lastScrollY.current) < 5) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 64) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    const handlekeydown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setField((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handlekeydown);
    return () => window.removeEventListener("keydown", handlekeydown);
  }, []);
  const context = useContext(LivePriceContext);
  const PriceData = context?.PriceData;
  const isCheap =
    PriceData != null &&
    PriceData.currentPrice <= PriceData.todayAveragePrice * 0.9;

  const isPeak =
    PriceData != null &&
    PriceData.currentPrice >= PriceData.todayAveragePrice * 1.1;

  return (
    <header
      className={`h-16 border-b border-slate-200 dark:border-[#1f1f1f] bg-white/80 dark:bg-[#0d0d0d]/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 select-none transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1a1a1a] lg:hidden"
          aria-label="Open sidebar navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative hidden lg:flex w-80 items-center group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          <input
            type="text"
            ref={searchInputRef}
            placeholder="Search forecasts, recommendations..."
            value={Query}
            onChange={(e) => {
              (setQuery(e.target.value), setField(true));
            }}
            className="w-full h-9 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-[#2a2a2a] bg-slate-55 dark:bg-[#151515] text-xs outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-black transition-all"
          />
          <div className="absolute right-2.5 flex items-center gap-1">
            <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>
      <div className="flex ml-auto gap-3">
        <div className="rounded-xl border border-slate-250 dark:border-[#222222] bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] transition-colors cursor-pointer">
          <LanguageSwitcher />
        </div>
        <div className="rounded-xl border border-slate-250 dark:border-[#222222] bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] transition-colors cursor-pointer">
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center gap-3.5">
        <div
          className={`hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full ${isCheap ? "bg-green-500/10 border border-green-500/20" : isPeak ? "bg-red-500/50 text-white border border-red-500/20" : "bg-amber-500/10 border border-amber-500/20"} text-xs font-bold`}
        >
          {isCheap ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
              <span>Grid is Cheap</span>
            </>
          ) : isPeak ? (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
              <span>Grid is Peak</span>
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              <span>Grid is Normal</span>
            </>
          )}
        </div>
      </div>
      {field && (
        <SearchBox Action={setField} Query={Query} setQuery={setQuery} />
      )}
    </header>
  );
};

export default DashboardNavbar;
