"use client";
import { Button } from "@/shadcn/ui/button";
import { BarChart2, RefreshCw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RecHeader = () => {
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Recommendations.header");

  const handleRefresh = () => {
    setRefresh(true);
    router.refresh();
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-stone-100">
          {t("title")}
        </h1>
        <h5 className="text-xs ml-1">
          {t.rich("basedOn", {
            link: (chunks) => (
              <Link href={`/${locale}/appliances`}>
                <span className="font-bold underline underline-offset-2 cursor-pointer text-slate-900 dark:text-stone-100">
                  {chunks}
                </span>
              </Link>
            ),
          })}
        </h5>
        <p className="text-xs text-slate-500 dark:text-stone-400 mt-1.5 leading-relaxed">
          {t("description")}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => handleRefresh()}
          className="flex items-center gap-2 border-slate-200/80 dark:border-stone-850 bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-stone-900 text-xs font-bold px-3 py-1.5 h-8 cursor-pointer rounded-lg transition-colors"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${refresh ? "animate-spin" : ""}`}
          />{" "}
          {refresh ? t("refreshing") : t("refresh")}
        </Button>
        <Link href={`/${locale}/forecast`} passHref>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-slate-200/80 dark:border-stone-850 bg-white dark:bg-[#111111] hover:bg-slate-50 dark:hover:bg-stone-900 text-xs font-bold px-3 py-1.5 h-8 cursor-pointer rounded-lg transition-colors"
          >
            <BarChart2 className="h-3.5 w-3.5" /> {t("viewForecast")}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RecHeader;
