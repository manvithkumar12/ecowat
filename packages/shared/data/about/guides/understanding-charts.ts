import { DocPage } from "../../docs.types";

export const UnderstandingCharts = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      UnderstandingCharts: {
        title: "Diagramme verstehen",
        navUrl: "/docs/UnderstandingCharts",
        description:
          "Ecowat visualisiert Ihre Daten anhand mehrerer Diagramme. Zu wissen, wofür jedes davon steht, hilft Ihnen, auf einen Blick mehr aus den Daten herauszuholen.",
        breadcrumbs: ["Dokumentation", "Anleitungen", "Diagramme verstehen"],
        sections: [
          {
            id: "reading-the-tracker-chart",
            title: "Das Tracker-Diagramm lesen",
            description:
              "Das Tracker-Diagramm stellt Ihren Stromverbrauch der letzten 30 Tage dar und lässt Sie Spitzen, Einbrüche und allgemeine Trends erkennen. Achten Sie auf wiederkehrende Muster, wie konstante tägliche Spitzen, um Gewohnheiten zu identifizieren, die es wert sind, angepasst zu werden.",
          },
          {
            id: "reading-the-weekly-consumption-chart",
            title: "Das Diagramm zum wöchentlichen Verbrauch lesen",
            description:
              "Dieses Diagramm vergleicht Ihren prognostizierten Verbrauch für die kommende Woche mit der jüngsten Historie, mit einer Trendlinie, die zeigt, ob der Verbrauch steigt oder sinkt. Eine stetig ansteigende Linie lohnt es sich, im Tracker genauer zu untersuchen.",
          },
          {
            id: "reading-solar-and-wind-scores",
            title: "Solar- und Wind-Scores lesen",
            description:
              "Solar- und Wind-Scores werden auf einer einfachen Skala dargestellt, um die relative Verfügbarkeit erneuerbarer Energien für jeden Wochentag anzuzeigen. Höhere Werte deuten auf bessere Bedingungen hin, um Ihren Verbrauch stärker auf saubere Energie zu verlagern.",
          },
        ],
      },
    };
  } else {
    return {
      UnderstandingCharts: {
        title: "Understanding Charts",
        navUrl: "/docs/UnderstandingCharts",
        description:
          "Ecowat visualizes your data through several charts. Knowing what each one represents helps you get more value out of the data at a glance.",
        breadcrumbs: ["Docs", "Guides", "Understanding Charts"],
        sections: [
          {
            id: "reading-the-tracker-chart",
            title: "Reading the Tracker Chart",
            description:
              "The Tracker chart plots your electricity usage over the past 30 days, letting you spot spikes, dips, and overall trends. Look for repeated patterns, like consistent daily peaks, to identify habits worth adjusting.",
          },
          {
            id: "reading-the-weekly-consumption-chart",
            title: "Reading the Weekly Consumption Chart",
            description:
              "This chart compares your predicted usage for the coming week against recent history, with a trend line showing whether consumption is increasing or decreasing. A steadily climbing line is worth investigating further in the Tracker.",
          },
          {
            id: "reading-solar-and-wind-scores",
            title: "Reading Solar & Wind Scores",
            description:
              "Solar and wind scores are shown on a simple scale to indicate relative renewable availability for each day of the week. Higher scores indicate better conditions for shifting your usage toward clean energy.",
          },
        ],
      },
    };
  }
};
