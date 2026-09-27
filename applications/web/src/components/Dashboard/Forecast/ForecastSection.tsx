import ForecastHeader from "@/src/components/Dashboard/Forecast/ForecastHeader";
import KpiCards from "@/src/components/Dashboard/Forecast/Cards/KpiCards";
import Days7Card from "@/src/components/Dashboard/Forecast/Cards/Days7Card";
import ElectricityCard from "@/src/components/Dashboard/Forecast/Cards/ElectricityCard";
import CarbonCard from "@/src/components/Dashboard/Forecast/Cards/CarbonCard";
import { WeeklyConsumptionProvider } from "@/src/context/useWeekConsumption";
import { WeeklyPriceProvider } from "@/src/context/useWeeklyUserPrice";
import { PredictCarbonProvider } from "@/src/context/usePredictionCarbon";

export default function ForecastSection() {
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 select-text">
      <ForecastHeader />
      <WeeklyConsumptionProvider>
        <KpiCards />
        <Days7Card />
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <WeeklyPriceProvider>
            <ElectricityCard />
          </WeeklyPriceProvider>
          <PredictCarbonProvider>
            <CarbonCard />
          </PredictCarbonProvider>
        </section>
      </WeeklyConsumptionProvider>
    </main>
  );
}
