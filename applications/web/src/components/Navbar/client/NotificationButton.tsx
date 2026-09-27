"use client";

import { Bell } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { useTranslations } from "next-intl";

export default function NotificationButton() {
  const t = useTranslations("Navbar");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-1.25 top-1.25 h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("Notifications")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
