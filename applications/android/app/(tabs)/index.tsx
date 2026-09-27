import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { applianceBreakdownData } from "@ecowat/shared";
import { ApplianceConsumptionRow } from "../../components/homepage/ApplicationConsumption";
import { ImpactStrip } from "../../components/homepage/Strip";
import { ActionButton } from "../../components/homepage/ActionBug";
import CurrentPrice from "../../components/homepage/cards/CurrentPrice";
import RenewableCard from "../../components/homepage/cards/RenewableCard";
import TodayConsumptionCard from "../../components/homepage/cards/TodayConsumptionCard";
import WeeklyEstCard from "../../components/homepage/cards/WeeklyEstCard";
import WelcomeCard from "../../components/homepage/cards/WelcomeCard";
import { TodaysUsageProvider } from "../../context/TodaysUsage.context";
import { useUser } from "../../context/Userprovider";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const bg = colorScheme === "dark" ? "#020617" : "#FFFFFF";
  const user = useUser();
  return (
    <>
      <ScrollView
        className="flex-1 px-5 pt-7"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 160 }}
        style={{ backgroundColor: bg }}
      >
        <TodaysUsageProvider>
          <WelcomeCard username={user?.name ?? "User"} />
          <ImpactStrip />

          {/* Quick Stats */}
          <View className="mb-3 flex-row flex-wrap -mx-2">
            <CurrentPrice />
            <RenewableCard />
            <TodayConsumptionCard />
            <WeeklyEstCard />
          </View>
        </TodaysUsageProvider>
        {/* Recommendation */}
        <View className="rounded-2xl p-4 mb-3 bg-white dark:bg-[#0F172A] shadow-md">
          <Text className="font-semibold text-xl  text-[#064E3B] dark:text-[#10B981]">
            ⚡ Smart Recommendation
          </Text>
          <Text className="text-md pl-2 text-gray-600 dark:text-gray-300 mt-2">
            Run your dishwasher between 2 PM and 4 PM for lower energy costs and
            higher renewable availability.
          </Text>
          <View className="flex-row items-center justify-between mt-3">
            <View className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-[#051025]">
              <Text className="text-base  dark:text-[#10B981]">
                Potential Savings ₹18
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-base text-[#10B981]">View Details →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-3">
          <Text className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-2">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap -mx-2">
            <ActionButton
              label="Appliances"
              Icon={<Text className="dark:text-[#F8FAFC] text-2xl">🔌</Text>}
            />
            <ActionButton
              label="Footprint"
              Icon={<Text className="dark:text-[#F8FAFC] text-2xl">☘️</Text>}
            />
            <ActionButton
              label="Profile"
              Icon={<Text className="dark:text-[#F8FAFC] text-2xl">🧍</Text>}
            />
            <ActionButton
              label="Alerts"
              Icon={<Text className="dark:text-[#F8FAFC] text-2xl">🔔</Text>}
            />
          </View>
        </View>

        {/* Appliance Consumption */}
        <View className="mb-3 rounded-2xl p-4 bg-white dark:bg-[#0F172A] shadow-sm">
          <View className="flex-row items-start justify-between mb-1">
            <View className="flex-1 pr-3">
              <Text className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Appliance Consumption
              </Text>
              <Text className="mt-1 text-base text-gray-500 dark:text-gray-300">
                Estimated energy usage and cost by appliance.
              </Text>
            </View>
            <View className="rounded-full bg-emerald-100 px-3 py-1 dark:bg-emerald-500/10">
              <Text className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-400">
                Cost Breakdown
              </Text>
            </View>
          </View>

          <View className="mt-3 rounded-2xl border border-slate-200/70 bg-white dark:border-slate-800 dark:bg-slate-950">
            <View className="flex-row border-b border-slate-200/70 px-4 py-3 dark:border-slate-800">
              <Text className="flex-[1.55] pr-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Appliance Name
              </Text>
              <Text className="flex-1 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Energy Usage (kWh)
              </Text>
              <Text className="flex-1 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Estimated Cost (₹)
              </Text>
              <Text className="w-16 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Percentage
              </Text>
            </View>

            <View className="px-4">
              {applianceBreakdownData.map((item) => (
                <ApplianceConsumptionRow key={item.name} {...item} />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}
