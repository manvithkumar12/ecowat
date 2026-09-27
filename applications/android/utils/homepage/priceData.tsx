export const currentPriceTrend = (currentPriceData: any):
  | { label: string; tone: "positive" | "negative" }
  | undefined => {
  return currentPriceData
    ? {
        label: `${
          currentPriceData.priceTrend === "higher" ? "+" : "-"
        }${currentPriceData.percentageChange}% vs avg`,
        tone:
          currentPriceData.priceTrend === "higher" ? "negative" : "positive",
      }
    : undefined;
};
