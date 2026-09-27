import {
  Battery,
  Car,
  Coffee,
  Droplets,
  Fan,
  Flame,
  Lightbulb,
  Package,
  Tv,
  WashingMachine,
  Wind,
} from "lucide-react-native";
export const getApplianceIcon = (applianceType: string, color: string) => {
  switch (applianceType) {
    case "Cooling":
      return <Wind color={color} size={20} />;
    case "Kitchen":
      return <Coffee color={color} size={20} />;
    case "Laundry":
      return <WashingMachine color={color} size={20} />;
    case "Lighting":
      return <Lightbulb color={color} size={20} />;
    case "Electronics":
      return <Tv color={color} size={20} />;
    case "Heating":
      return <Flame color={color} size={20} />;
    case "Vehicle":
      return <Car color={color} size={20} />;
    case "Energy Storage":
      return <Battery color={color} size={20} />;
    case "Water":
      return <Droplets color={color} size={20} />;
    case "Air":
      return <Fan color={color} size={20} />;
    default:
      return <Package color={color} size={20} />;
  }
};
