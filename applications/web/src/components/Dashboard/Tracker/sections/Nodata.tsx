import { CardContent } from "@/shadcn/ui/card";
import { formatDateLabel } from "@ecowat/shared";
import { Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const Nodata = ({ selectedDateObject }: { selectedDateObject: Date }) => {
  const t = useTranslations("Tracker.empty");
  return (
    <CardContent className="flex flex-col items-center justify-center space-y-3.5">
      <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-stone-900/70 flex items-center justify-center text-slate-400 dark:text-stone-600">
        <Zap className="h-6 w-6" />
      </div>
      <div className="space-y-1">
        <h3 className="font-bold text-slate-800 dark:text-stone-200 text-sm">
          {t("title")}
        </h3>
        <p className="text-xs text-slate-500 dark:text-stone-400 max-w-sm">
          {t("description", { date: formatDateLabel(selectedDateObject) })}
        </p>
      </div>
    </CardContent>
  );
};

export default Nodata;
