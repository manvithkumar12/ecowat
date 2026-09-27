import { Plus, Power } from "lucide-react";
import { AddApplianceDialog } from "../AddApplianceDialog";
import { Button } from "@/shadcn/ui/button";
import { Appliance } from "@ecowat/shared";

const Empty = ({
  handleAddAppliance,
  type,
}: {
  handleAddAppliance: (appliance: Omit<Appliance, "id">) => void;
  type: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-[#0c0a09] rounded-2xl border border-slate-200 dark:border-stone-800 border-dashed">
      <div className="h-20 w-20 bg-slate-50 dark:bg-stone-900/50 rounded-full flex items-center justify-center mb-6">
        <Power className="h-10 w-10 text-slate-400 dark:text-stone-500" />
      </div>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-2">
        {type === "All"
          ? "No Appliances Found"
          : `No ${type} appliances added yet`}
      </h2>
      <p className="text-slate-500 dark:text-stone-400 max-w-sm mb-6 text-sm">
        Add your household appliances to begin energy forecasting and cost
        estimation.
      </p>
      <AddApplianceDialog onAdd={handleAddAppliance}>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add First Appliance
        </Button>
      </AddApplianceDialog>
    </div>
  );
};

export default Empty;
