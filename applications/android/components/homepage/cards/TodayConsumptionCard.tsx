import React from "react";
import { StatCard } from "../StatCard";
import TodaysConsumptionPopup from "../TodaysConsumptionPopup";
import { useTodaysUsage } from "../../../context/TodaysUsage.context";

const TodayConsumptionCard = () => {
  const [usageVisible, setUsageVisible] = React.useState(false);
  const context = useTodaysUsage();
  if (!context) return null;
  const isLoading = context.isLoading;
  const isError = context.isError;
  const TodayConsumptionData = context.Appliances;
  const refetch = context.refetch;
  const total = context.totalKwh ?? 0;
  const yesterdayUsage = context.YesterdayUsage ?? 0;
  const isNewUsage = yesterdayUsage === 0 && total > 0;
  const percentageChange =
    yesterdayUsage > 0
      ? ((total - yesterdayUsage) / yesterdayUsage) * 100
      : null;
  const comparedValue =
    total > yesterdayUsage ? "more" : total < yesterdayUsage ? "less" : "same";
  const trend =
    percentageChange !== null && comparedValue !== "same"
      ? {
          label: `${Math.abs(percentageChange).toFixed(1)}% ${comparedValue} than yesterday`,
          tone:
            total > yesterdayUsage
              ? ("negative" as const)
              : ("positive" as const),
        }
      : undefined;

  return (
    <>
      <StatCard
        title="Today's Consumption"
        value={TodayConsumptionData !== undefined ? `${total} kWh` : "N/A"}
        trend={trend}
        actionLabel="View usage"
        onActionPress={() => setUsageVisible(true)}
        loading={isLoading}
        error={isError ? "Consumption data unavailable" : undefined}
        onRetry={() => refetch()}
      />
      {usageVisible && (
        <TodaysConsumptionPopup
          usageVisible={usageVisible}
          setUsageVisible={setUsageVisible}
          recentApplications={TodayConsumptionData}
          totalConsumption={total}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
        />
      )}
    </>
  );
};

export default TodayConsumptionCard;
