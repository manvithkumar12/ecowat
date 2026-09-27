import { Metadata } from "next";
import TrackerClient from "../../../../src/components/Dashboard/Tracker/TrackerClient";
import { LivePriceProvider } from "@/src/context/usePriceData";
import { UsedApplianceProvider } from "@/src/context/usedAppliance.context";

export const metadata: Metadata = {
  title: "Consumption Tracker",
  description: "Track daily used appliances, consumption, and costs",
};

export default function TrackerPage() {
  return (
    <LivePriceProvider>
      <UsedApplianceProvider>
        <TrackerClient />
      </UsedApplianceProvider>
    </LivePriceProvider>
  );
}
