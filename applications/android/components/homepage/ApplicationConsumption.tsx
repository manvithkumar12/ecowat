import { ApplianceItem } from "@ecowat/shared";
import { Text, View } from "react-native";


export function ApplianceConsumptionRow({
  name,
  kwh,
  cost,
  value,
}: ApplianceItem) {
  return (
    <View className="flex-row items-center border-b border-slate-200/70 py-4 last:border-b-0 dark:border-slate-800">
      <Text className="flex-[1.55] pr-3 text-lg font-medium text-[#0F172A] dark:text-[#F8FAFC]">
        {name}
      </Text>
      <Text className="flex-1 text-right text-md text-gray-500 dark:text-gray-300">
        {kwh} kWh
      </Text>
      <Text className="flex-1 text-right text-md font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
        ₹{cost}
      </Text>
      <Text className="w-16 text-right text-md text-[#10B981] dark:text-emerald-400">
        {value}%
      </Text>
    </View>
  );
}
