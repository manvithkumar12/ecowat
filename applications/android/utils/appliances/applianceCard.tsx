import { Appliance, Availableappliances } from "@ecowat/shared";
import { getConsumption, isEnabled } from "./appliancesTotal";
import { View, Text, TouchableOpacity } from "react-native";
import { ApplianceToggle } from "./Toogle";
import { ChevronRight } from "lucide-react-native";
import { getApplianceIcon } from "./Icon";
import { useColorScheme } from "react-native";
export function ApplianceCard({
  item,
  onPress,
  onToggle,
}: {
  item: Appliance;
  onPress: () => void;
  onToggle: (nextValue: boolean) => void;
}) {
  const colorScheme = useColorScheme();
  const iconColor = colorScheme === "dark" ? "#FFFFFF" : "#000000";
  return (
    <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <View className="flex-row items-center justify-between gap-3">
        <TouchableOpacity
          activeOpacity={0.86}
          onPress={onPress}
          className="flex-1 pr-2"
        >
          <View className="flex-row items-center">
            <View className="mr-3 rounded-full bg-emerald-50 text-slate-50 p-3 dark:bg-emerald-900/20">
              {getApplianceIcon(
                Availableappliances.find((e) => e.name === item.name)
                  ?.applianceType!,
                iconColor,
              )}
            </View>
            <View className="flex-1">
              <Text className="text-lg font-semibold text-slate-950 dark:text-slate-50">
                {item.name}
              </Text>
              <View className="mt-1 flex-row flex-wrap items-center">
                <Text className="text-xs text-slate-500 dark:text-slate-400">
                  {item.status}
                </Text>
                <View className="rounded-md px-3 bg-slate-100  dark:bg-slate-700 p-1 flex flex-row gap-1 justify-center items-center">
                  <Text className="text-sm font-semibold text-slate-300 ">•</Text>
                  <Text className="text-md font-semibold text-slate-500 dark:text-slate-200">
                    {getConsumption(item)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View className="items-end">
          <ApplianceToggle value={isEnabled(item)} onChange={onToggle} />
          <View className="mt-3">
            <ChevronRight size={20} color="#94A3B8" />
          </View>
        </View>
      </View>
    </View>
  );
}
