export type ErrorType =
  | "APPLIANCES"
  | "DASHBOARD"
  | "FORECAST"
  | "FOOTPRINT"
  | "RECOMMENDATIONS"
  | "TRACKER";

export const getErrorMessage = (ErrorType: ErrorType) => {
  switch (ErrorType) {
    case "APPLIANCES":
      return "We couldn't load your appliances right now. Please check your connection and try again later.";
    case "DASHBOARD":
      return "We couldn't load Dashboard data right now. Please check your connection and try again later.";
    case "FOOTPRINT":
      return "We couldn't load Footprint data right now. Please check your connection and try again later.";
    case "RECOMMENDATIONS":
      return "We couldn't load Recommendation data right now. Please check your connection and try again later.";
    case "TRACKER":
      return "We couldn't load Tracker data right now. Please check your connection and try again later.";
    case "FORECAST":
      return "We couldn't load Forecast data right now. Please check your connection and try again later.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};
