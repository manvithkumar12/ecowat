"use client";
"use no memo";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { useUserAppliancesContext } from "./userAppliances";
import { useLivePrice } from "./usePriceData";
import { useRenewableScore } from "./useRenewable.context";
import {
  AvoidRecommendation,
  generateAvoidRecommendations,
  generateRecommendations,
  Recommendation,
} from "@ecowat/shared";

type ContextType = {
  recommendations: Recommendation[];
  isLoading: boolean;
  isError: boolean;
  AvoidAppliances: AvoidRecommendation[];
  refetch: () => void;
};

export const UseRecommendationContext = createContext<ContextType | null>(null);

export const RecommendationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    data: appliances,
    isLoading,
    isError,
    refetch: applianceRefetch,
  } = useUserAppliancesContext();

  const {
    PriceData,
    isPriceLoading,
    priceError,
    refetch: priceRefetch,
  } = useLivePrice();

  const { renewableData, renewableLoading, renewableError, renewableRefetch } =
    useRenewableScore();

  const recommendations = useMemo(
    () =>
      generateRecommendations(
        appliances,
        PriceData?.hourlyPrices,
        renewableData?.hourlyData,
      ),
    [appliances, PriceData?.hourlyPrices, renewableData?.hourlyData],
  );

  const AvoidAppliances = useMemo(
    () =>
      generateAvoidRecommendations(
        appliances,
        PriceData?.hourlyPrices,
        renewableData?.hourlyData,
      ),
    [appliances, PriceData?.hourlyPrices, renewableData?.hourlyData],
  );

  const loading = isLoading || isPriceLoading || renewableLoading;
  const error = isError || priceError || renewableError;

  const refetch = () => {
    void applianceRefetch?.();
    void priceRefetch?.();
    void renewableRefetch?.();
  };

  return (
    <UseRecommendationContext.Provider
      value={{
        recommendations,
        isLoading: loading,
        isError: !!error,
        refetch,
        AvoidAppliances,
      }}
    >
      {children}
    </UseRecommendationContext.Provider>
  );
};

export const useRecommendations = () => {
  const context = useContext(UseRecommendationContext);

  if (!context) {
    throw new Error(
      "useRecommendations must be used within RecommendationsProvider",
    );
  }

  return context;
};
