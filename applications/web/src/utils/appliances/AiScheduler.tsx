import {
  Appliance,
  Availableappliances,
  Recommendation,
  rescheduleAddType,
} from "@ecowat/shared";

export const GenerateScheduleAi = (
  recommendationData: Recommendation[],
  UserAppliancs: Appliance[],
) => {
  const scheduledItems: rescheduleAddType[] = recommendationData.map((item) => {
    const UserAppliances = UserAppliancs.find((a) => a.name === item.appliance);
    return {
      applianceId: Number(UserAppliances?.id || 0),
      startHour: item.startHour.toString(),
      endHourHour: item.endHour.toString(),
      name: UserAppliances?.DBName || item.appliance,
      powerConsumed: item.powerConsumed,
      rating: Math.round(UserAppliances?.powerRatingW || 0),
    };
  });

  return scheduledItems;
};

export const handleGenerateSchedule = (
  recAppliances: Recommendation[],
  appliancesQuery: Appliance[] | undefined,
  addMutuation: any,
  toast: any,
  successMsg: string = "Schedule generated successfully!",
  failMsg: string = "Failed to generate schedule.",
) => {
  return () => {
    if (recAppliances && appliancesQuery) {
      const newSchedule = GenerateScheduleAi(recAppliances, appliancesQuery);
      newSchedule.forEach((item) => {
        addMutuation.mutate(item);
      });
      toast.success(successMsg);
    } else {
      toast.error(failMsg);
    }
  };
};
