import Link from "next/link";
import { useTranslations } from "next-intl";
import EcoButton from "./client/EcoButton";

const CtaSection = () => {
  const t = useTranslations("CTA");

  return (
    <section className="py-24 border-b border-border/40 relative overflow-hidden">
      <div className="px-8 max-w-400 mx-auto text-center space-y-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
          {t("title")}
        </h2>
        <p className="text-muted-foreground text-md max-w-lg mx-auto leading-relaxed">
          {t("description")}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 pt-4">
          <EcoButton label={t("getStarted")} />
          <Link
            href="#"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-[13px] font-semibold border border-border bg-card text-foreground hover:bg-muted/60 transition-all text-center"
          >
            {t("contactUs")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
