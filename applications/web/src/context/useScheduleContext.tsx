"use client";
"use no memo";
import { useScheduleAppliances } from "@ecowat/shared";
import { createContext, useContext } from "react";
import { FindUserRescheduleResponse } from "../components/Dashboard/Schedule/types";

type ScheduleType = {
  Schedule: FindUserRescheduleResponse | undefined;
  isScheduleLoading: boolean;
  isScheduleError: boolean;
  scheduleRefetch: ReturnType<typeof useScheduleAppliances>["refetch"];
};

export const UseScheduleContext = createContext<null | ScheduleType>(null);
export const UserScheduleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: schedluedAppliances,
    isError,
    isLoading,
    refetch,
  } = useScheduleAppliances();
  return (
    <UseScheduleContext.Provider
      value={{
        Schedule: schedluedAppliances,
        isScheduleError: isError,
        isScheduleLoading: isLoading,
        scheduleRefetch: refetch,
      }}
    >
      {children}
    </UseScheduleContext.Provider>
  );
};

export const UserScheduleData = () => {
  const data = useContext(UseScheduleContext);
  if (!data) {
    throw new Error(
      "UserScheduleData must be used within a UserScheduleProvider",
    );
  }
  return data;
};
