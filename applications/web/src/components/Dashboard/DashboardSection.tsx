"use client";
import Dashboardheader from "@/src/components/Dashboard/Dashboard/Dashboardheader";
import PriceCard from "@/src/components/Dashboard/CardComponents/dashboard/PriceCard";
import RenewableCard from "@/src/components/Dashboard/CardComponents/dashboard/RenewableCard";
import ConsumptionCard from "@/src/components/Dashboard/CardComponents/dashboard/ConsumptionCard";
import WeeklyCard from "@/src/components/Dashboard/CardComponents/dashboard/WeeklyCard";
import ConsumptionForecast from "@/src/components/Dashboard/Charts/dashboard/ConsumptionForecast";
import ElectricityForecast from "@/src/components/Dashboard/Charts/dashboard/ElectricityForecast";
import RenewableForecast from "@/src/components/Dashboard/Charts/dashboard/RenewableForecast";
import InsightsCard from "@/src/components/Dashboard/CardComponents/dashboard/InsightsCard";
import AppliancesPieChart from "@/src/components/Dashboard/Charts/dashboard/AppliancesPieChart";
import { UsedApplianceProvider } from "@/src/context/usedAppliance.context";
import { LivePriceProvider } from "@/src/context/usePriceData";
import { RenewableProvider } from "@/src/context/useRenewable.context";
import { RecommendationsProvider } from "@/src/context/useRecommendations.Context";
import { UserAppliancesProvider } from "@/src/context/userAppliances";
import { DashboardProvider } from "@/src/context/useDashboardExport.context";
import { WeeklyConsumptionProvider } from "@/src/context/useWeekConsumption";
import { WeeklyPriceProvider as WeeklyCardPriceProvider } from "@/src/context/userWeeklyContext";
import { WeeklyPriceProvider as ElectricityForecastPriceProvider } from "@/src/context/useWeeklyUserPrice";
import { RenewableDataProvider } from "@/src/context/useRenewableData";

export default function DashboardSection() {
  return (
    <UserAppliancesProvider>
      <LivePriceProvider>
        <RenewableProvider>
          <UsedApplianceProvider>
            <RecommendationsProvider>
              <DashboardProvider>
                <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 select-text">
                  <Dashboardheader />
                  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
                    <PriceCard />
                    <RenewableCard />
                    <ConsumptionCard />
                    <WeeklyCardPriceProvider>
                      <WeeklyCard />
                    </WeeklyCardPriceProvider>
                  </section>

                  <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <WeeklyConsumptionProvider>
                      <ConsumptionForecast />
                    </WeeklyConsumptionProvider>
                    <ElectricityForecastPriceProvider>
                      <ElectricityForecast />
                    </ElectricityForecastPriceProvider>
                    <RenewableDataProvider>
                      <RenewableForecast />
                    </RenewableDataProvider>
                  </section>

                  <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <InsightsCard />
                    <AppliancesPieChart />
                  </section>
                </main>
              </DashboardProvider>
            </RecommendationsProvider>
          </UsedApplianceProvider>
        </RenewableProvider>
      </LivePriceProvider>
    </UserAppliancesProvider>
  );
}
