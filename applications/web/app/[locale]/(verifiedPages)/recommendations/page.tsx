import { TooltipProvider } from "@/shadcn/ui/tooltip";
import AvoidAppliances from "@/src/components/Dashboard/Recommendations/AvoidAppliances";
import BestTimeCard from "@/src/components/Dashboard/Recommendations/BestTimeCard";
import RecHeader from "@/src/components/Dashboard/Recommendations/RecHeader";
import SummaryCards from "@/src/components/Dashboard/Recommendations/SummaryCards";
import { LivePriceProvider } from "@/src/context/usePriceData";
import { UserAppliancesProvider } from "@/src/context/userAppliances";
import { RecommendationsProvider } from "@/src/context/useRecommendations.Context";
import { RenewableProvider } from "@/src/context/useRenewable.context";

export default function RecommendationsPage() {
  return (
    <TooltipProvider>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        <UserAppliancesProvider>
          <LivePriceProvider>
            <RenewableProvider>
              <RecommendationsProvider>
                <RecHeader />
                <SummaryCards />
                <BestTimeCard />
                <AvoidAppliances />
              </RecommendationsProvider>
            </RenewableProvider>
          </LivePriceProvider>
        </UserAppliancesProvider>
      </div>
    </TooltipProvider>
  );
}
