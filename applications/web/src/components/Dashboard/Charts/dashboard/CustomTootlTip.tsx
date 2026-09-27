import { getApplianceName } from "@/src/utils/appliances/applianceName";
import { ApplianceItem } from "@ecowat/shared";

export const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ApplianceItem }>;
}) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as ApplianceItem;
    console.log(data);
    return (
      <div className="bg-white dark:bg-[#0c0a09] border border-slate-200 dark:border-stone-800 p-3 rounded-xl shadow-xl text-xs space-y-1.5 select-none animate-in fade-in zoom-in-95 duration-100 relative z-9999">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full shrink-0"
            style={{ backgroundColor: data.color }}
          />
          <p className="font-bold text-slate-900 dark:text-stone-100">
            {getApplianceName(data.appliance?.name) ?? "Appliance"}
          </p>
        </div>
        <div className="space-y-1 text-slate-500 dark:text-stone-400 font-medium pt-1 border-t border-slate-100 dark:border-stone-900">
          <p className="flex justify-between gap-6">
            Usage:{" "}
            <span className="text-slate-800 dark:text-stone-200 font-semibold">
              {data.kwh} kWh
            </span>
          </p>
          <p className="flex justify-between gap-6">
            Est. Cost:{" "}
            <span className="text-slate-800 dark:text-stone-200 font-semibold">
              €{data.totalPrice}
            </span>
          </p>
          <p className="flex justify-between gap-6">
            Share:{" "}
            <span className="text-emerald-600 dark:text-emerald-450 font-bold">
              {data.percentage}%
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};
