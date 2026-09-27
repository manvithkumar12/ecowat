"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@teispace/next-themes";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { useTranslations } from "next-intl";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navbar");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground focus:outline-none"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4" />
      </button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground focus:outline-none"
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 scale-100 rotate-0 transition-transform duration-300 ease-in-out text-muted-foreground dark:text-foreground" />
          <Moon className="absolute h-4 w-4 scale-0 rotate-0 transition-transform duration-300 ease-in-out text-muted-foreground dark:text-foreground" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{t("Theme")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
