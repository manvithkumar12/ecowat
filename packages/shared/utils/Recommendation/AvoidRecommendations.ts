import { HourlyPriceItem } from "@/app/api/actions/priceData/ProcessPriceData";
import { Appliance } from "../../data/Appliances/appliancesData";

import { HourlyRenewableData } from "../../dataServices/Dashboard/renewabilityCheck";
import { ApplianceRules } from "../../types/Recommendations/AppliancesRules";

export type AvoidRecommendation = {
  appliance: string;
  avoidTimeSlot: string;
  startHour: number;
  riskScore: number;
  renewableScore: number;
  priceAtAvoidTime: number;
  reasons: string[];
  category: string;
};
export const generateAvoidRecommendations = (
  appliances: Appliance[] = [],
  hourlyPrices: HourlyPriceItem[] = [],
  renewableData: HourlyRenewableData[] = [],
): AvoidRecommendation[] => {
  if (!hourlyPrices.length || !renewableData.length) {
    return [];
  }

  const priceMap = new Map<number, HourlyPriceItem>();

  hourlyPrices.forEach((price) => {
    const hour = Number(
      new Intl.DateTimeFormat("en-GB", {
        hour: "numeric",
        hour12: false,
        timeZone: "Europe/Berlin",
      }).format(new Date(price.start)),
    );

    priceMap.set(hour, price);
  });

  const parseHour = (hourStr: string) => Number(hourStr);

  const formatHour = (hour: number) => `${String(hour).padStart(2, "0")}:00`;

  const maxPrice = Math.max(...hourlyPrices.map((p) => p.price));
  const minPrice = Math.min(...hourlyPrices.map((p) => p.price));

  const avgRenewable =
    renewableData.reduce((sum, r) => sum + r.renewableScore, 0) /
    renewableData.length;

  const avgPrice =
    hourlyPrices.reduce((sum, p) => sum + p.price, 0) / hourlyPrices.length;

  return appliances
    .map((appliance) => {
      const rule =
        ApplianceRules[appliance.DBName as keyof typeof ApplianceRules];

      if (!rule?.recommendationEnabled || !appliance.status) {
        return null;
      }

      let worstScore = -Infinity;
      let worstPrice: HourlyPriceItem | null = null;
      let worstRenewable: HourlyRenewableData | null = null;
      let worstReasons: string[] = [];

      for (const renewable of renewableData) {
        const hour = parseHour(renewable.hour);
        const priceData = priceMap.get(hour);

        if (!priceData) continue;

        let riskScore = 0;

        // Expensive electricity
        const expensiveScore =
          maxPrice === minPrice
            ? 0
            : ((priceData.price - minPrice) / (maxPrice - minPrice)) * 100;

        riskScore += expensiveScore * 0.5;

        // Low renewable energy
        riskScore += (100 - renewable.renewableScore) * 0.3;

        // Outside preferred hours
        const withinPreferred =
          hour >= rule.preferredStartHour && hour < rule.preferredEndHour;

        if (!withinPreferred) {
          riskScore += 20;
        }

        // Night-time penalty
        if (rule.avoidNightHours && (hour >= 22 || hour < 6)) {
          riskScore += 25;
        }

        if (riskScore > worstScore) {
          worstScore = riskScore;
          worstPrice = priceData;
          worstRenewable = renewable;

          const reasons: string[] = [];

          if (priceData.price >= avgPrice) {
            reasons.push("Electricity price is higher than daily average");
          }

          if (expensiveScore >= 85) {
            reasons.push("One of the most expensive hours today");
          }

          if (renewable.renewableScore <= 40) {
            reasons.push("Very low renewable energy availability");
          }

          if (renewable.renewableScore < avgRenewable) {
            reasons.push("Renewable generation below daily average");
          }

          if (!withinPreferred) {
            reasons.push("Outside preferred operating hours");
          }

          if (rule.avoidNightHours && (hour >= 22 || hour < 6)) {
            reasons.push("Night-time usage is discouraged");
          }

          if (renewable.solarScore < 30) {
            reasons.push("Weak solar generation forecast");
          }

          if (renewable.windScore < 30) {
            reasons.push("Low wind energy contribution");
          }

          worstReasons = reasons.slice(0, 5);
        }
      }

      if (!worstPrice || !worstRenewable) {
        return null;
      }

      const startHour = parseHour(worstRenewable.hour);
      const endHour = (startHour + 1) % 24;

      return {
        appliance: appliance.name,
        avoidTimeSlot: `${formatHour(startHour)} - ${formatHour(endHour)}`,
        startHour,
        riskScore: Math.round(worstScore),
        renewableScore: worstRenewable.renewableScore,
        priceAtAvoidTime: worstPrice.price,
        reasons: worstReasons,
        category: appliance.category,
      };
    })
    .filter((item): item is AvoidRecommendation => item !== null)
    .sort((a, b) => b.riskScore - a.riskScore);
};
