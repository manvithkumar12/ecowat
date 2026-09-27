import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import NotificationItem, { NotificationItemProps } from "./NotificationItem";

export type NotificationState = "loading" | "messages" | "empty";

type NotificationStateViewProps = {
  state: NotificationState;
  notifications: NotificationItemProps[];
};

export default function NotificationStateView({
  state,
  notifications,
}: NotificationStateViewProps) {
  if (state === "loading") {
    return (
      <View className="min-h-[280px] items-center justify-center rounded-[28px] border border-slate-200 bg-white px-6 py-10 dark:border-slate-800 dark:bg-slate-950">
        <ActivityIndicator size="large" color="#10b981" />
        <Text className="mt-4 text-lg font-semibold text-slate-950 dark:text-slate-50">
          Loading
        </Text>
        <Text className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Fetching your notifications.
        </Text>
      </View>
    );
  }

  if (state === "empty") {
    return (
      <View className="min-h-[280px] items-center justify-center rounded-[28px] border border-dashed border-slate-300 bg-slate-50 px-6 py-10 dark:border-slate-700 dark:bg-slate-900">
        <View className="mb-4 rounded-full bg-emerald-100 px-4 py-3 dark:bg-emerald-900/20">
          <Text className="text-2xl">📭</Text>
        </View>
        <Text className="text-lg font-semibold text-slate-950 dark:text-slate-50">
          No messages
        </Text>
        <Text className="mt-1 text-center text-sm text-slate-500 dark:text-slate-400">
          You are all caught up. New notifications will appear here.
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={`${notification.title}-${notification.time}`}
          {...notification}
        />
      ))}
    </View>
  );
}
