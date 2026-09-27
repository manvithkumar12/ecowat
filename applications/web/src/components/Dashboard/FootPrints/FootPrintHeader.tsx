"use client";
import { Button } from "@/shadcn/ui/button";
import { Download, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useTranslations } from "next-intl";

const FootPrintHeader = () => {

  const t = useTranslations("Footprint.header");
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const handleRefresh = () => {
    setRefresh(true);
    router.refresh();
    setTimeout(() => {
      setRefresh(false);
    }, 500);
  };
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-stone-100">
          {t("title")}
        </h1>
        <p className="text-sm text-slate-600 dark:text-stone-400 mt-1">
          {t("description")}
        </p>
      </div>
    </div>
  );
};

export default FootPrintHeader;
