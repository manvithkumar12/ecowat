import { useUser } from "@/src/context/userContext";
import { useUsedAppliance } from "@ecowat/shared";
import { getGermanDate } from "@ecowat/shared";

export const useUserUsage = (date?: string) => {
  const user = useUser();
  const userId = user?.id;

  const today = getGermanDate(Date.now());
  const selectedDate = date ?? today;

  return useUsedAppliance(userId ?? "", undefined, selectedDate);
};
