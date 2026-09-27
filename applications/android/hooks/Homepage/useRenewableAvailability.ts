import { useRenewabilityCheck } from "@ecowat/shared";
import { RENEWABLE_URL } from "../../config/Keys";

export const useRenewableAvailability = () => {
  const {
    data: RenewableData,
    isLoading: RenewableLoading,
    isError: RenewableError,
  } = useRenewabilityCheck(RENEWABLE_URL!);
  return { RenewableData, RenewableLoading, RenewableError };
};
