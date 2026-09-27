import React, { createContext, useContext } from "react";
import { UsedAppliance, useUsedAppliance } from "@ecowat/shared";
import { useUser } from "./Userprovider";
import { BASE_URL } from "../config/Keys";

type TodaysUsageContextType = {
  Appliances: UsedAppliance[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  totalKwh: number | undefined;
  YesterdayUsage: number | undefined;
  totalAmount: number | undefined;
};

const TodaysUsageContext = createContext<TodaysUsageContextType | null>(null);

export const TodaysUsageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const userId = useUser()?.id;
  const { data, isLoading, isError, refetch } = useUsedAppliance(
    userId!,
    BASE_URL,
  );
  const Appliances = data?.data;
  const YesterdayUsage = data?.yesterdayUsage ?? 0;
  const totalKwh = Appliances?.reduce((acc, data) => acc + data.kwh, 0);
  const totalAmount = Appliances?.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0,
  );
  const value: TodaysUsageContextType = {
    isLoading,
    isError,
    refetch,
    Appliances,
    totalKwh: totalKwh ?? 0,
    totalAmount: totalAmount ?? 0,
    YesterdayUsage: YesterdayUsage ?? 0,
  };

  return (
    <TodaysUsageContext.Provider value={value}>
      {children}
    </TodaysUsageContext.Provider>
  );
};

export const useTodaysUsage = () => {
  const context = useContext(TodaysUsageContext);

  if (!context) {
    throw new Error("useTodaysUsage must be used within a TodaysUsageProvider");
  }

  return context;
};
