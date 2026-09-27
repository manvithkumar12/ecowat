import { Zap } from "lucide-react";
import { ThemeToggle } from "../Theme/theme-toggle";
import { SearchBar } from "./client/SearchBar";
import ProfileButton from "./client/ProfileButton";
import NotificationButton from "./client/NotificationButton";
import LanguageSwitcher from "./client/LanguageSwitcher";
import { MobileMenu } from "./client/MobileMenu";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useUser } from "@/src/context/userContext";
import { Button } from "@/shadcn/ui/button";

export function Navbar() {
  const t = useTranslations("Navbar");
  const user = useUser();
  const isLogged = !!user?.id;
  const isVerified = !!user?.hasEnergyId;

  const NAV_LINKS = [
    { name: t("dashboard"), href: "/dashboard", active: false },
    { name: t("forecast"), href: "/forecast", active: false },
    { name: t("schedule"), href: "/schedule", active: false },
    { name: t("recommendations"), href: "/recommendations", active: false },
    { name: t("appliances"), href: "/appliances", active: false },
    { name: t("tracker"), href: "/tracker", active: false },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8 max-w-400 mx-auto gap-4 md:gap-10">
        <div className="flex items-center gap-2 pr-2 shrink-0">
          <Zap className="h-4.5 w-4.5 text-primary" fill="currentColor" />
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            EcoWatt
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-1.5">
          {isLogged &&
            isVerified &&
            NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-1.5 text-[14px] transition-colors rounded-md ${
                  link.active
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground font-medium hover:text-foreground hover:bg-muted/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
        </div>
      
        {isLogged && !isVerified && (
          <div className="hidden lg:flex items-center gap-1.5">
            <Link
              href="/"
              className={`px-3 py-1.5 text-[14px] transition-colors rounded-md ${
                isVerified
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground font-medium hover:text-foreground hover:bg-muted/60"
              }`}
            >
              Home
            </Link>
          </div>
        )}

        {/* Desktop action icons — hidden on mobile/tablet */}
        <div className="ml-auto hidden lg:flex items-center gap-4">
          <SearchBar />
          <div className="flex items-center gap-2 border-l border-border/50 pl-6 ml-2">
            <LanguageSwitcher />
            <NotificationButton />
            <ThemeToggle />
            {isLogged ? (
              <div className="relative ml-1">
                <ProfileButton />
              </div>
            ) : (
              <div className="relative ml-1">
                <Button variant="default" size="lg" asChild>
                  <Link href="/login">{t("login")}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile/Tablet actions (Language switcher, Theme toggle) + Hamburger */}
        <div className="ml-auto flex lg:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
