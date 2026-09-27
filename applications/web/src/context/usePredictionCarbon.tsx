"use client";

import { usePredictCarbon } from "@ecowat/shared";
import React, { createContext, useContext, useMemo } from "react";

export interface PredictCarbonResponse {
  past7Days: number[];
  predictedNext7Days: number[];
}

export interface PredictCarbonContextType {
  data: PredictCarbonResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch?: ReturnType<typeof usePredictCarbon>["refetch"];
}

const PredictCarbonContext = createContext<PredictCarbonContextType>({
  data: null,
  isLoading: true,
  isError: false,
  error: null,
});

export const PredictCarbonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading, error, isError, refetch } = usePredictCarbon();

  const value = useMemo(
    () => ({
      data: data ?? null,
      isLoading,
      isError: isError || !!error,
      error: error ?? null,
      refetch,
    }),
    [data, isLoading, isError, error, refetch],
  );

  return (
    <PredictCarbonContext.Provider value={value}>
      {children}
    </PredictCarbonContext.Provider>
  );
};

export const usePredictionCarbon = () => {
  return useContext(PredictCarbonContext);
};