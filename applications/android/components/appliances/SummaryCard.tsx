import { View, Text } from "react-native";

export function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon?: React.ComponentType<{
    size?: number;
    color?: string;
    strokeWidth?: number;
  }>;
}) {
  return (
    <View className="mr-3 h-[112px] w-[160px] flex-shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <View className="flex-row items-center gap-2">
        <View className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-900/20">
          {Icon ? (
            <Icon size={18} color="#10B981" strokeWidth={2} />
          ) : (
            <Text>⚡</Text>
          )}
        </View>
        <Text
          numberOfLines={1}
          className="flex-1 text-xs font-medium uppercase tracking-wide text-slate-400"
        >
          {title}
        </Text>
      </View>
      <Text
        numberOfLines={1}
        className="mt-3 text-2xl font-semibold text-slate-950 dark:text-slate-50"
      >
        {value}
      </Text>
    </View>
  );
}
