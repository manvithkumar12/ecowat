"use client";
import { useCurrentPrice } from "@ecowat/shared";
import { createContext, useContext, useMemo } from "react";
import { TADO_API_URL } from "../config/env";
import { CurrentPriceResponse } from "@/app/api/actions/priceData/ProcessPriceData";

type ContextType = {
  PriceData: CurrentPriceResponse | undefined;
  isPriceLoading: boolean;
  priceError: Error | null;
  refetch: ReturnType<typeof useCurrentPrice>["refetch"];
};
export const LivePriceContext = createContext<ContextType | null>(null);

export const LivePriceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: PriceData,
    isLoading: isPriceLoading,
    error: priceError,
    refetch,
  } = useCurrentPrice();

  const value = useMemo(
    () => ({
      PriceData,
      isPriceLoading,
      priceError,
      refetch,
    }),
    [PriceData, isPriceLoading, priceError, refetch],
  );
  return (
    <LivePriceContext.Provider value={value}>
      {children}
    </LivePriceContext.Provider>
  );
};

export const useLivePrice = () => {
  const context = useContext(LivePriceContext);
  if (!context) {
    throw new Error(
      "useLivePrice must be used within a LivePriceProvider",
    );
  }
  return context;
};
