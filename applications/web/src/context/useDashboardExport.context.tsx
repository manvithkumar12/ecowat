import { createContext, ReactNode, useContext } from "react";
import { useLivePrice } from "./usePriceData";
import { useRenewableScore } from "./useRenewable.context";
import { userConsumption } from "./usedAppliance.context";

export type exportDataType = {
  exportData: {
    price: {
      Hourly_Prices: any;
      Current_Price?: number;
      Unit?: string;
    };
    renewable: {
      Hourly_Data: any;
      Best_Hours: any;
      Current_Score?: number;
    };
    consumptionData: {
      Todays_Usage?: number;
      Yesterday_Usage?: number;
      Total_Amount?: number;
      Todays_Appliance: any;
      Yesterday_Appliance: any;
    };
  };
};

export const DashboardContext = createContext<exportDataType | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const priceData = useLivePrice();
  const renewableData = useRenewableScore();
  const todaysConsumption = userConsumption();

  const exportData = {
    price: {
      Hourly_Prices: priceData.PriceData?.hourlyPrices,
      Current_Price: priceData.PriceData?.currentPrice,
      Unit: priceData.PriceData?.unit,
    },
    renewable: {
      Hourly_Data: renewableData.renewableData?.hourlyData,
      Best_Hours: renewableData.renewableData?.bestHours,
      Current_Score: renewableData.renewableData?.score,
    },
    consumptionData: {
      Todays_Usage: todaysConsumption.totalKwh ?? 0,
      Yesterday_Usage: todaysConsumption.YesterdayUsage ?? 0,
      Total_Amount: todaysConsumption.totalAmount ?? 0,
      Todays_Appliance: todaysConsumption.Appliances ?? [],
      Yesterday_Appliance: todaysConsumption.Appliances ?? [],
    },
  };

  return (
    <DashboardContext.Provider
      value={{
        exportData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardReport = () => {
  const context = useContext(DashboardContext);
  if (!context)
    throw new Error(
      "useDashboardReport must be used within a DashboardProvider",
    );
  return context;
};
