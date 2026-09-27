"use client";

import { Globe } from "lucide-react";
import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { useRouter, usePathname } from "@/src/i18n/routing";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations("Navbar");

  const handleLanguageChange = (newLocale: "en" | "de") => {
    if (newLocale !== currentLocale) {
      router.replace({ pathname }, { locale: newLocale });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground focus:outline-none"
            aria-label="Change language"
          >
            <Globe className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t("language")}</p>
        </TooltipContent>
      </Tooltip>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-border bg-card p-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
            <button
              onClick={() => handleLanguageChange("en")}
              className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors hover:bg-muted cursor-pointer ${
                currentLocale === "en"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <span>{t("english")}</span>
              {currentLocale === "en" && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
            <button
              onClick={() => handleLanguageChange("de")}
              className={`flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs transition-colors hover:bg-muted cursor-pointer ${
                currentLocale === "de"
                  ? "text-primary font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <span>{t("german")}</span>
              {currentLocale === "de" && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
