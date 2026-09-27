import { ApplianceItemState } from "./ApplianceAdd.types";

export const handleUpdateUsageHours = (
  id: string,
  newHours: number,
  setAppliances: React.Dispatch<React.SetStateAction<ApplianceItemState[]>>,
) => {
  setAppliances((prev) =>
    prev.map((app) =>
      app.id === id
        ? {
            ...app,
            usageHours: Math.min(
              24,
              Math.max(0.1, Number(newHours.toFixed(1))),
            ),
          }
        : app,
    ),
  );
};

export const handleUpdatePower = (
  id: string,
  newPower: number,
  setAppliances: React.Dispatch<React.SetStateAction<ApplianceItemState[]>>,
) => {
  setAppliances((prev) =>
    prev.map((app) =>
      app.id === id ? { ...app, power: Math.max(0, newPower) } : app,
    ),
  );
};

export const isAlreadySaved = (raw: string, savedAppliances: any) => {
  const clean = raw.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  return Boolean(
    savedAppliances?.some(
      (s: any) => s.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "") === clean,
    ),
  );
};

export const getApplianceId = (rawName: string, savedAppliances: any) => {
  const clean = rawName.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
  const appliance = savedAppliances?.find(
    (s: any) => s.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "") === clean,
  );
  if (appliance) {
    return appliance.id;
  }
  return null;
};

export const handleAddSingle = (
  id: string,
  appliances: ApplianceItemState[],
  setAppliances: React.Dispatch<React.SetStateAction<ApplianceItemState[]>>,
  savedAppliances: any,
  addMutation: any,
  toast: any,
) => {
  const target = appliances.find((a) => a.id === id);
  if (!target || target.isAdded || target.isPending) return;

  const cleanTargetName = target.rawName
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "");
  const alreadySaved = savedAppliances?.some(
    (s: any) =>
      s.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "") === cleanTargetName,
  );

  if (alreadySaved) {
    setAppliances((prev) =>
      prev.map((app) => (app.id === id ? { ...app, isAdded: true } : app)),
    );
    toast.info(`${target.displayName} is already in your dashboard.`);
    return;
  }

  setAppliances((prev) =>
    prev.map((app) => (app.id === id ? { ...app, isPending: true } : app)),
  );

  addMutation.mutate(
    {
      name: target.rawName,
      category: target.category,
      powerRatingW: target.power,
      dailyUsageHours: target.usageHours,
      DBName: cleanTargetName,
      status: true,
    },
    {
      onSuccess: () => {
        setAppliances((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, isPending: false, isAdded: true } : app,
          ),
        );
        toast.success(
          `${target.displayName} added to dashboard successfully!`,
          {
            description: `Rated at ${target.power}${target.powerUnit}, ${target.usageHours}h/day`,
          },
        );
      },
      onError: (err: any) => {
        setAppliances((prev) =>
          prev.map((app) =>
            app.id === id ? { ...app, isPending: false } : app,
          ),
        );
        if (
          err?.message === "APPLIANCE_ALREADY_EXISTS" ||
          err?.message === "ALREADY_EXISTS"
        ) {
          setAppliances((prev) =>
            prev.map((app) =>
              app.id === id ? { ...app, isAdded: true } : app,
            ),
          );
          toast.info(
            `${target.displayName} is already saved in your dashboard.`,
          );
        } else {
          toast.error(err?.message || `Failed to add ${target.displayName}`);
        }
      },
    },
  );
};
