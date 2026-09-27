import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, Text } from "react-native";

export function ApplianceRow({
  name,
  status,
}: {
  name: string;
  status: string;
}) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-slate-200 dark:border-slate-800">
      <View>
        <Text className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
          {name}
        </Text>
        <Text className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {status}
        </Text>
      </View>
      <MaterialCommunityIcons name="circle-medium" size={20} color="#10B981" />
    </View>
  );
}
