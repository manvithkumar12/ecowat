export const priceSubstats = (
  chartData: { name: string; price: number }[],
  t: (key: string) => string,
) => {
  const prices = chartData.map((d) => d.price);

  const highestPrice = prices.length ? Math.max(...prices) : 0;
  const lowestPrice = prices.length ? Math.min(...prices) : 0;
  const averagePrice = prices.length
    ? prices.reduce((sum, p) => sum + p, 0) / prices.length
    : 0;

  return [
    {
      label: t("HighestPrice"),
      value: `€${highestPrice.toFixed(4)}/kWh`,
      color: "text-slate-800 dark:text-stone-200",
      highlight: false,
    },
    {
      label: t("LowestPrice"),
      value: `€${lowestPrice.toFixed(4)}/kWh`,
      color: "text-emerald-600 dark:text-emerald-500",
      highlight: true,
    },
    {
      label: t("AveragePrice"),
      value: `€${averagePrice.toFixed(4)}/kWh`,
      color: "text-slate-800 dark:text-stone-200",
      highlight: false,
    },
  ];
};
