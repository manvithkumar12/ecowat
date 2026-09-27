import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Switch } from "@/shadcn/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Appliance, ApplianceCategory } from "@ecowat/shared";
import { Availableappliances } from "@ecowat/shared/";
import { useTranslations } from "next-intl";

interface AddApplianceDialogProps {
  onAdd: (appliance: Omit<Appliance, "id">) => void;
  children: React.ReactNode;
}

export function AddApplianceDialog({
  onAdd,
  children,
}: AddApplianceDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<ApplianceCategory | "">("");
  const [power, setPower] = useState("");
  const [hours, setHours] = useState("");
  const [isActive, setIsActive] = useState(true);
  const t = useTranslations("Appliances.addDialog");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category || !power || !hours) return;

    onAdd({
      name,
      category: category as ApplianceCategory,
      powerRatingW: Number(power),
      dailyUsageHours: Number(hours),
      status: isActive ? true : false,
      DBName: name.replace(" ", "").toLowerCase(),
    });

    setName("");
    setCategory("");
    setPower("");
    setHours("");
    setIsActive(true);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-106.25 bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-stone-800">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-stone-100">
            {t("title")}
          </DialogTitle>
          <DialogDescription className="text-slate-500 dark:text-stone-400">
            {t("description")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-stone-300">
              {t("applianceType")}
            </Label>
            <Select
              value={name}
              onValueChange={(val) => {
                setName(val);
                const selectedAppliance = Availableappliances.find(
                  (a) => a.name === val,
                );
                if (selectedAppliance) {
                  setCategory(selectedAppliance.category as ApplianceCategory);
                }
              }}
              required
            >
              <SelectTrigger className="border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/50">
                <SelectValue placeholder={t("selectPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {Availableappliances.map((app) => (
                  <SelectItem key={app.id} value={app.name}>
                    {app.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="power"
                className="text-slate-700 dark:text-stone-300"
              >
                {t("power")}
              </Label>
              <Input
                id="power"
                type="number"
                placeholder="e.g. 1500"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/50"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="hours"
                className="text-slate-700 dark:text-stone-300"
              >
                {t("dailyUsage")}
              </Label>
              <Input
                id="hours"
                type="number"
                placeholder="e.g. 5"
                step="0.1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="border-slate-200 dark:border-stone-800 bg-slate-50 dark:bg-stone-900/50"
                min="0.1"
                max="24"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label
              htmlFor="status"
              className="text-slate-700 dark:text-stone-300 cursor-pointer"
            >
              {t("activeAppliance")}
            </Label>
            <Switch
              id="status"
              checked={isActive}
              onCheckedChange={setIsActive}
            />
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
              className="hover:bg-slate-100 dark:hover:bg-stone-900"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {t("submit")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
