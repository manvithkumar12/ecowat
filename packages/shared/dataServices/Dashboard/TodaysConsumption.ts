export type TodaysConsumptionApplication = {
  applianceName: string;
  Rating: number;
  usage: number;
  consumption: number;
};

const TempData: Omit<TodaysConsumptionApplication, "consumption">[] = [
  {
    applianceName: "Washing Machine",
    Rating: 1500,
    usage: 5,
  },
  {
    applianceName: "Refrigerator",
    Rating: 200,
    usage: 24,
  },
  {
    applianceName: "Air Conditioner",
    Rating: 1500,
    usage: 4,
  },
];

export const TodaysConsumption = (userId: number) => {
  const BASELINE_CONSUMPTION = 10;

  const recentApplications = TempData.map((appliance) => ({
    ...appliance,
    consumption: Number(
      ((appliance.Rating * appliance.usage) / 1000).toFixed(1),
    ),
  }));

  const todaysConsumption = recentApplications.reduce((acc, appliance) => {
    return acc + appliance.consumption;
  }, 0);

  const percentageDifference =
    ((todaysConsumption - BASELINE_CONSUMPTION) / BASELINE_CONSUMPTION) * 100;

  return {
    consumption: Number(todaysConsumption.toFixed(1)),
    baselineValue: BASELINE_CONSUMPTION,
    differenceValue: Number(
      Math.abs(todaysConsumption - BASELINE_CONSUMPTION).toFixed(1),
    ),
    percentageDifference: Number(Math.abs(percentageDifference).toFixed(1)),
    comparedValue:
      todaysConsumption > BASELINE_CONSUMPTION
        ? "more"
        : todaysConsumption < BASELINE_CONSUMPTION
          ? "less"
          : "equal",
    unit: "kWh",
    recentApplications,
  };
};
