"use client";
import { RenewableData, useRenewabilityCheck } from "@ecowat/shared";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { RENEWABLE_URL } from "../config/env";

type ContextType = {
  renewableData: RenewableData | undefined;
  renewableLoading: boolean;
  renewableError: boolean;
  renewableRefetch: ReturnType<typeof useRenewabilityCheck>["refetch"];
};
export const UseRenewableContext = createContext<ContextType | null>(null);
export const RenewableProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: renewableData,
    isLoading: renewableLoading,
    isError: renewableError,
    refetch: renewableRefetch,
  } = useRenewabilityCheck(RENEWABLE_URL);

  const value = useMemo(
    () => ({
      renewableData,
      renewableLoading,
      renewableError,
      renewableRefetch,
    }),
    [renewableData, renewableLoading, renewableError, renewableRefetch],
  );
  return (
    <UseRenewableContext.Provider value={value}>
      {children}
    </UseRenewableContext.Provider>
  );
};

export const useRenewableScore = () => {
  const context = useContext(UseRenewableContext);
  if (!context)
    throw new Error(
      "useRenewableScore must be used within a RenewableProvider",
    );
  return context;
};
