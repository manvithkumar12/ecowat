import { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

export function StatCard({
  title,
  value,
  trend,
  actionLabel,
  onActionPress,
  loading,
  error,
  onRetry,
  visual,
}: {
  title: string;
  value: string | number;
  trend?: {
    label: string;
    tone: "positive" | "negative";
  };
  actionLabel?: string;
  onActionPress?: () => void;
  loading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  visual?: ReactNode;
}) {
  const trendStyles = trend
    ? trend.tone === "positive"
      ? "border-emerald-200 bg-emerald-50 dark:border-emerald-500/20 dark:bg-emerald-500/10"
      : "border-rose-200 bg-rose-50 dark:border-rose-500/20 dark:bg-rose-500/10"
    : "";

  const trendTextStyles = trend
    ? trend.tone === "positive"
      ? "text-emerald-700 dark:text-emerald-300"
      : "text-rose-700 dark:text-rose-300"
    : "";

  return (
    <View className="w-1/2 p-2">
      <View className="rounded-2xl p-3 bg-white/80 dark:bg-white/5  shadow-2xl border border-slate-200 dark:border-slate-800 shadow-slate-950/20">
        <View className="flex-row items-start justify-between gap-3">
          <Text className="flex-1 text-base text-gray-500 dark:text-gray-300">
            {title}
          </Text>
          {loading ? (
            <View className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
          ) : trend ? (
            <View
              className={`flex-row items-center rounded-full border px-2 py-1 ${trendStyles}`}
            >
              <Text className={`text-[11px] font-semibold ${trendTextStyles}`}>
                {trend.tone === "positive" ? "↑" : "↓"} {trend.label}
              </Text>
            </View>
          ) : null}
        </View>
        {loading ? (
          <View className="mt-2 h-8 w-28 rounded-lg bg-slate-200 dark:bg-slate-700" />
        ) : error ? (
          <View className="mt-2 rounded-xl border border-rose-200 bg-rose-50 p-3 dark:border-rose-500/20 dark:bg-rose-500/10">
            <Text className="text-sm font-semibold text-rose-700 dark:text-rose-300">
              {error}
            </Text>
            {onRetry ? (
              <Pressable
                onPress={onRetry}
                className="mt-2 rounded-lg bg-rose-100 px-3 py-2 self-start"
              >
                <Text className="text-rose-700 font-semibold">Retry</Text>
              </Pressable>
            ) : null}
          </View>
        ) : (
          <View className="mt-2 flex-row items-center justify-between gap-3">
            <Text className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
              {value}
            </Text>
            {visual ? <View className="flex-shrink-0">{visual}</View> : null}
          </View>
        )}
        {!loading && !error && actionLabel && onActionPress ? (
          <Pressable
            onPress={onActionPress}
            className="mt-3 self-start rounded-full bg-emerald-50 px-3 py-2 dark:bg-emerald-500/10"
          >
            <Text className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {actionLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
