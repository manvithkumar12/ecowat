import { Loader2 } from "lucide-react";

const AppliancesLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-4">
      <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      <p className="text-sm text-slate-500 dark:text-stone-400 font-medium animate-pulse">
        Loading appliances...
      </p>
    </div>
  );
};

export default AppliancesLoading;
