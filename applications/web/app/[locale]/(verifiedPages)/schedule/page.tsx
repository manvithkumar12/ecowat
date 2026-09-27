import { TooltipProvider } from "@/shadcn/ui/tooltip";
import ScheduleClient from "@/src/components/Dashboard/Schedule/ScheduleClient";
import { UsedApplianceProvider } from "@/src/context/usedAppliance.context";
import { LivePriceProvider } from "@/src/context/usePriceData";
import { UserAppliancesProvider } from "@/src/context/userAppliances";
import { RecommendationsProvider } from "@/src/context/useRecommendations.Context";
import { RenewableProvider } from "@/src/context/useRenewable.context";
import { UserScheduleProvider } from "@/src/context/useScheduleContext";

export default function SchedulePage() {
  return (
    <TooltipProvider>
      <UserAppliancesProvider>
        <LivePriceProvider>
          <RenewableProvider>
            <RecommendationsProvider>
              <UserScheduleProvider>
                <UsedApplianceProvider>
                  <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 w-full min-w-0">
                    <ScheduleClient />
                  </div>
                </UsedApplianceProvider>
              </UserScheduleProvider>
            </RecommendationsProvider>
          </RenewableProvider>
        </LivePriceProvider>
      </UserAppliancesProvider>
    </TooltipProvider>
  );
}
