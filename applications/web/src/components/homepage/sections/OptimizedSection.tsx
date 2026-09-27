import { Leaf, LineChart, Sparkles, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const OptimizedSection = () => {
  const t = useTranslations("Optimized");

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1 */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col space-y-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-foreground mb-1.5">
                {t("feature1Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("feature1Desc")}
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col space-y-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Leaf className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-foreground mb-1.5">
                {t("feature2Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("feature2Desc")}
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col space-y-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <LineChart className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-foreground mb-1.5">
                {t("feature3Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("feature3Desc")}
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col space-y-4">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-foreground mb-1.5">
                {t("feature4Title")}
              </h3>
              <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                {t("feature4Desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OptimizedSection;
