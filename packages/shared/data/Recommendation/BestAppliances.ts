import { ApplianceRecommendation } from "../../types";


export const bestApplianceRecs: ApplianceRecommendation[] = [
  {
    name: "Washing Machine",
    bestTime: "2:00 PM – 4:00 PM",
    reason:
      "Electricity prices are lower and renewable energy availability is high.",
    savings: "₹12",
    priority: "High",
    status: "recommend",
  },
  {
    name: "Dishwasher",
    bestTime: "1:00 PM – 3:00 PM",
    reason: "High solar energy generation expected.",
    savings: "₹9",
    priority: "Medium",
    status: "recommend",
  },
  {
    name: "Electric Vehicle Charging",
    bestTime: "10:00 PM – 5:00 AM",
    reason: "Off‑peak electricity pricing.",
    savings: "₹18",
    priority: "High",
    status: "recommend",
  },
];
