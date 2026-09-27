import { Tooltip, TooltipContent, TooltipTrigger } from "@/shadcn/ui/tooltip";
import { Info } from "lucide-react";

const MlToolTip = ({ mlauto = false }: { mlauto?: boolean }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          className={`bg-emerald-500 flex items-center justify-center font-semibold h-7 text-xs w-10 ${mlauto ? "ml-auto" : ""} cursor-pointer text-white rounded-full px-2.5 p-1`}
        >
          ML
        </div>
      </TooltipTrigger>
      <TooltipContent>
        This is estimated consumption data, not an AI-generated prediction.
        EcoWatt requires at least 7 days of usage history to generate
        personalized energy forecasts. Once sufficient data is collected, your
        forecast wil automatically switch to model-generated predictions.
      </TooltipContent>
    </Tooltip>
  );
};

export default MlToolTip;
