import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Icon,
  Label,
  NativeTabs,
  VectorIcon,
} from "expo-router/unstable-native-tabs";
import { useColorScheme } from "react-native";
import AppNavbar from "../../components/AppNavbar";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = colorScheme === "dark" ? "#10b981" : "#10b981";
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#ffffff";
  return (
    <>
      <AppNavbar title="Ecowat" />
      <NativeTabs
        tintColor={activeColor}
        backgroundColor={backgroundColor}
        disableTransparentOnScrollEdge
      >
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.TabBar backgroundColor={backgroundColor} />
          <Icon
            sf={{ default: "house", selected: "house.fill" }}
            androidSrc={
              <VectorIcon family={MaterialCommunityIcons} name="home" />
            }
          />
          <Label>Home</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="forecast">
          <NativeTabs.Trigger.TabBar backgroundColor={backgroundColor} />
          <Icon
            sf={{ default: "gearshape", selected: "gearshape.fill" }}
            androidSrc={
              <VectorIcon family={MaterialCommunityIcons} name="chart-line" />
            }
          />
          <Label>Forecast</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="appliances">
          <NativeTabs.Trigger.TabBar backgroundColor={backgroundColor} />
          <Icon
            sf={{ default: "cube.box", selected: "cube.box.fill" }}
            androidSrc={
              <VectorIcon family={MaterialCommunityIcons} name="connection" />
            }
          />
          <Label>Appliances</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="recommendation">
          <NativeTabs.Trigger.TabBar backgroundColor={backgroundColor} />
          <Icon
            sf={{ default: "cube.box", selected: "cube.box.fill" }}
            androidSrc={
              <VectorIcon
                family={MaterialCommunityIcons}
                name="lightbulb-on-outline"
              />
            }
          />
          <Label>Recommendations</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="footprint">
          <NativeTabs.Trigger.TabBar backgroundColor={backgroundColor} />
          <Icon
            sf={{ default: "gearshape", selected: "gearshape.fill" }}
            androidSrc={
              <VectorIcon family={MaterialCommunityIcons} name="leaf" />
            }
          />
          <Label>Footprints</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </>
  );
}
