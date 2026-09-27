"use client";
import {
  ConsumptionForecast,
  useConsumptionForecast,
} from "@ecowat/shared";
import { ReactNode, createContext, useContext } from "react";
import { useUser } from "./userContext";

type ContextType = {
  data: ConsumptionForecast | undefined;
  isLoading: boolean;
  isError: boolean;
  error: string;
  refetch: ReturnType<typeof useConsumptionForecast>["refetch"];
};

export const useWeeklyConsumption = createContext<ContextType | null>(null);

export const WeeklyConsumptionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const user = useUser();
  const {
    data: userData,
    isLoading,
    isError,
    error: consumptionError,
    refetch,
  } = useConsumptionForecast(user?.id!);
  const value = {
    data: userData,
    isLoading,
    isError,
    error: consumptionError?.message ?? "",
    refetch,
  };
  return (
    <useWeeklyConsumption.Provider value={value}>
      {children}
    </useWeeklyConsumption.Provider>
  );
};

export const useWeeklyConsumptionData = () => {
  const context = useContext(useWeeklyConsumption);
  if (!context) {
    throw new Error(
      "useWeeklyConsumptionData must be used within WeeklyConsumptionProvider",
    );
  }
  return context;
};
