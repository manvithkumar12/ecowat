import { ChevronRight, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const WorkSection = () => {
  const t = useTranslations("Work");

  return (
    <section className="py-24 border-b border-border/40">
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

        <div className="flex flex-col space-y-4">
          {/* Step 1 */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[13px] font-bold">
                1
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-foreground">
                  {t("step1Title")}
                </h3>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">
                  {t("step1Desc")}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground hidden md:block" />
          </div>

          {/* Step 2 */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[13px] font-bold">
                2
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-foreground">
                  {t("step2Title")}
                </h3>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">
                  {t("step2Desc")}
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground hidden md:block" />
          </div>

          {/* Step 3 */}
          <div className="rounded-xl border border-border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[13px] font-bold">
                3
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-foreground">
                  {t("step3Title")}
                </h3>
                <p className="text-[12.5px] text-muted-foreground mt-0.5">
                  {t("step3Desc")}
                </p>
              </div>
            </div>
            <ShieldCheck className="h-5 w-5 text-emerald-500 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
