import { View, Text, Pressable, useColorScheme } from "react-native";

const MiniNav = ({ onBack }: { onBack: () => void }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <View className="mb-4 flex-row items-center justify-between">
      <Pressable
        onPress={onBack}
        className={`rounded-full px-4 py-2 ${
          isDark ? "bg-white/5" : "bg-slate-100"
        }`}
      >
        <Text
          className={`text-sm font-semibold ${isDark ? "text-slate-200" : "text-slate-700"}`}
        >
          Back
        </Text>
      </Pressable>
      <Text className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-500 dark:text-emerald-300">
        Reset Password
      </Text>
    </View>
  );
};

export default MiniNav;
