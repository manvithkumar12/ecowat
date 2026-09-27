import { useCurrentPrice } from "@ecowat/shared";
import { TADO_API_URL } from "../../config/Keys";
import { currentPriceTrend } from "../../utils/homepage/priceData";

export const usePriceData = () => {
  const {
    data: currentPriceData,
    isLoading: PriceLoading,
    isError: PriceError,
    refetch,
  } = useCurrentPrice(TADO_API_URL!);

  const averagePrice = currentPriceData?.todayAveragePrice ?? 0;

  const priceTrend = currentPriceTrend(currentPriceData);

  return {
    currentPriceData,
    averagePrice,
    priceTrend,
    PriceLoading,
    PriceError,
    refetch,
  };
};
