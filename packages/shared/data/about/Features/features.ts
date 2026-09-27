import { DocPage } from "../../docs.types";

export const Features = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Features: {
        title: "Funktionen",
        navUrl: "/docs/Features",
        description:
          "Ecowat vereint intelligente Tools zur Erfassung, Prognose und Optimierung Ihres Energieverbrauchs. Entdecken Sie die untenstehenden Funktionen und erfahren Sie, wie jede davon Ihnen hilft, Geld zu sparen, Energie effizienter zu nutzen und Ihre Umweltauswirkungen zu verringern.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Funktionen"],
        sections: [
          {
            id: "Ecky",
            title: "Ecky",
            description:
              "Ecky ist der in Ecowat integrierte KI-Chatbot-Assistent. Er beantwortet Ihre Fragen zu Energie, Strom und Nutzungsgewohnheiten und kann Live-Daten wie aktuelle Preise und die besten Zeiten für den Betrieb Ihrer Geräte anzeigen. Ecky unterstützt mehrere Sprachen und kann Geräte sogar direkt im Gespräch für Sie einplanen, wodurch er zu einem einzigen, praktischen Einstiegspunkt für alles wird, was Ecowat bietet.",
            nav: { label: "Ecky", link: "/en/ecky" },
          },
          {
            id: "Scheduler",
            title: "Zeitplaner",
            description:
              "Mit dem Zeitplaner können Sie genau festlegen, wann Ihre Geräte laufen sollen, damit Sie nie das kostengünstigste oder umweltfreundlichste Zeitfenster für deren Nutzung verpassen. Durch die Automatisierung der Gerätezeiten rund um Zeiten geringerer Auslastung und die Verfügbarkeit erneuerbarer Energien hilft er Ihnen, Stromkosten zu senken und saubere Energie besser zu nutzen, ohne dass Sie täglich darüber nachdenken müssen.",
            nav: { label: "Zeitplaner", link: "/en/scheduler" },
          },
          {
            id: "Recommendations",
            title: "Empfehlungen",
            description:
              "Ecowat analysiert die von Ihnen gespeicherten Geräte und identifiziert, welche davon gute Kandidaten für eine Umplanung oder spätere Nutzung sind. In Kombination mit Echtzeit-Preisdaten und Daten zu erneuerbaren Energien werden daraus personalisierte Empfehlungen erstellt, die Ihnen die besten Zeiten für den Betrieb jedes Geräts für maximale Einsparungen und Effizienz aufzeigen.",
            nav: { label: "Empfehlungen", link: "/en/recommendations" },
          },
          {
            id: "Tracker",
            title: "Tracker",
            description:
              "Der Tracker gibt Ihnen einen klaren Überblick über Ihren Stromverbrauch der letzten 30 Tage. Mit dieser Historie auf einen Blick können Sie Muster erkennen, verstehen, wo Ihr Verbrauch am höchsten ist, und fundierte Anpassungen vornehmen, um den Verbrauch zu senken, Ressourcen zu sparen und Ihre monatliche Rechnung zu reduzieren.",
            nav: { label: "Tracker", link: "/en/tracker" },
          },
          {
            id: "Price-Prediction",
            title: "Preisprognose",
            description:
              "Erhalten Sie eine vollständige Wochenprognose der durchschnittlichen Strompreise an einem Ort. Wenn Sie diese Prognose im Voraus einsehen, können Sie planen, wann Sie Geräte mit hohem Verbrauch betreiben, günstigere Tarife nutzen und unnötige Ausgaben vermeiden.",
            nav: { label: "Dashboard", link: "/en/dashboard" },
          },
          {
            id: "Weekly-consumption",
            title: "Wöchentlicher Verbrauch",
            description:
              "Die Prognose des wöchentlichen Verbrauchs sagt voraus, wie viel Strom Sie in den kommenden Tagen voraussichtlich verbrauchen werden. Sie zeigt außerdem, ob Ihr Verbrauch im Vergleich zu den Vorwochen steigt oder sinkt, sodass Sie Veränderungen frühzeitig erkennen und Ihre Gewohnheiten anpassen können, bevor sie sich auf Ihre Rechnung auswirken.",
            nav: { label: "Prognose", link: "/en/forecast" },
          },
          {
            id: "Renewable-Energy-Forecast",
            title: "Prognose erneuerbarer Energien",
            description:
              "Diese Funktion bietet eine wochenweise Prognose der Verfügbarkeit erneuerbarer Energien, angetrieben von Machine-Learning-Modellen. Sie umfasst separate Solar- und Wind-Scores und gibt Ihnen so ein klares Bild davon, wann saubere Energie am reichlichsten vorhanden ist, damit Sie Ihre Gerätenutzung auf die umweltfreundlichsten Stunden der Woche abstimmen können.",
            nav: { label: "Dashboard", link: "/en/dashboard" },
          },
          {
            id: "Carbon-footprint",
            title: "CO2-Fußabdruck",
            description:
              "Die Seite CO2-Fußabdruck verfolgt Ihre Umweltauswirkungen im Zeitverlauf und zeigt Ihre Fortschritte bei der Verringerung von CO2-Emissionen. Sie bietet eine einfache, visuelle Möglichkeit zu sehen, wie Ihre Entscheidungen der Umwelt helfen, und motiviert Sie, sich weiter zu verbessern.",
            nav: { label: "CO2-Fußabdruck", link: "/en/footprint" },
          },
        ],
      },
    };
  } else {
    return {
      Features: {
        title: "Features",
        navUrl: "/docs/Features",
        description:
          "Ecowat brings together smart tools for tracking, predicting, and optimizing your energy usage. Explore the features below to see how each one helps you save money, use energy more efficiently, and reduce your environmental impact.",
        breadcrumbs: ["Docs", "Overview", "Features"],
        sections: [
          {
            id: "Ecky",
            title: "Ecky",
            description:
              "Ecky is Ecowat's built-in AI chatbot assistant. It answers your questions about energy, electricity, and usage habits, and can surface live data such as current prices and the best times to run your appliances. Ecky supports multiple languages and can even schedule appliances for you directly through conversation, making it a single, convenient entry point into everything Ecowat offers.",
            nav: { label: "Ecky", link: "/en/ecky" },
          },
          {
            id: "Scheduler",
            title: "Scheduler",
            description:
              "The Scheduler lets you plan exactly when your appliances should run, so you never miss the most cost-effective or eco-friendly window to use them. By automating appliance timing around off-peak hours and renewable availability, it helps you cut electricity costs and make better use of clean energy without having to think about it every day.",
            nav: { label: "Scheduler", link: "/en/scheduler" },
          },
          {
            id: "Recommendations",
            title: "Recommendations",
            description:
              "Ecowat analyzes the appliances you've saved and identifies which ones are good candidates for rescheduling or later use. Combining this with real-time pricing and renewable energy data, it generates personalized recommendations that show you the best times to run each appliance for maximum savings and efficiency.",
            nav: { label: "Recommendations", link: "/en/recommendations" },
          },
          {
            id: "Tracker",
            title: "Tracker",
            description:
              "The Tracker gives you a clear view of your electricity usage over the past 30 days. With this history at a glance, you can spot patterns, understand where your consumption is highest, and make informed adjustments to reduce usage, save resources, and lower your monthly bill.",
            nav: { label: "Tracker", link: "/en/tracker" },
          },
          {
            id: "Price-Prediction",
            title: "Price Prediction",
            description:
              "Get a full week of predicted average electricity prices in one place. Reviewing this forecast ahead of time lets you plan when to run high-consumption appliances, helping you take advantage of cheaper rates and avoid unnecessary spending.",
            nav: { label: "Dashboard", link: "/en/dashboard" },
          },
          {
            id: "Weekly-consumption",
            title: "Weekly Consumption",
            description:
              "Weekly Consumption forecasting predicts how much electricity you're likely to use over the coming days. It also shows whether your usage is trending up or down compared to previous weeks, so you can stay ahead of changes and adjust your habits before they impact your bill.",
            nav: { label: "Forecast", link: "/en/forecast" },
          },
          {
            id: "Renewable-Energy-Forecast",
            title: "Renewable Energy Forecast",
            description:
              "This feature provides a week-ahead forecast of renewable energy availability, powered by machine learning models. It includes separate solar and wind scores, giving you a clear picture of when clean energy is most abundant so you can time your appliance usage around the greenest hours of the week.",
            nav: { label: "Dashboard", link: "/en/dashboard" },
          },
          {
            id: "Carbon-footprint",
            title: "Carbon Footprint",
            description:
              "The Carbon Footprint page tracks your environmental impact over time, showing your progress in reducing carbon emissions. It's a simple, visual way to see how your choices are helping the environment and to stay motivated to keep improving.",
            nav: { label: "Footprint", link: "/en/footprint" },
          },
        ],
      },
    };
  }
};
