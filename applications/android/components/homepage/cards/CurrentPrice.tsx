import React from "react";
import { usePriceData } from "../../../hooks/Homepage/usePriceData";
import PricePopup from "../PricePopup";
import { StatCard } from "../StatCard";

export const CurrentPrice = () => {
  const {
    currentPriceData,
    averagePrice,
    priceTrend,
    PriceLoading,
    PriceError,
    refetch,
  } = usePriceData();
  const [hourlyPriceVisible, setHourlyPriceVisible] = React.useState(false);

  return (
    <>
      <StatCard
        title="Current Price"
        value={
          currentPriceData?.currentPrice !== undefined
            ? `${currentPriceData.currentPrice} €/kWh`
            : "N/A"
        }
        trend={priceTrend}
        actionLabel="View hourly price"
        onActionPress={() => setHourlyPriceVisible(true)}
        loading={PriceLoading}
        error={PriceError ? "Current price unavailable" : undefined}
        onRetry={() => refetch()}
      />
      {hourlyPriceVisible && (
        <PricePopup
          hourlyPriceVisible={hourlyPriceVisible}
          setHourlyPriceVisible={setHourlyPriceVisible}
          currentPriceData={currentPriceData}
          averagePrice={averagePrice}
          isLoading={PriceLoading}
          isError={PriceError}
          onRetry={() => refetch()}
        />
      )}
    </>
  );
};

export default CurrentPrice;
