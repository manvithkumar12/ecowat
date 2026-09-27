import { HeroPreview } from "../HeroPreview";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import EcoButton from "./client/EcoButton";
import { useTranslations } from "next-intl";

const HomeSection = () => {
  const t = useTranslations("Hero");

  return (
    <section className="relative pt-24 pb-28 md:pt-20 md:pb-10 border-b border-border/40 overflow-hidden">
      <div className="px-8 max-w-400 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/5 text-emerald-500 border border-emerald-500/20">
            <Sparkles className="h-3 w-3" />
            {t("badge")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] max-w-2xl">
            {t("title")}
          </h1>
          <p className="text-md md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            {t("description")}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4">
            <EcoButton label={t("getStarted")} />
            <Link
              href="/docs/installation"
              className="inline-flex items-center justify-center px-6 py-3 rounded-md text-[13px] font-semibold border border-border bg-card text-foreground hover:bg-muted/60 transition-all text-center"
            >
              {t("learnMore")}
            </Link>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
};

export default HomeSection;
