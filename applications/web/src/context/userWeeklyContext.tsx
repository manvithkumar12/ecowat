"use client";

import { useUserPrice } from "@ecowat/shared";
import { createContext, useContext } from "react";

type DayWiseCost = {
  day: string;
  cost: number;
  estimated: boolean;
};

type WeeklyCostData = {
  weeklyEstimatedCost: number;
  averageDailyCost: number;
  dayWiseCost: DayWiseCost[];
};

const DAY_NAMES = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type weeklyContextRes = {
  data: WeeklyCostData | undefined;
  totalCost: number | undefined;
  isError: boolean;
  isLoading: boolean;
  refetch: ReturnType<typeof useUserPrice>["refetch"];
};

export const WeeklyPriceContext = createContext<null | weeklyContextRes>(null);

export const WeeklyPriceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: rawData, isLoading, isError, refetch } = useUserPrice();

  // The API can return an error object instead of an array on failure,
  // so guard with Array.isArray before using array methods.
  const safeData = Array.isArray(rawData) ? rawData : undefined;

  const totalCost = safeData?.reduce((acc, cost) => acc + cost, 0);

  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  const data: WeeklyCostData | undefined = safeData
    ? {
        weeklyEstimatedCost: totalCost ?? 0,
        averageDailyCost:
          safeData.length > 0 ? (totalCost ?? 0) / safeData.length : 0,
        dayWiseCost: safeData.map((cost, i) => ({
          day: DAY_NAMES[i] ?? `Day ${i + 1}`,
          cost,
          estimated: i > todayIndex,
        })),
      }
    : undefined;

  return (
    <WeeklyPriceContext.Provider
      value={{ data, isLoading, isError, refetch, totalCost }}
    >
      {children}
    </WeeklyPriceContext.Provider>
  );
};

export const useUserWeeklyPrice = () => {
  const context = useContext(WeeklyPriceContext);
  if (!context)
    throw new Error("useWeeklyPrice must be used within WeeklyPriceProvider");
  return context;
};
