import React, { useState } from "react";
import { ScrollView, View, useColorScheme } from "react-native";
import { FootprintHeader } from "../../components/footprint/FootprintHeader";
import { FootprintSummaryCards } from "../../components/footprint/FootprintSummaryCards";
import { EnvironmentalEquivalents } from "../../components/footprint/EnvironmentalEquivalents";
import { WeeklyCarbonEmissions } from "../../components/footprint/MonthlyCarbonEmissions";

export default function FootprintScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const colorScheme = useColorScheme();

  const backgroundColor = colorScheme === "dark" ? "#020617" : "#f8fafc";

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor }}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full flex-1 gap-6 px-4 py-6">
        <FootprintHeader
          isRefreshing={isRefreshing}
          onRefresh={handleRefresh}
          onExport={() => null}
        />

        <FootprintSummaryCards />

        <EnvironmentalEquivalents />

        <WeeklyCarbonEmissions />
      </View>
    </ScrollView>
  );
}
