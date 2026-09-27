export const getTranslatedReason = (
  reason: string | undefined,
  t: (key: string, values?: Record<string, any>) => string,
): string => {
  if (!reason) return "";

  const durationMatch = reason.match(
    /^(\d+)\s+hours?\s+continuous\s+low-cost\s+operating\s+window\s+found$/i,
  );
  if (durationMatch) {
    return t("continuousWindow", { duration: durationMatch[1] });
  }

  const reasonMap: Record<string, string> = {
    "Excellent renewable energy availability": "excellentRenewable",
    "High renewable energy generation expected": "highRenewable",
    "Electricity price is among the lowest today": "lowestPrice",
    "Electricity cost is below daily average": "belowAvgPrice",
    "Strong solar generation forecast": "strongSolar",
    "Good wind energy contribution expected": "goodWind",
    "Favorable weather conditions for renewable generation": "favorableWeather",
    "Cheaper than the average electricity price today": "cheaperThanAvg",
    "Renewable energy availability is above daily average": "renewableAboveAvg",
    "Electricity price is higher than daily average": "higherThanAvgPrice",
    "One of the most expensive hours today": "mostExpensiveHours",
    "Very low renewable energy availability": "veryLowRenewable",
    "Renewable generation below daily average": "renewableBelowAvg",
    "Outside preferred operating hours": "outsidePreferred",
    "Night-time usage is discouraged": "nightTimeDiscouraged",
    "Weak solar generation forecast": "weakSolar",
    "Low wind energy contribution": "lowWind",
  };

  const key = reasonMap[reason.trim()];
  if (key) {
    return t(key);
  }

  return reason;
};
