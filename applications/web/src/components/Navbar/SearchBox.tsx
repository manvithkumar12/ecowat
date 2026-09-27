"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { docsData } from "@ecowat/shared";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";
import { useLocale } from "next-intl";
import { useUser } from "@/src/context/userContext";

interface SearchItem {
  id: string;
  label: string;
  initial: boolean;
  href?: string;
}

const PAGES: SearchItem[] = [
  { id: "home", label: "Home", href: "", initial: true },
  { id: "Profile", label: "Profile", href: "en/profile", initial: true },
  { id: "docs", label: "Docs", href: "en/docs/installation", initial: true },
  { id: "dashboard", label: "Dashboard", href: "en/dashboard", initial: false },
  { id: "about", label: "About", href: "en/about", initial: true },
  {
    id: "Saved_Appliances",
    label: "Saved Appliances",
    href: "en/appliances",
    initial: false,
  },
  {
    id: "Recommendations",
    label: "Recommendations",
    initial: false,
    href: "en/recommendations",
  },
  { id: "Ecky-bot", label: "Ecky Bot", href: "en/ecky", initial: false },
  { id: "scheduler", label: "Scheduler", href: "en/schedule", initial: false },
  {
    id: "tracker",
    label: "Consumption Tracker",
    href: "en/tracker",
    initial: false,
  },
  {
    id: "Footprint",
    label: "Carbon Footprint",
    href: "en/footprint",
    initial: false,
  },
  {
    id: "price-history",
    label: "Price History",
    href: "en/price-history",
    initial: false,
  },
];

export interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  Action: React.Dispatch<React.SetStateAction<boolean>>;
  Query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBox({
  Action,
  placeholder = "Search documentation...",
  className = "",
  Query,
  setQuery,
}: SearchBoxProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const locale = useLocale();
  const user = useUser();
  const onlyInitial = PAGES.filter((page) => page.initial);
  const showPages = user?.hasEnergyId ? PAGES : onlyInitial;
  useEffect(() => {
    const scrollY = window.scrollY;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.width = originalBodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, []);

  interface SearchResult {
    heading: string;
    info: string;
    url: string;
  }

  const getSearchResults = (query: string): SearchResult[] => {
    if (!query) return [];
    const lowered = query.toLowerCase();
    const results: SearchResult[] = [];
    Object.entries(docsData((locale as "de") || "en")).forEach(
      ([category, pages]) => {
        Object.entries(pages).forEach(([pageKey, page]) => {
          const { title, description, navUrl } = page as any;
          if (
            title.toLowerCase().includes(lowered) ||
            description.toLowerCase().includes(lowered)
          ) {
            const cleanUrl = navUrl.startsWith("/") ? navUrl : `/${navUrl}`;
            const url = `/${locale}${cleanUrl}`;
            results.push({ heading: title, info: description, url });
          }
        });
      },
    );
    return results;
  };

  const results = getSearchResults(Query) ?? PAGES;

  return (
    <div
      className="fixed inset-0 h-screen w-screen flex justify-center items-center z-50 bg-black/40 backdrop-blur-sm"
      onClick={() => {
        Action(false);
      }}
    >
      <div
        className={`w-full max-w-lg flex flex-col overflow-hidden rounded-2xl dark:bg-[#0a0a0a]  bg-slate-50 border-[1.5px] border-black shadow-black backdrop-blur-md ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-3 pb-2  dark:bg-[#0a0a0a]">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-muted-foreground/80" />
            <input
              type="text"
              value={Query}
              onChange={(e) => {
                e.stopPropagation();
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder={placeholder}
              className="h-11 w-full dark:bg-[#0a0a0a] text-slate-900  dark:text-white bg-slate-50 rounded-xl border-0 border-border/50 pl-10 pr-4 text-sm  placeholder:text-muted-foreground/60 focus:border-border focus:outline-none focus:ring-1 focus:ring-ring/20 transition-all"
              autoFocus
            />
          </div>
        </div>

        {/* Pages Section */}
        <div className="px-2 py-1">
          <div className="px-3 py-1.5 dark:text-white text-xs font-medium text-muted-foreground/70">
            Pages
          </div>

          <div className="space-y-0.5 max-h-80 overflow-y-auto pr-1">
            {Query ? (
              results.length > 0 ? (
                results.map((res, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <Link
                      key={res.url}
                      href={res.url}
                      onClick={() => Action(false)}
                      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all text-left cursor-pointer ${
                        isSelected
                          ? "bg-white/8 text-foreground"
                          : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
                      }`}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <ArrowRight
                        className={`h-4 w-4 transition-transform ${
                          isSelected
                            ? "text-foreground"
                            : "text-muted-foreground/60 group-hover:text-muted-foreground"
                        }`}
                      />
                      <div className="flex flex-col">
                        <span className="font-medium  text-slate-900  dark:text-white">
                          {res.heading}
                        </span>
                        <span className="text-xs dark:text-white text-muted-foreground">
                          {res.info}
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <div className="py-6 text-center dark:text-white text-xs text-muted-foreground">
                  No results found.
                </div>
              )
            ) : (
              <div className="py-6">
                {showPages.map((page, idx) => (
                  <Link
                    key={page.id}
                    href={`/${page.href}`}
                    onClick={() => Action(false)}
                    className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium cursor-pointer ${
                      idx === selectedIndex
                        ? "bg-white/8 text-foreground"
                        : "text-muted-foreground hover:bg-white/4 hover:text-foreground"
                    }`}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <ArrowRight
                      className={`h-4 w-4 transition-transform ${
                        idx === selectedIndex
                          ? "text-foreground dark:text-white"
                          : "text-muted-foreground/60 dark:text-white group-hover:text-muted-foreground"
                      }`}
                    />
                    <span>{page.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div
          className="mt-2 cursor-pointer dark:bg-[#0a0a0a] flex items-center gap-2 border-t border-border/40 bg-slate-50 px-4 py-2.5 text-[11px] text-muted-foreground"
          onClick={() => Action(false)}
        >
          <kbd className="inline-flex dark:bg-[#0a0a0a] dark:text-white h-5 w-5 items-center justify-center rounded  bg-slate-200 text-[10px] text-muted-foreground">
            <CornerDownLeft className="h-3 w-3" />
          </kbd>
          <span>Go to Page</span>
        </div>
      </div>
    </div>
  );
}
