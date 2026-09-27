import { ApplianceRecommendation } from "../../types";


export const avoidApplianceRecs: ApplianceRecommendation[] = [
  {
    name: "Air Conditioner",
    bestTime: "6:00 PM – 9:00 PM",
    reason:
      "Peak demand period detected. Electricity price expected to increase by 15%.",
    savings: "+₹20",
    priority: "High",
    status: "avoid",
  },
  {
    name: "Water Heater",
    bestTime: "7:00 PM – 8:30 PM",
    reason: "Grid demand currently high.",
    savings: "",
    priority: "Medium",
    status: "avoid",
  },
];
