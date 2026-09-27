import {
  Wind,
  Coffee,
  WashingMachine,
  Lightbulb,
  Tv,
  Package,
  Flame,
  Car,
  Battery,
  Droplets,
  Fan,
} from "lucide-react";

export const getApplianceIcon = (applianceType: string) => {
  switch (applianceType) {
    case "Cooling":
      return <Wind className="h-5 w-5" />;
    case "Kitchen":
      return <Coffee className="h-5 w-5" />;
    case "Laundry":
      return <WashingMachine className="h-5 w-5" />;
    case "Lighting":
      return <Lightbulb className="h-5 w-5" />;
    case "Electronics":
      return <Tv className="h-5 w-5" />;
    case "Heating":
      return <Flame className="h-5 w-5" />;
    case "Vehicle":
      return <Car className="h-5 w-5" />;
    case "Energy Storage":
      return <Battery className="h-5 w-5" />;
    case "Water":
      return <Droplets className="h-5 w-5" />;
    case "Air":
      return <Fan className="h-5 w-5" />;
    default:
      return <Package className="h-5 w-5" />;
  }
};
