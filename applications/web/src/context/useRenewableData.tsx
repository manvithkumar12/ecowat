"use client";

import { createContext, ReactNode, useContext, useMemo } from "react";
import { useUser } from "./userContext";
import { useRenewableData, RenewableResponse } from "@ecowat/shared";

type RenewableContextType = {
  renewableData: RenewableResponse | undefined;
  isLoading: boolean;
  refetch: ReturnType<typeof useRenewableData>["refetch"];
  isError: boolean;
};

export const RenewableDataContext = createContext<RenewableContextType | null>(
  null,
);

export const RenewableDataProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const user = useUser();
  const userId = user?.id;

  const {
    data: renewableData,
    isLoading,
    refetch,
    isError,
  } = useRenewableData(userId ?? "");

  const value = useMemo(
    () => ({
      renewableData,
      isLoading,
      refetch,
      isError,
    }),
    [renewableData, isLoading, refetch, isError],
  );

  return (
    <RenewableDataContext.Provider value={value}>
      {children}
    </RenewableDataContext.Provider>
  );
};

export const useRenewableDataContext = () => {
  const context = useContext(RenewableDataContext);
  if (!context) {
    throw new Error(
      "useRenewableDataContext must be used within a RenewableDataProvider",
    );
  }
  return context;
};
