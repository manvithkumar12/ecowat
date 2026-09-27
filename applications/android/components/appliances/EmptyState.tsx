import { View, Text, TouchableOpacity } from "react-native";

export function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <View className="items-center py-12">
      <Text className="text-6xl">🔌</Text>
      <Text className="mt-6 text-xl font-semibold text-slate-950 dark:text-slate-50">
        No appliances added yet
      </Text>
      <Text className="mt-2 px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        Add household appliances to improve forecasting accuracy and energy
        recommendations.
      </Text>
      <TouchableOpacity
        onPress={onAdd}
        className="mt-6 rounded-2xl bg-emerald-500 px-5 py-3"
        activeOpacity={0.9}
      >
        <Text className="text-sm font-semibold text-white">
          Add First Appliance
        </Text>
      </TouchableOpacity>
    </View>
  );
}
