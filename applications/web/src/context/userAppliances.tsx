"use client";

import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { Appliance, useUserAppliance } from "@ecowat/shared";

type UserAppliancesContextType = {
  data: Appliance[] | undefined;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

const UserAppliancesContext = createContext<UserAppliancesContextType | null>(
  null,
);

export const UserAppliancesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { data, isLoading, isError, refetch } = useUserAppliance("");

  const value = useMemo(
    () => ({
      data,
      isLoading,
      isError,
      refetch,
    }),
    [data, isLoading, isError, refetch],
  );

  return (
    <UserAppliancesContext.Provider value={value}>
      {children}
    </UserAppliancesContext.Provider>
  );
};

export const useUserAppliancesContext = () => {
  const context = useContext(UserAppliancesContext);
  if (!context) {
    throw new Error(
      "useUserAppliancesContext must be used within a UserAppliancesProvider",
    );
  }
  return context;
};
