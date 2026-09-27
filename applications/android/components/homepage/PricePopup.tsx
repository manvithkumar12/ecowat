import { Modal, View, Text, Pressable, ScrollView } from "react-native";

const PricePopup = ({
  hourlyPriceVisible,
  setHourlyPriceVisible,
  currentPriceData,
  averagePrice,
  isLoading,
  isError,
  onRetry,
}: {
  hourlyPriceVisible: boolean;
  setHourlyPriceVisible: (visible: boolean) => void;
  currentPriceData: any;
  averagePrice: number;
  isLoading: boolean;
  isError: boolean;
  onRetry?: () => void;
}) => {
  const formatGermanTime = (value: number) =>
    new Intl.DateTimeFormat("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Berlin",
    }).format(new Date(value));

  const formatHourRange = (start: number, end: number) =>
    `${formatGermanTime(start)} - ${formatGermanTime(end)}`;

  const getPriceStatus = (
    price: number,
    averagePrice: number,
    isCurrent: boolean,
  ) => {
    if (isCurrent) {
      return "Current";
    }
    if (price >= averagePrice * 1.25) {
      return "Peak";
    }
    if (price <= averagePrice * 0.9) {
      return "Cheap";
    }
    return "Normal";
  };
  return (
    <Modal
      visible={hourlyPriceVisible}
      transparent
      animationType="fade"
      onRequestClose={() => setHourlyPriceVisible(false)}
    >
      <View className="flex-1 bg-black/55 px-5 justify-center">
        <View className="rounded-3xl bg-white p-4 dark:bg-[#0F172A]">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-xl font-semibold text-[#0F172A] dark:text-[#F8FAFC]">
                Hourly Price
              </Text>
              <Text className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Hour ranges and their corresponding price.
              </Text>
            </View>
            <Pressable
              onPress={() => setHourlyPriceVisible(false)}
              className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
            >
              <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                Close
              </Text>
            </Pressable>
          </View>

          <View className="mt-4 flex-row border-b border-slate-200 pb-2 dark:border-slate-800">
            <Text className="flex-[1.6] text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Time Window
            </Text>
            <Text className="w-28 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Price (EUR/kWh)
            </Text>
            <Text className="w-20 text-right text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Status
            </Text>
          </View>

          {isLoading ? (
            <View className="mt-3 space-y-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between rounded-2xl border border-slate-100 px-3 py-3 dark:border-slate-800"
                >
                  <View className="h-4 w-28 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <View className="h-4 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <View className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
                </View>
              ))}
              <View className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <View className="h-4 w-52 rounded-full bg-slate-200 dark:bg-slate-700" />
                <View className="mt-2 h-3 w-40 rounded-full bg-slate-200 dark:bg-slate-700" />
              </View>
            </View>
          ) : isError ? (
            <View className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-500/20 dark:bg-rose-500/10">
              <Text className="text-sm font-semibold text-rose-700 dark:text-rose-300">
                Could not load hourly prices.
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
                  onPress={() => setHourlyPriceVisible(false)}
                  className="rounded-full bg-slate-100 px-3 py-2 dark:bg-slate-800"
                >
                  <Text className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Close
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <>
              <ScrollView className="mt-2" style={{ maxHeight: 420 }}>
                {currentPriceData?.hourlyPrices.map((item: any) => (
                  <View
                    key={`${item.start}-${item.end}`}
                    className="flex-row items-center border-b border-slate-100 py-3 dark:border-slate-800"
                  >
                    <Text className="flex-[1.6] text-sm text-slate-700 dark:text-slate-200">
                      {formatHourRange(item.start, item.end)}
                    </Text>
                    <Text className="w-28 text-right text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                      {item.price.toFixed(4)}
                    </Text>
                    <View className="w-20 items-end">
                      {(() => {
                        const status = getPriceStatus(
                          item.price,
                          averagePrice,
                          item.start === currentPriceData?.currentSlot.start &&
                            item.end === currentPriceData?.currentSlot.end,
                        );

                        const statusStyles =
                          status === "Current"
                            ? "bg-sky-100 dark:bg-sky-500 text-sky-700 dark:text-sky-300"
                            : status === "Cheap"
                              ? "bg-emerald-100 dark:bg-emerald-500 text-emerald-700 dark:text-emerald-300"
                              : status === "Peak"
                                ? "bg-rose-100 dark:bg-rose-500 text-rose-700 dark:text-rose-300"
                                : "bg-slate-100 dark:bg-slate-80 text-slate-700 dark:text-slate-300";

                        return (
                          <View
                            className={`rounded-full px-2 py-1 ${statusStyles}`}
                          >
                            <Text className="text-[11px] font-semibold">
                              {status}
                            </Text>
                          </View>
                        );
                      })()}
                    </View>
                  </View>
                ))}
              </ScrollView>

              <View className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
                <Text className="text-sm text-slate-700 dark:text-slate-200">
                  Average (Next 24h):{" "}
                  <Text className="font-semibold">
                    {averagePrice.toFixed(4)} EUR/kWh
                  </Text>
                </Text>
                <Text className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Source: aWATTar (EPEX Spot Market)
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PricePopup;
