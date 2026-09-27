import { TooltipProvider } from "@/shadcn/ui/tooltip";
import FootPrintHeader from "@/src/components/Dashboard/FootPrints/FootPrintHeader";
import KpiCards from "@/src/components/Dashboard/FootPrints/KpiCards";
import WeeklyEst from "@/src/components/Dashboard/FootPrints/WeeklyEst";
import MonthlyEst from "@/src/components/Dashboard/FootPrints/MonthlyEst";
import CarbonReduction from "@/src/components/Dashboard/FootPrints/CarbonReduction";
import EquivalentCards from "@/src/components/Dashboard/FootPrints/EquivalentCards";
import { CarbonEmissionProvider } from "@/src/context/useCarbonEmissions";
import { PredictCarbonProvider } from "@/src/context/usePredictionCarbon";

export default function CarbonFootprintPage() {
  return (
    <TooltipProvider>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <FootPrintHeader />
        <CarbonEmissionProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCards />
          </div>
          <WeeklyEst />
          <MonthlyEst />
          <PredictCarbonProvider>
            <CarbonReduction />
          </PredictCarbonProvider>
          <EquivalentCards />
        </CarbonEmissionProvider>
      </div>
    </TooltipProvider>
  );
}
