import { View, Text, useColorScheme } from "react-native";

export function StepBar({ step, isDark }: { step: number; isDark: boolean }) {
  const stepClasses = (currentStep: number) =>
    currentStep <= step
      ? "bg-emerald-500 text-white"
      : isDark
        ? "bg-slate-800 text-slate-400"
        : "bg-slate-200 text-slate-500";

  return (
    <View
      className={`mb-6 rounded-2xl border px-4 py-4 ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-50"
      }`}
    >
      <Text
        className={`text-xs font-semibold uppercase tracking-[0.2em] ${isDark ? "text-slate-400" : "text-slate-500"}`}
      >
        Recovery Progress
      </Text>
      <View className="mt-4 flex-row items-center">
        <View className={`rounded-full px-3 py-1 ${stepClasses(1)}`}>
          <Text className="text-xs font-semibold">Step 1</Text>
        </View>
        <View className="mx-2 h-px flex-1 bg-slate-700" />
        <View className={`rounded-full px-3 py-1 ${stepClasses(2)}`}>
          <Text className="text-xs font-semibold">Step 2</Text>
        </View>
        <View className="mx-2 h-px flex-1 bg-slate-700" />
        <View className={`rounded-full px-3 py-1 ${stepClasses(3)}`}>
          <Text className="text-xs font-semibold">Step 3</Text>
        </View>
      </View>
    </View>
  );
}
