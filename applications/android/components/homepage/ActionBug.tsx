import { Text, TouchableOpacity, View } from "react-native";

export function ActionButton({ label, Icon }: { label: string; Icon: any }) {
  return (
    <TouchableOpacity className="w-1/4 p-2 items-center">
      <View className="w-14 h-14 rounded-xl bg-white dark:bg-[#0F172A] items-center justify-center shadow-sm">
        {Icon}
      </View>
      <Text className="text-base mt-2 text-gray-700 dark:text-gray-300">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
