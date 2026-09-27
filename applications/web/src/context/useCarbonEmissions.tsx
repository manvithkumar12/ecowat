"use client";

import { CarbonResponse } from "@/app/api/carbon-emission/user-usage/route";
import { useCarbonEmission } from "@ecowat/shared";
import React, { createContext, useContext } from "react";

type ContextType = {
  data: CarbonResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: ReturnType<typeof useCarbonEmission>["refetch"];
};

export const CarbonEmissionContext = createContext<ContextType | null>(null);

export const CarbonEmissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, isLoading, isError, refetch } = useCarbonEmission();
  return (
    <CarbonEmissionContext.Provider
      value={{
        data,
        isLoading,
        isError,
        refetch,
      }}
    >
      {children}
    </CarbonEmissionContext.Provider>
  );
};

export const useCarbonEmissionContext = () => {
  const context = useContext(CarbonEmissionContext);
  if (!context) {
    throw new Error(
      "useCarbonEmissionContext must be used within a CarbonEmissionProvider",
    );
  }
  return context;
};
