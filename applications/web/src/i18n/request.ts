import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const [
    navbarMessages,
    dashboardMessages,
    forecastMessages,
    appliancesMessages,
    sidebarMessages,
    recommendationsMessages,
    scheduleMessages,
    trackerMessages,
    footprintMessages,
    priceHistoryMessages,
    profileMessages,
  ] = await Promise.all([
    import(`../../messages/${locale}/Navbar.json`),
    import(`../../messages/${locale}/dashboard.json`),
    import(`../../messages/${locale}/forecast.json`),
    import(`../../messages/${locale}/appliances.json`),
    import(`../../messages/${locale}/sidebar.json`),
    import(`../../messages/${locale}/recommendations.json`),
    import(`../../messages/${locale}/schedule.json`),
    import(`../../messages/${locale}/tracker.json`),
    import(`../../messages/${locale}/footprint.json`),
    import(`../../messages/${locale}/priceHistory.json`),
    import(`../../messages/${locale}/profile.json`),
  ]);

  return {
    locale,
    messages: {
      ...navbarMessages.default,
      ...dashboardMessages.default,
      ...forecastMessages.default,
      ...appliancesMessages.default,
      ...sidebarMessages.default,
      ...recommendationsMessages.default,
      ...scheduleMessages.default,
      ...trackerMessages.default,
      ...footprintMessages.default,
      ...priceHistoryMessages.default,
      ...profileMessages.default,
    },
  };
});
