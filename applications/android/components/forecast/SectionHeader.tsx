import { Text, View } from "react-native";

export function SectionHeader({
  title,
  subtitle,
  rightLabel,
}: {
  title: string;
  subtitle?: string;
  rightLabel?: string;
}) {
  return (
    <View className="mb-3 flex-row items-start justify-between">
      <View className="flex-1 pr-3">
        <Text className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {rightLabel ? (
        <View className="rounded-full bg-emerald-50 px-3 py-1 dark:bg-emerald-500/10">
          <Text className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            {rightLabel}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
