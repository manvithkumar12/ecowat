"use client";
import { Card, CardContent } from "@/shadcn/ui/card";
import { useCarbonEmissionContext } from "@/src/context/useCarbonEmissions";
import { useTranslations } from "next-intl";

const EquivalentCards = () => {
  const t = useTranslations("Footprint.equivalents");
  const { data, isLoading, isError, refetch } = useCarbonEmissionContext();

  if (isLoading) {
    return (
      <section>
        <div className="mb-4 h-6 w-52 rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="rounded-2xl border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm p-6 animate-pulse space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-4 rounded bg-slate-200 dark:bg-slate-800 w-3/4"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError || !data) {
    return null;
  }

  // Build full 7-day scaffold (oldest → today), missing days default to 0
  const fullWeek = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().slice(0, 10);
    const match = data.weeklyData.find((w) => w.date === dateStr);
    return { date: dateStr, carbonEmission: match?.carbonEmission ?? 0 };
  });

  const firstEmission = fullWeek[0].carbonEmission; // oldest day (or 0)
  const lastEmission = fullWeek[fullWeek.length - 1].carbonEmission; // today (or 0)

  // Net change: positive = reduction, negative = increase
  const netChange = firstEmission - lastEmission;
  const isReduction = netChange > 0;

  // Use absolute saved/added value for equivalents
  const reductionKg = Math.abs(netChange);

  // Environmental conversions
  const treesPlanted = Math.round(reductionKg / 21); // ~21 kg CO₂ absorbed per tree/year
  const carTravelAvoided = Math.round(reductionKg * 4); // ~0.25 kg CO₂ per km
  const ledHours = Math.round(reductionKg * 2.85); // ~0.35 kg CO₂ per hour LED

  const trend = isReduction
    ? {
        color: "text-emerald-600 dark:text-emerald-400",
      }
    : {
        color: "text-rose-500 dark:text-rose-400",
      };

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
        {t("title")}
      </h2>
      <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm p-6">
        <CardContent className="space-y-4 pt-2">
          {/* Summary line */}
          <p className="text-sm text-slate-600 dark:text-stone-400">
            {isReduction
              ? t("reducedSummary", {
                  amount: reductionKg.toFixed(2),
                  start: fullWeek[0].date,
                  end: fullWeek[fullWeek.length - 1].date,
                })
              : t("increasedSummary", {
                  amount: reductionKg.toFixed(2),
                  start: fullWeek[0].date,
                  end: fullWeek[fullWeek.length - 1].date,
                })}
          </p>

          <ul className="list-none space-y-2 text-sm text-slate-600 dark:text-stone-400">
            <li>
              🌳{" "}
              <span className="font-medium text-slate-900 dark:text-stone-100">
                {treesPlanted}
              </span>{" "}
              {isReduction
                ? t("treesAbsorbed")
                : t("treesNeeded")}
            </li>
            <li>
              🚗{" "}
              <span className="font-medium text-slate-900 dark:text-stone-100">
                {carTravelAvoided} km
              </span>{" "}
              {isReduction
                ? t("carAvoided")
                : t("carEmitted")}
            </li>
            <li>
              💡{" "}
              <span className="font-medium text-slate-900 dark:text-stone-100">
                {ledHours} hrs
              </span>{" "}
              {isReduction
                ? t("ledPowered")
                : t("ledEmitted")}
            </li>
            <li>
              ♻️{" "}
              {isReduction
                ? t("savingsHousehold")
                : t("increaseHousehold")}
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default EquivalentCards;
