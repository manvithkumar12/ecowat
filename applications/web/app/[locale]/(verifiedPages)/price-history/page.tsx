import { TooltipProvider } from "@/shadcn/ui/tooltip";
import PriceHistoryClient from "@/src/components/Dashboard/PriceHistory/PriceHistoryClient";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function PriceHistoryPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const startDate =
    typeof resolvedParams.startDate === "string"
      ? resolvedParams.startDate
      : undefined;
  const endDate =
    typeof resolvedParams.endDate === "string"
      ? resolvedParams.endDate
      : undefined;

  return (
    <TooltipProvider>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 w-full min-w-0">
        <PriceHistoryClient
          initialStartDate={startDate}
          initialEndDate={endDate}
        />
      </div>
    </TooltipProvider>
  );
}