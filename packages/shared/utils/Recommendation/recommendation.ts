import { HourlyPriceItem } from "@/app/api/actions/priceData/ProcessPriceData";
import { Appliance } from "../../data/Appliances/appliancesData";
import { HourlyRenewableData } from "../../dataServices/Dashboard/renewabilityCheck";
import { ApplianceRules } from "../../types/Recommendations/AppliancesRules";

export type Recommendation = {
  appliance: string;
  bestTimeSlot: string;
  startHour: number;
  endHour: number;
  score: number;
  potentialSaving: number;
  estimatedRunCost: number;
  renewableScore: number;
  priceAtBestTime: number;
  reasons: string[];
  category: string;
  powerConsumed: number;
};
export const generateRecommendations = (
  appliances: Appliance[] = [],
  hourlyPrices: HourlyPriceItem[] = [],
  renewableData: HourlyRenewableData[] = [],
): Recommendation[] => {
  if (!hourlyPrices.length || !renewableData.length) {
    return [];
  }

  const usedHours = new Set<number>();
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

  const parseHour = (hourStr: string): number => Number(hourStr);

  const formatHour = (hour: number) =>
    `${String(hour % 24).padStart(2, "0")}:00`;

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

      const duration = Math.max(1, Math.ceil(appliance.dailyUsageHours || 1));
      let bestScore = -Infinity;
      let bestStartHour = 0;
      let bestEndHour = 1;
      let bestRenewableScore = 0;
      let bestPrice = 0;
      let bestReasons: string[] = [];

      for (
        let startIndex = 0;
        startIndex <= renewableData.length - duration;
        startIndex++
      ) {
        const window = renewableData.slice(startIndex, startIndex + duration);

        if (window.length !== duration) continue;

        let totalPrice = 0;
        let totalRenewable = 0;
        let totalSolar = 0;
        let totalWind = 0;
        let totalCloud = 0;
        let totalComfort = 0;

        let validWindow = true;

        for (const renewable of window) {
          const hour = parseHour(renewable.hour);

          const priceData = priceMap.get(hour);

          if (!priceData) {
            validWindow = false;
            break;
          }

          totalPrice += priceData.price;
          totalRenewable += renewable.renewableScore;
          totalSolar += renewable.solarScore;
          totalWind += renewable.windScore;
          totalCloud += renewable.cloudScore;

          let comfort = 100;

          if (rule.avoidNightHours && (hour >= 22 || hour < 6)) {
            comfort = 0;
          }
          const withinPreferred =
            rule.preferredStartHour <= rule.preferredEndHour
              ? hour >= rule.preferredStartHour && hour < rule.preferredEndHour
              : hour >= rule.preferredStartHour || hour < rule.preferredEndHour;

          if (!withinPreferred) {
            comfort = 0;
          }

          totalComfort += comfort;
        }

        if (!validWindow) continue;

        const avgWindowPrice = totalPrice / duration;
        const avgWindowRenewable = totalRenewable / duration;
        const avgSolar = totalSolar / duration;
        const avgWind = totalWind / duration;
        const avgCloud = totalCloud / duration;
        const avgComfort = totalComfort / duration;

        const startHour = parseHour(window[0].hour);
        const endHour = (startHour + duration) % 24;

        const priceScore =
          maxPrice === minPrice
            ? 100
            : ((maxPrice - avgWindowPrice) / (maxPrice - minPrice)) * 100;

        let renewableWeight = 0.4;
        let priceWeight = 0.4;
        let comfortWeight = 0.2;

        if (
          appliance.category?.toLowerCase().includes("ev") ||
          appliance.name.toLowerCase().includes("charger")
        ) {
          renewableWeight = 0.55;
          priceWeight = 0.25;
          comfortWeight = 0.2;
        }

        if (appliance.category?.toLowerCase().includes("heating")) {
          renewableWeight = 0.3;
          priceWeight = 0.5;
          comfortWeight = 0.2;
        }

        let score =
          avgWindowRenewable * renewableWeight +
          priceScore * priceWeight +
          avgComfort * comfortWeight;

        const overlapCount = window.filter((r) =>
          usedHours.has(parseHour(r.hour)),
        ).length;

        score -= overlapCount * 10;

        if (score > bestScore) {
          bestScore = score;
          bestStartHour = startHour;
          bestEndHour = endHour;
          bestRenewableScore = avgWindowRenewable;
          bestPrice = avgWindowPrice;

          const reasons: string[] = [];

          if (avgWindowRenewable >= 80) {
            reasons.push("Excellent renewable energy availability");
          } else if (avgWindowRenewable >= 65) {
            reasons.push("High renewable energy generation expected");
          }

          if (priceScore >= 85) {
            reasons.push("Electricity price is among the lowest today");
          } else if (priceScore >= 70) {
            reasons.push("Electricity cost is below daily average");
          }

          reasons.push(
            `${duration} hour continuous low-cost operating window found`,
          );

          if (avgSolar >= 70) {
            reasons.push("Strong solar generation forecast");
          }

          if (avgWind >= 70) {
            reasons.push("Good wind energy contribution expected");
          }

          if (avgCloud >= 70) {
            reasons.push(
              "Favorable weather conditions for renewable generation",
            );
          }

          if (avgWindowPrice < avgPrice) {
            reasons.push("Cheaper than the average electricity price today");
          }

          if (avgWindowRenewable > avgRenewable) {
            reasons.push(
              "Renewable energy availability is above daily average",
            );
          }

          bestReasons = reasons.slice(0, 5);
        }
      }

      for (let h = bestStartHour; h < bestStartHour + duration; h++) {
        usedHours.add(h % 24);
      }

      const consumptionKwh =
        (appliance.powerRatingW * appliance.dailyUsageHours) / 1000;

      const potentialSaving = Number(
        Math.max(0, (avgPrice - bestPrice) * consumptionKwh).toFixed(2),
      );
      const estimatedRunCost = Number((consumptionKwh * bestPrice).toFixed(2));
      return {
        appliance: appliance.name,
        bestTimeSlot: `${formatHour(bestStartHour)} - ${formatHour(bestEndHour)}`,
        startHour: bestStartHour,
        endHour: bestEndHour,
        score: Math.round(bestScore),
        potentialSaving,
        estimatedRunCost,
        renewableScore: Math.round(bestRenewableScore),
        priceAtBestTime: Number(bestPrice.toFixed(2)),
        reasons: bestReasons,
        category: appliance.category,
        powerConsumed: Number(consumptionKwh.toFixed(2)),
      };
    })
    .filter((item): item is Recommendation => item !== null)
    .sort((a, b) => b.score - a.score);
};
