import { DocPage } from "../../docs.types";

export const ReduceElectricityBills = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      ReduceElectricityBills: {
        title: "Stromrechnung senken",
        navUrl: "/docs/ReduceElectricityBills",
        description:
          "Ihre Stromrechnung zu senken, muss nicht bedeuten, weniger Strom zu verbrauchen — oft reicht es, ihn zur richtigen Zeit zu nutzen. Diese Anleitung zeigt praktische Wege, wie Sie mit den Tools von Ecowat Ihre Rechnung senken können.",
        breadcrumbs: ["Dokumentation", "Anleitungen", "Stromrechnung senken"],
        sections: [
          {
            id: "track-before-you-cut",
            title: "Erst verfolgen, dann kürzen",
            description:
              "Beginnen Sie mit dem Tracker, um genau zu sehen, wofür Sie in den letzten 30 Tagen Strom verbraucht haben. Herauszufinden, welche Geräte oder Gewohnheiten den größten Anteil an Ihrem Verbrauch ausmachen, erleichtert es erheblich, gezielte Änderungen vorzunehmen, die Ihre Rechnung tatsächlich senken.",
          },
          {
            id: "shift-usage-to-cheaper-hours",
            title: "Verbrauch in günstigere Stunden verlagern",
            description:
              "Die Strompreise ändern sich im Laufe des Tages und der Woche. Prüfen Sie die Preisprognose, um die günstigsten Stunden im Voraus zu erkennen, und betreiben Sie Geräte mit hohem Verbrauch wie Waschmaschinen oder Warmwasserbereiter während dieser Zeitfenster statt in den Spitzenzeiten.",
          },
          {
            id: "automate-with-scheduler",
            title: "Mit dem Zeitplaner automatisieren",
            description:
              "Sobald Sie die besten Zeiten für den Betrieb Ihrer Geräte kennen, nutzen Sie den Zeitplaner, um dies zu automatisieren. Einmal eingerichtet, übernimmt Ecowat das Timing, sodass Sie bei jedem Zyklus sparen, ohne sich daran erinnern zu müssen, es manuell zu tun.",
          },
        ],
      },
    };
  } else {
    return {
      ReduceElectricityBills: {
        title: "Reduce Electricity Bills",
        navUrl: "/docs/ReduceElectricityBills",
        description:
          "Reducing your electricity bill doesn't have to mean using less power — it often just means using it at the right time. This guide walks through practical ways to lower your bill using Ecowat's tools.",
        breadcrumbs: ["Docs", "Guides", "Reduce Electricity Bills"],
        sections: [
          {
            id: "track-before-you-cut",
            title: "Track Before You Cut",
            description:
              "Start with the Tracker to see exactly where your electricity goes over the past 30 days. Identifying which appliances or habits drive the biggest share of your usage makes it much easier to target changes that will actually lower your bill.",
          },
          {
            id: "shift-usage-to-cheaper-hours",
            title: "Shift Usage to Cheaper Hours",
            description:
              "Electricity prices change throughout the day and week. Check Price Prediction to see the cheapest hours ahead of time, and run high-consumption appliances like washing machines or water heaters during those windows instead of peak hours.",
          },
          {
            id: "automate-with-scheduler",
            title: "Automate With Scheduler",
            description:
              "Once you know the best times to run your appliances, use the Scheduler to automate it. Set it once and let Ecowat handle the timing, so you save on every cycle without having to remember to do it manually.",
          },
        ],
      },
    };
  }
};
