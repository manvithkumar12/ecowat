import React from "react";
import { useWeeklyCostEstimateQuery } from "@ecowat/shared";
import { StatCard } from "../StatCard";
import WeeklyCostPopup from "../WeeklyCostPopup";

const WeeklyEstCard = () => {
  const [dailyCostVisible, setDailyCostVisible] = React.useState(false);
  const {
    data: weeklyCostData,
    isLoading,
    isError,
    refetch,
  } = useWeeklyCostEstimateQuery(1);

  return (
    <>
      <StatCard
        title="Weekly Estimate"
        value={
          weeklyCostData?.weeklyEstimatedCost !== undefined
            ? `₹${weeklyCostData.weeklyEstimatedCost.toFixed(2)}`
            : "N/A"
        }
        actionLabel="View daily cost"
        onActionPress={() => setDailyCostVisible(true)}
        loading={isLoading}
        error={isError ? "Weekly cost unavailable" : undefined}
        onRetry={() => refetch()}
      />

      {dailyCostVisible && (
        <WeeklyCostPopup
          dailyCostVisible={dailyCostVisible}
          setDailyCostVisible={setDailyCostVisible}
          weeklyCostData={weeklyCostData}
          isLoading={isLoading}
          isError={isError}
          onRetry={() => refetch()}
        />
      )}
    </>
  );
};

export default WeeklyEstCard;
