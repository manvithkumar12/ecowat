import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { RenewableData } from "@ecowat/shared/fetchServices/Dashboard/renewabilityCheck";

const RenewablePopup = ({
  renewableVisible,
  setRenewableVisible,
  renewableData,
  isLoading,
  isError,
  onRetry,
}: {
  renewableVisible: boolean;
  setRenewableVisible: (visible: boolean) => void;
  renewableData?: RenewableData;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}) => {
  const statusDescriptionMap = {
    Low: "Low renewable window",
    Moderate: "Moderate renewable window",
    High: "High renewable window",
    Excellent: "Excellent renewable window",
  } as const;

  const statusColorMap = {
    Low: "bg-rose-100 dark:bg-rose-500 text-rose-700 dark:text-rose-300",
    Moderate:
      "bg-amber-100 dark:bg-amber-500 text-amber-700 dark:text-amber-300",
    High: "bg-emerald-100 dark:bg-emerald-500 text-emerald-700 dark:text-emerald-300",
    Excellent: "bg-cyan-100 dark:bg-cyan-500 text-cyan-700 dark:text-cyan-300",
  } as const;

  return (
    <Modal
      visible={renewableVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setRenewableVisible(false)}
    >
      <View className="flex-1 bg-black/55 px-5 justify-center">
        <View className="rounded-3xl bg-white p-4 dark:bg-[#0F172A]">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Best Renewable Hours
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Solar and wind contribution by the strongest hours
              </Text>
            </View>
            <Pressable
              onPress={() => setRenewableVisible(false)}
              className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
            >
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Close
              </Text>
            </Pressable>
          </View>

          {isLoading ? (
            <View className="mt-4 space-y-3">
              <View className="flex-row gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <View
                    key={index}
                    className="flex-1 rounded-2xl border border-slate-100 p-3 dark:border-slate-800"
                  >
                    <View className="h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                    <View className="mt-2 h-5 w-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                  </View>
                ))}
              </View>
              <View>
                <View className="mt-3 h-4 w-32 rounded-full bg-slate-200 dark:bg-slate-700" />
                <View className="mt-2 flex-row gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <View
                      key={index}
                      className="h-6 w-14 rounded-full bg-slate-200 dark:bg-slate-700"
                    />
                  ))}
                </View>
              </View>
            </View>
          ) : isError ? (
            <View className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
              <Text className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                Could not load renewable data.
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
                  onPress={() => setRenewableVisible(false)}
                  className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
                >
                  <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : renewableData ? (
            <ScrollView className="mt-4" style={{ maxHeight: 420 }}>
              {/* Status, Solar Score, Wind Score Grid */}
              <View className="flex-row gap-2 mb-4">
                <View className="flex-1 rounded-xl border border-slate-200 p-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <Text className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Status
                  </Text>
                  <View
                    className={`mt-2 rounded-full px-2 py-1 w-max max-w-[70px] ${statusColorMap[renewableData.status]}`}
                  >
                    <Text className="text-sm font-semibold">
                      {renewableData.status}
                    </Text>
                  </View>
                  <Text className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                    {statusDescriptionMap[renewableData.status]}
                  </Text>
                </View>

                <View className="flex-1 rounded-xl border border-slate-200 p-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <Text className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Solar Score
                  </Text>
                  <Text className="mt-2 text-2xl font-bold text-amber-600 dark:text-amber-400">
                    {renewableData.solarScore}%
                  </Text>
                </View>

                <View className="flex-1 rounded-xl border border-slate-200 p-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  <Text className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Wind Score
                  </Text>
                  <Text className="mt-2 text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                    {renewableData.windScore}%
                  </Text>
                </View>
              </View>

              {/* Best Hours */}
              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-md font-bold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Best Hours
                  </Text>
                  <Text className="text-sm text-slate-500 dark:text-slate-400">
                    Top {renewableData.bestHours.length}
                  </Text>
                </View>
                <View className="flex-row flex-wrap gap-2">
                  {renewableData.bestHours.map((hour) => (
                    <View
                      key={hour}
                      className="rounded-full bg-emerald-100 px-3 py-1.5 dark:bg-emerald-500/20"
                    >
                      <Text className="text-[14px] font-semibold text-emerald-700 dark:text-emerald-300">
                        {hour}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Renewable Score Footer */}
              <View className="border-t border-slate-200 pt-3 dark:border-slate-800">
                <Text className="text-lg text-slate-700 dark:text-slate-200">
                  Renewable score:{" "}
                  <Text className="font-semibold text-emerald-700 dark:text-emerald-400">
                    {renewableData.score}%
                  </Text>
                </Text>
              </View>
            </ScrollView>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

export default RenewablePopup;
