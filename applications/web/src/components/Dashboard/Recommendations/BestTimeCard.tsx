"use client";
import RecommendationLoading from "./states/BestTime/RecommendationLoading";
import RecommendationError from "./states/BestTime/RecommendationError";
import RecommendationEmpty from "./states/BestTime/RecommendationEmpty";
import { useRecommendations } from "@/src/context/useRecommendations.Context";
import BestTimeElement from "./states/BestTime/BestTimeElement";
import { useTranslations } from "next-intl";

const BestTimeCard = () => {
  const t = useTranslations("Recommendations.bestTime");
  const {
    recommendations: Recommendations,
    isLoading,
    isError,
    refetch,
  } = useRecommendations();
  if (isLoading) {
    return <RecommendationLoading />;
  }

  if (isError) {
    const handleRetry = () => {
      void refetch?.();
    };
    return <RecommendationError handleRetry={handleRetry} />;
  }

  if (!Recommendations || Recommendations.length === 0) {
    return <RecommendationEmpty />;
  }

  return (
    <section>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-4">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Recommendations.map((rec, index) => (
          <BestTimeElement rec={rec} key={rec.appliance + index} />
        ))}
      </div>
    </section>
  );
};

export default BestTimeCard;
