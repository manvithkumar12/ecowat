import { Compass, LayoutDashboard, Leaf, LineChart } from "lucide-react";
import { useTranslations } from "next-intl";

const BenefitsSection = () => {
  const t = useTranslations("Benefits");

  return (
    <section className="py-24 border-b border-border/40 bg-card/25">
      <div className="px-8 max-w-400 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            {t("badge")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            {t("title")}
          </h2>
          <p className="text-muted-foreground max-w-xl text-[14px] md:text-[15px]">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Benefit 1 */}
          <div className="rounded-xl border border-border bg-card p-6 flex items-start gap-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <LineChart className="h-4.5 w-4.5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                {t("benefit1Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("benefit1Desc")}
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="rounded-xl border border-border bg-card p-6 flex items-start gap-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <Compass className="h-4.5 w-4.5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                {t("benefit2Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("benefit2Desc")}
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="rounded-xl border border-border bg-card p-6 flex items-start gap-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <Leaf className="h-4.5 w-4.5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                {t("benefit3Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("benefit3Desc")}
              </p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="rounded-xl border border-border bg-card p-6 flex items-start gap-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
              <LayoutDashboard className="h-4.5 w-4.5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-[14px] font-bold text-foreground">
                {t("benefit4Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("benefit4Desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
