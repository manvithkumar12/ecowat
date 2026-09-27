"use client";

import { PricePrediction, useWeeklyPricePred } from "@ecowat/shared";
import React, { createContext, useContext } from "react";

type contextType = {
  priceForecastData: PricePrediction[] | undefined;
  isError: boolean;
  isLoading: boolean;
  refetch: ReturnType<typeof useWeeklyPricePred>["refetch"];
};
export const useWeeklyUserPrice = createContext<contextType | null>(null);

export const WeeklyPriceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: priceForecastData,
    isError,
    isLoading,
    refetch,
  } = useWeeklyPricePred();
  return (
    <useWeeklyUserPrice.Provider
      value={{ priceForecastData, isError, isLoading, refetch }}
    >
      {children}
    </useWeeklyUserPrice.Provider>
  );
};

export const useWeeklyPriceContext = () => {
  const context = useContext(useWeeklyUserPrice);
  if (!context) {
    throw new Error(
      "useWeeklyUserPrice must be used within WeeklyPriceProvider",
    );
  }
  return context;
};
