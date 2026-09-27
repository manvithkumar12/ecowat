import { DocPage } from "../../docs.types";

export const UsingRenewableEnergy = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      UsingRenewableEnergy: {
        title: "Erneuerbare Energien nutzen",
        navUrl: "/docs/UsingRenewableEnergy",
        description:
          "Ihren Stromverbrauch an der Verfügbarkeit erneuerbarer Energien auszurichten, ist eine der wirksamsten Möglichkeiten, Ihre Umweltauswirkungen zu verringern. Diese Anleitung zeigt, wie Sie die Daten von Ecowat zu erneuerbaren Energien im Alltag nutzen.",
        breadcrumbs: [
          "Dokumentation",
          "Anleitungen",
          "Erneuerbare Energien nutzen",
        ],
        sections: [
          {
            id: "check-the-weekly-forecast",
            title: "Die Wochenprognose prüfen",
            description:
              "Die Prognose erneuerbarer Energien liefert Ihnen Solar- und Wind-Scores für die kommende Woche. Prüfen Sie sie zu Wochenbeginn, um ein Gefühl dafür zu bekommen, an welchen Tagen voraussichtlich die meiste erneuerbare Energie verfügbar sein wird.",
          },
          {
            id: "match-high-draw-appliances-to-green-hours",
            title: "Geräte mit hohem Verbrauch auf grüne Stunden abstimmen",
            description:
              "Geräte, die am meisten Strom verbrauchen, wie E-Auto-Ladegeräte oder Warmwasserbereiter, profitieren am meisten davon, während Stunden mit hoher Verfügbarkeit erneuerbarer Energien betrieben zu werden. Schon eine Verschiebung um nur wenige Stunden kann den Anteil sauberer Energie an Ihrem Verbrauch spürbar erhöhen.",
          },
          {
            id: "balance-price-and-renewables",
            title: "Preis und erneuerbare Energien ausbalancieren",
            description:
              "Die günstigste Stunde und die umweltfreundlichste Stunde sind nicht immer dieselbe. Die Empfehlungen von Ecowat berücksichtigen sowohl Preis- als auch Daten zu erneuerbaren Energien gemeinsam und helfen Ihnen, eine gute Balance zu finden, statt sich für eines von beidem entscheiden zu müssen.",
          },
        ],
      },
    };
  } else {
    return {
      UsingRenewableEnergy: {
        title: "Using Renewable Energy",
        navUrl: "/docs/UsingRenewableEnergy",
        description:
          "Timing your electricity use around renewable availability is one of the most effective ways to lower your environmental impact. This guide shows how to use Ecowat's renewable data day-to-day.",
        breadcrumbs: ["Docs", "Guides", "Using Renewable Energy"],
        sections: [
          {
            id: "check-the-weekly-forecast",
            title: "Check the Weekly Forecast",
            description:
              "The Renewable Energy Forecast gives you solar and wind scores for the week ahead. Check it at the start of the week to get a sense of which days are likely to have the most renewable generation available.",
          },
          {
            id: "match-high-draw-appliances-to-green-hours",
            title: "Match High-Draw Appliances to Green Hours",
            description:
              "Appliances that use the most electricity, like EV chargers or water heaters, benefit the most from being run during high-renewable hours. Even shifting just these by a few hours can meaningfully increase the clean energy share of your usage.",
          },
          {
            id: "balance-price-and-renewables",
            title: "Balance Price and Renewables",
            description:
              "The cheapest hour and the greenest hour aren't always the same. Ecowat's Recommendations weigh both price and renewable data together, helping you find a good balance instead of having to choose one over the other.",
          },
        ],
      },
    };
  }
};
