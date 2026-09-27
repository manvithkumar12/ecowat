import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { TodaysConsumptionApplication, UsedAppliance } from "@ecowat/shared";

const TodaysConsumptionPopup = ({
  usageVisible,
  setUsageVisible,
  recentApplications,
  isLoading,
  isError,
  onRetry,
  totalConsumption,
}: {
  usageVisible: boolean;
  recentApplications: UsedAppliance[] | undefined;
  setUsageVisible: (visible: boolean) => void;
  isLoading: boolean;
  totalConsumption: number;
  isError: boolean;
  onRetry?: () => void;
}) => {
  return (
    <Modal
      visible={usageVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setUsageVisible(false)}
    >
      <View className="flex-1 bg-black/55 px-5 justify-center">
        <View className="rounded-3xl py-8 bg-white p-4 dark:bg-[#0F172A]">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-2xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Recent Usage Breakdown
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Last 3 used appliances with rating, usage and energy impact.
              </Text>
            </View>
            <Pressable
              onPress={() => setUsageVisible(false)}
              className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
            >
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Close
              </Text>
            </Pressable>
          </View>

          {(isLoading || (recentApplications && recentApplications.length > 0)) && (
            <View className="mt-4 flex-row border-b border-slate-200 pb-2 dark:border-slate-800">
              <Text className="flex-[1.55] text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Application
              </Text>
              <Text className="w-20 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Rating (W)
              </Text>
              <Text className="w-20 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Usage
              </Text>
              <Text className="w-24 ml-2 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                Consumption
              </Text>
            </View>
          )}

          {isLoading ? (
            <View className="mt-3 space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between rounded-2xl border border-slate-100 px-3 py-3 dark:border-slate-800"
                >
                  <View className="h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <View className="h-4 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <View className="h-4 w-14 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <View className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                </View>
              ))}
            </View>
          ) : isError ? (
            <View className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
              <Text className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                Could not load usage details.
              </Text>
              <Text className="mt-1 text-sm text-rose-600 dark:text-rose-200">
                Please try again in a moment.
              </Text>
              <View className="mt-3 flex-row gap-3">
                {onRetry ? (
                  <Pressable
                    onPress={onRetry}
                    className="rounded-full bg-rose-100 px-3 py-2 dark:bg-rose-500/20"
                  >
                    <Text className="text-sm font-semibold text-rose-700 dark:text-rose-200">
                      Retry
                    </Text>
                  </Pressable>
                ) : null}
                <Pressable
                  onPress={() => setUsageVisible(false)}
                  className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
                >
                  <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : recentApplications && recentApplications.length > 0 ? (
            <>
              <ScrollView className="mt-2" style={{ maxHeight: 320 }}>
                {recentApplications.slice(0, 3).map((appliance, index) => (
                  <View
                    key={`${appliance.appliance.name}-${index}`}
                    className="flex-row items-center border-b border-slate-100 py-3 dark:border-slate-800"
                  >
                    <Text className="flex-[1.55] pr-2 text-lg text-slate-700 dark:text-slate-200">
                      <Text className="font-semibold text-emerald-700 dark:text-emerald-400">
                        #{index + 1}{" "}
                      </Text>
                      {appliance.appliance.name}
                    </Text>
                    <Text className="w-20 text-right text-lg font-semibold text-slate-700 dark:text-slate-200">
                      {appliance.rating}
                    </Text>
                    <Text className="w-20 text-right mr-4 text-lg font-semibold text-slate-700 dark:text-slate-200">
                      {appliance.usageHours}
                    </Text>
                    <Text className="w-24 text-right text-lg font-semibold text-emerald-700 dark:text-emerald-400">
                      {appliance.totalPrice.toFixed(1)} kWh
                    </Text>
                  </View>
                ))}
              </ScrollView>

              <View className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <Text className="text-sm text-slate-700 dark:text-slate-200">
                  Total consumption:{" "}
                  <Text className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {totalConsumption.toFixed(1)} Kwh
                  </Text>
                </Text>
              </View>
            </>
          ) : (
            <View className="mt-6 mb-4 py-8 px-4 items-center justify-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
              <Text className="text-4xl mb-3">🔌</Text>
              <Text className="text-base font-semibold text-[#0F172A] dark:text-[#F8FAFC] text-center">
                No applications available
              </Text>
              <Text className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center px-4 max-w-[240px]">
                No energy usage data recorded for any appliance today.
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default TodaysConsumptionPopup;
