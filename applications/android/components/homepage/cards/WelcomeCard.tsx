import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { useTodaysUsage } from "../../../context/TodaysUsage.context";
import { getGreeting } from "../../../utils/GreetingTime/greetingTime";

const WelcomeCard = ({ username }: { username: string }) => {
  const colorScheme = useColorScheme();
  const bg = colorScheme === "dark" ? "#020617" : "#FFFFFF";
  const { data: TodayConsumptionData, isLoading, isError } = useTodaysUsage();
  const greeting = getGreeting();
  return (
    <>
      {/* Header */}
      <View className="mt-4 mb-3">
        <Text className="text-3xl font-semibold text-gray-500  dark:text-gray-300">
          {greeting}, {username.charAt(0).toUpperCase() + username.slice(1)} 👋
        </Text>
        <Text className="text-lg text-gray-400 dark:text-gray-400 mt-1">
          Here's your energy summary for today.
        </Text>
      </View>
      <View className="rounded-3xl overflow-hidden mb-4 border  border-emerald-100 dark:border-transparent">
        <View
          className="p-4"
          style={{
            backgroundColor: colorScheme === "dark" ? "#021018" : "#ECFDF5",
          }}
        >
          <Text className="text-base font-medium text-slate-700 dark:text-gray-300">
            Today's Usage
          </Text>
          <View className="flex-row items-end justify-between mt-2">
            <View>
              <Text className="text-5xl font-bold text-[#064E3B] dark:text-[#10B981]">
                {TodayConsumptionData?.consumption || "N/A"} kWh
              </Text>
              <Text className="text-base text-slate-600 dark:text-gray-300 mt-1">
                ↓ 4.8% lower than expected
              </Text>
            </View>
            <View className="w-14 h-14 rounded-full bg-white dark:bg-[#062026] items-center justify-center shadow-sm border border-emerald-100 dark:border-[#123246]">
              <Text className="text-green-500">⚡</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default WelcomeCard;
