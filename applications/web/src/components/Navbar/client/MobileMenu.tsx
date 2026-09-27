"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Menu, X, Search } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { name: "Dashboard", href: "#", active: true },
  { name: "Forecast", href: "#", active: false },
  { name: "Analytics", href: "#", active: false },
  { name: "Recommendations", href: "#", active: false },
];

const USER_LINKS = [
  { name: "Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Logout", href: "#", destructive: true },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open &&
        mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-100 bg-black/30 backdrop-blur-sm lg:hidden animate-fade-in"
              onClick={() => setOpen(false)}
            />

            <div className="fixed top-0 right-0 bottom-0 z-101 w-72 lg:hidden bg-background border-l border-border/40 shadow-2xl flex flex-col animate-slide-in-right">
              <div className="flex items-center justify-between px-5 h-14 border-b border-border/40 shrink-0">
                <span className="text-[14px] font-semibold text-foreground tracking-tight">
                  Navigation
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="px-4 py-3.5 border-b border-border/40 shrink-0">
                <div className="relative flex items-center group w-full">
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <input
                    type="search"
                    placeholder="Search..."
                    className="h-9 w-full rounded-full border border-border/60 bg-muted/30 px-9 text-sm outline-none transition-all focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary/20 placeholder:text-muted-foreground/70"
                  />
                </div>
              </div>

              <nav className="flex flex-col gap-1 px-3 py-4 flex-1 overflow-y-auto">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2.5 text-[14px] rounded-md transition-colors ${
                      link.active
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-muted-foreground font-medium hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="my-2 border-t border-border/40" />

                {USER_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2.5 text-[14px] rounded-md transition-colors font-medium ${
                      link.destructive
                        ? "text-red-500 hover:text-red-600 hover:bg-red-500/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </>,
          document.body,
        )}
    </>
  );
}
