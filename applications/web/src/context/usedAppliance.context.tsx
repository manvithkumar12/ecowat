"use client";
import { formatDateValue, getGermanDateString, UsedAppliance, useUsedAppliance } from "@ecowat/shared";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { useUser } from "@/src/context/userContext";

type ContextType = {
  Appliances: UsedAppliance[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: ReturnType<typeof useUsedAppliance>["refetch"];
  totalKwh: number | undefined;
  YesterdayUsage: number | undefined;
  totalAmount: number | undefined;
  past30DaysCost: number | undefined;
  past30DaysSavings: number | undefined;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<string>>;
};

export const UsedApplianceContext = createContext<ContextType | null>(null);

export const UsedApplianceProvider = ({
  children,
  date,
}: {
  children: ReactNode;
  date?: string;
}) => {
  const userId = useUser()?.id;
  const today = getGermanDateString();
  const [selectedDate, setSelectedDate] = useState<string>(
    () => date || today,
  );
  const { data, isLoading, isError, refetch } = useUsedAppliance(
    "",
    selectedDate,
  );

  const Appliances = data?.data;
  const YesterdayUsage = data?.yesterdayUsage ?? 0;
  const past30DaysCost = data?.past30DaysCost ?? 0;
  const past30DaysSavings = data?.past30DaysSavings ?? 0;
  const totalKwh = Appliances?.reduce((acc, data) => acc + data.kwh, 0);
  const totalAmount = Appliances?.reduce(
    (acc, curr) => acc + curr.totalPrice,
    0,
  );

  const values = useMemo(
    () => ({
      Appliances,
      isLoading,
      isError,
      totalKwh,
      totalAmount,
      past30DaysCost,
      past30DaysSavings,
      selectedDate,
      setSelectedDate,
      refetch,
      YesterdayUsage,
    }),
    [
      Appliances,
      totalKwh,
      totalAmount,
      past30DaysCost,
      past30DaysSavings,
      selectedDate,
      YesterdayUsage,
      isLoading,
      isError,
      refetch,
    ],
  );

  return (
    <UsedApplianceContext.Provider value={values}>
      {children}
    </UsedApplianceContext.Provider>
  );
};

export const userConsumption = () => {
  const context = useContext(UsedApplianceContext);
  if (!context) {
    throw new Error(
      "useUserConsumption must be used within a UsedApplianceProvider",
    );
  }
  return context;
};
