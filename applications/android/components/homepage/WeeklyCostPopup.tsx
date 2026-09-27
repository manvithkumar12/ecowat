import { Modal, View, Text, Pressable, ScrollView } from "react-native";

type WeeklyCostData = {
  weeklyEstimatedCost: number;
  averageDailyCost: number;
  dayWiseCost: {
    day: string;
    cost: number;
    estimated: boolean;
  }[];
};

const WeeklyCostPopup = ({
  dailyCostVisible,
  setDailyCostVisible,
  weeklyCostData,
  isLoading,
  isError,
  onRetry,
}: {
  dailyCostVisible: boolean;
  setDailyCostVisible: (visible: boolean) => void;
  weeklyCostData?: WeeklyCostData;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}) => {
  return (
    <Modal
      visible={dailyCostVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setDailyCostVisible(false)}
    >
      <View className="flex-1 bg-black/55 px-5 justify-center">
        <View className="rounded-3xl bg-white p-4 dark:bg-[#0F172A]">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Daily Cost Breakdown
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Estimated weekly spend from Monday through Sunday.
              </Text>
            </View>
            <Pressable
              onPress={() => setDailyCostVisible(false)}
              className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
            >
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Close
              </Text>
            </Pressable>
          </View>

          <View className="mt-4 flex-row border-b border-slate-200 pb-2 dark:border-slate-800">
            <Text className="flex-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Day
            </Text>
            <Text className="w-24 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Cost
            </Text>
            <Text className="w-24 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Status
            </Text>
          </View>

          {isLoading ? (
            <View className="mt-3 space-y-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between rounded-2xl border border-slate-100 px-3 py-3 dark:border-slate-800"
                >
                  <View className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <View className="h-4 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <View className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                </View>
              ))}
            </View>
          ) : isError ? (
            <View className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
              <Text className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                Could not load daily cost details.
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
                  onPress={() => setDailyCostVisible(false)}
                  className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
                >
                  <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : weeklyCostData ? (
            <>
              <ScrollView className="mt-2" style={{ maxHeight: 360 }}>
                {weeklyCostData.dayWiseCost.map((item) => (
                  <View
                    key={item.day}
                    className="flex-row items-center border-b border-slate-100 py-3 dark:border-slate-800"
                  >
                    <Text className="flex-1 text-sm text-slate-700 dark:text-slate-200">
                      {item.day}
                    </Text>
                    <Text className="w-24 text-right text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      ₹{item.cost.toFixed(2)}
                    </Text>
                    <View className="w-24 items-end">
                      <View
                        className={`rounded-full px-2 py-1 ${
                          item.estimated
                            ? "bg-amber-100 dark:bg-amber-500/20"
                            : "bg-emerald-100 dark:bg-emerald-500/20"
                        }`}
                      >
                        <Text
                          className={`text-[11px] font-semibold ${
                            item.estimated
                              ? "text-amber-700 dark:text-amber-300"
                              : "text-emerald-700 dark:text-emerald-300"
                          }`}
                        >
                          {item.estimated ? "Estimated" : "Recorded"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <Text className="text-sm text-slate-700 dark:text-slate-200">
                  Weekly total:{" "}
                  <Text className="font-semibold text-emerald-700 dark:text-emerald-400">
                    ₹{weeklyCostData.weeklyEstimatedCost.toFixed(2)}
                  </Text>
                </Text>
                <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Average daily cost: ₹
                  {weeklyCostData.averageDailyCost.toFixed(2)}
                </Text>
              </View>
            </>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default WeeklyCostPopup;
