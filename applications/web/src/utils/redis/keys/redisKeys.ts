export const applianceKey = (userId: string) => `user:${userId}:appliances`;
export const weeklyConsumptionLock = "weekly-data-lock";
export const predictionKey = "public:price-prediction";
export const predictionLockKey = "price-prediction-lock";
export const weeklyRenewableKey = "public:weekly-renewable";
export const RenewableScheduleKey = "public:renewable-schedule";
export const userUsedApplianceKey = (userId: string, date: string) =>
  `user:${userId}:usedAppliances:${date}`;
export const userWeeklyConsumptionKey = (userId: string) =>
  `user:${userId}:weekly-consumption`;
export const rescheduleApplianceKey = (userId: string) => {
  return `user:${userId}:schedule-appliances`;
};
export const priceDataKey = "public:price-data";
export const recommendationKey = (userId: string) =>
  `user:${userId}:recommendations`;
export const priceHistoryKey = (startTimeStamp: number, endTime: number) =>
  `public:price-history:${startTimeStamp}-${endTime}`;
