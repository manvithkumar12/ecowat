import React from "react";
import { ScrollView, View } from "react-native";
import RecommendationHeader from "../../components/recommendation/RecommendationHeader";
import { SummaryCards } from "../../components/recommendation/SummaryCards";
import { BestApplianceRecommendations } from "../../components/recommendation/BestApplianceRecommendations";
import { AvoidAppliances } from "../../components/recommendation/AvoidAppliances";
import {
  summaryData,
  bestApplianceRecs,
  avoidApplianceRecs,
} from "@ecowat/shared";

export default function Recommendation() {
  return (
    <ScrollView className="flex-1 bg-slate-50 p-4 dark:bg-slate-900">
      <View className="mx-auto w-full max-w-3xl rounded-2xl bg-white p-4 shadow-sm dark:bg-white/5">
        <RecommendationHeader />
        <SummaryCards data={summaryData} />
        <BestApplianceRecommendations data={bestApplianceRecs} />

        <AvoidAppliances data={avoidApplianceRecs} />
      </View>
    </ScrollView>
  );
}
