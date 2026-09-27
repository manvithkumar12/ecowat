import { info } from "./about/GettingStarted/info";
import { Installation } from "./about/GettingStarted/Installation";
import { Account } from "./about/GettingStarted/Account";
import { DocPage } from "./docs.types";
import { quickStart } from "./about/GettingStarted/quickStart";
import { Dashboard } from "./about/overview/dashboard";
import { Forecast } from "./about/overview/Forecast";
import { Appliances } from "./about/overview/Appliances";
import { Recommendations } from "./about/overview/Recommendations";
import { Scheduler } from "./about/overview/scheduler";
import { Ecky } from "./about/overview/ecky";
import { ConsumptionTracker } from "./about/overview/tracker";
import { Footprint } from "./about/overview/footprint";
import { Features } from "./about/Features/features";
import { Sustainability } from "./about/Sustainability/sustainabilitydocs";
import { SustainabilityFAQ } from "./about/Sustainability/sustainabilityfaq";
import { UnderstandingCharts } from "./about/guides/understanding-charts";
import { BestSchedulingPractices } from "./about/guides/best-scheduling-practices";
import { ReadingPredictions } from "./about/guides/reading-predictions";
import { ReduceElectricityBills } from "./about/guides/reduce-electricity-bills";
import { UsingRenewableEnergy } from "./about/guides/using-renewable-energy";

export const docsData = (
  t: "de" | "en",
): Readonly<Record<string, Record<string, DocPage>>> => ({
  Getting_Started: {
    introduction: info(t).introduction,
    installation: Installation(t).installation,
    Account: Account(t).Account,
    quickStart: quickStart(t).quickStart,
  },
  Overview: {
    Dashboard: Dashboard(t).Dashboard,
    Forecast: Forecast(t).Forecast,
    Appliances: Appliances(t).Appliances,
    Recommendations: Recommendations(t).Recommendations,
    Scheduler: Scheduler(t).Scheduler,
    Tracker: ConsumptionTracker(t).ConsumptionTracker,
    Footprint: Footprint(t).Footprint,
    Ecky: Ecky(t).Ecky,
  },
  Features: {
    Features: Features(t).Features,
  },
  Sustainability: {
    Sustainability: Sustainability(t).Sustainability,
    SustainabilityFaq: SustainabilityFAQ(t).Sustainability,
  },
  Guide: {
    UnderstandingCharts: UnderstandingCharts(t).UnderstandingCharts,
    BestSchedulingPractices: BestSchedulingPractices(t).BestSchedulingPractices,
    ReadingPredictions: ReadingPredictions(t).ReadingPredictions,
    ReduceElectricityBills: ReduceElectricityBills(t).ReduceElectricityBills,
    UsingRenewableEnergy: UsingRenewableEnergy(t).UsingRenewableEnergy,
  },
});
