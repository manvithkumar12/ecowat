import { DocPage } from "../../docs.types";
import { backendApi } from "./dashboard";

export const Forecast = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Forecast: {
        title: "Prognose",
        navUrl: "/docs/Forecast",
        description:
          "Das Prognosezentrum bündelt den wöchentlichen Verbrauch, prognostizierte Kosten, CO₂-Emissionen und vorausschauende 7-Tage-Projektionen — allesamt angetrieben von den Machine-Learning-Modellen von EcoWatt.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Prognose"],
        sections: [
          {
            id: "Forecast-center",
            title: "Prognosezentrum",
            description:
              "Das Prognosezentrum enthält an einem Ort sämtliche vorausschauenden und historischen Prognosedaten von EcoWatt — wöchentlichen Verbrauch, prognostizierte Wochenkosten und CO₂-Emissionen. Während sich das Haupt-Dashboard auf das „Jetzt“ konzentriert, wurde das Prognosezentrum gezielt dafür entwickelt, Ihnen zu zeigen, wohin sich die Entwicklung in den kommenden Tagen und der kommenden Woche bewegt.",
            nav: { label: "Prognosezentrum", link: "/en/forecast" },
          },
          {
            id: "Weekly-Consumption",
            title: "Wöchentlicher Verbrauch",
            description:
              "Der wöchentliche Verbrauch zeigt die bisher in dieser Woche angefallenen Gesamtkosten, basierend auf den tatsächlich genutzten Geräten und dem jeweiligen Strompreis während ihres Betriebs. Anders als die übrigen prognostizierten Werte auf dieser Seite handelt es sich hierbei um eine tatsächliche, berechnete Summe, die den realen Verbrauch bis zum aktuellen Zeitpunkt widerspiegelt — keine Schätzung.",
            nav: { label: "Prognosedaten", link: `${backendApi}en/forecast` },
          },
          {
            id: "Predicted-Weekly-Cost",
            title: "Prognostizierte Wochenkosten",
            description:
              "Die prognostizierten Wochenkosten sind eine Schätzung Ihrer Gesamtkosten für die Woche, erstellt mithilfe eines XGBoost-Machine-Learning-Modells, das anhand Ihrer bisherigen Gerätenutzung sowie historischer Verbrauchsmuster an Wochenenden und Wochentagen trainiert wurde. Da es sich um eine Prognose und nicht um eine direkte Berechnung handelt, können die tatsächlichen Ergebnisse etwas von der Schätzung abweichen — betrachten Sie sie als fundierte Prognose und nicht als garantierten Wert.",
            nav: { label: "Prognosedaten", link: `${backendApi}en/forecast` },
          },
          {
            id: "CO-Emissions",
            title: "CO₂-Emissionen",
            description:
              "Dieser Abschnitt schätzt Ihre wöchentlichen CO₂-Emissionen mithilfe desselben XGBoost-basierten Machine-Learning-Ansatzes, der auch für die Kostenprognose verwendet wird — dabei werden Ihre historischen Gerätenutzungsmuster herangezogen, um die Umweltauswirkungen Ihres Stromverbrauchs für die Woche zu projizieren. Wie bei der Kostenprognose handelt es sich auch hier um eine Schätzung, die möglicherweise nicht exakt mit den tatsächlichen Ergebnissen übereinstimmt.",
            nav: { label: "Prognosedaten", link: `${backendApi}en/forecast` },
          },
          {
            id: "7-Day-Energy-Consumption",
            title: "7-Tage-Energieverbrauch",
            description:
              "Basierend auf Ihren Verbrauchsmustern der vergangenen Woche und der letzten Tage prognostiziert das Modell von EcoWatt Ihren voraussichtlichen Energieverbrauch für jeden der nächsten 7 Tage. Dies bietet Ihnen einen fortlaufenden, tagesgenauen Ausblick statt einer einzelnen Gesamtzahl, wodurch Sie leichter abschätzen können, an welchen konkreten kommenden Tagen mit höherem oder niedrigerem Verbrauch zu rechnen ist.",
            nav: { label: "Prognosedaten", link: `${backendApi}en/forecast` },
          },
          {
            id: "Predicted-Week-Cost",
            title: "Prognostizierte Wochenkosten (Preismodell)",
            description:
              "Diese detailliertere Kostenprognose berücksichtigt sowohl bevorstehende als auch aktuelle Temperaturdaten und Prognosen zur Erzeugung erneuerbarer Energien und speist diese in ein eigenes Machine-Learning-Preisprognosemodell ein. Temperatur und die Erzeugung erneuerbarer Energien beeinflussen die Strompreise beide erheblich, weshalb ihre Einbeziehung in der Regel zu einer differenzierteren, genaueren vorausschauenden Kostenschätzung führt als die reine Nutzungshistorie.",
            nav: {
              label: "Preisprognosemodell",
              link: `${backendApi}model/pricePrediction`,
            },
          },
          {
            id: "Predicted-Carbon-Emissions",
            title: "Prognostizierte CO₂-Emissionen",
            description:
              "Die prognostizierten CO₂-Emissionen kombinieren Ihre bisherige Emissionshistorie mit mehreren vorausschauenden Faktoren — darunter bevorstehende Temperatur- und andere Umweltdaten —, um Ihren künftigen CO2-Ausstoß zu projizieren. Wie beim Preisprognosemodell werden dabei Muster in Wetter- und Netzbedingungen genutzt, um eine genauere, kontextbezogene Emissionsprognose zu erstellen, statt sich rein auf historische Durchschnittswerte zu verlassen.",
            nav: {
              label: "Preisprognosemodell",
              link: `${backendApi}model/pricePrediction`,
            },
          },
          {
            id: "forecast-accuracy-note",
            title: "Wie genau sind die Werte auf dieser Seite?",
            description:
              "Der wöchentliche Verbrauch ist ein realer, berechneter Wert auf Basis der tatsächlichen Nutzung und keine Prognose. Alle anderen Kennzahlen auf dieser Seite — prognostizierte Wochenkosten, CO₂-Emissionen, 7-Tage-Energieverbrauch und prognostizierte CO₂-Emissionen — werden von Machine-Learning-Modellen erstellt und tragen das ML-Badge, was bedeutet, dass sie als fundierte Schätzung und nicht als garantiertes Ergebnis zu betrachten sind. Die Genauigkeit verbessert sich in der Regel, je mehr historische Daten EcoWatt zu Ihrem spezifischen Haushalt sammelt.",
          },
          {
            id: "forecast-vs-dashboard-vs-footprint",
            title:
              "Wie verhält sich das Prognosezentrum zu den Seiten Dashboard und CO2-Fußabdruck?",
            description:
              "Das Dashboard konzentriert sich auf den aktuellen Moment, das Prognosezentrum darauf, wohin sich die Entwicklung in den kommenden Tagen und der kommenden Woche bewegt, und die Seite CO2-Fußabdruck widmet sich speziell und wesentlich ausführlicher der Umweltseite dieser Geschichte. Wenn Sie einen schnellen Überblick möchten, nutzen Sie das Dashboard; wenn Sie vorausplanen, nutzen Sie das Prognosezentrum; und wenn Sie tiefer in Emissionen und Nachhaltigkeit eintauchen möchten, gehen Sie zu CO2-Fußabdruck.",
          },
        ],
      },
    };
  } else {
    return {
      Forecast: {
        title: "Forecast",
        navUrl: "/docs/Forecast",
        description:
          "The Forecast Center brings together weekly consumption, predicted costs, CO₂ emissions, and 7-day forward-looking projections — all powered by EcoWatt's machine learning models.",
        breadcrumbs: ["Docs", "Overview", "Forecast"],
        sections: [
          {
            id: "Forecast-center",
            title: "Forecast Center",
            description:
              "The Forecast Center contains all of EcoWatt's forward-looking and historical forecasting data in one place — weekly consumption, predicted weekly cost, and CO₂ emissions. Where the main Dashboard is focused on 'right now,' the Forecast Center is built specifically to help you understand where things are headed over the coming days and week.",
            nav: { label: "Forecast Center", link: "/en/forecast" },
          },
          {
            id: "Weekly-Consumption",
            title: "Weekly Consumption",
            description:
              "Weekly Consumption shows the total cost accumulated so far this week based on the appliances you've actually used and the electricity price at the time each was running. Unlike the predicted figures elsewhere on this page, this is a factual, calculated total reflecting real usage up to the current moment — not an estimate.",
            nav: { label: "Forecast data", link: `${backendApi}en/forecast` },
          },
          {
            id: "Predicted-Weekly-Cost",
            title: "Predicted Weekly Cost",
            description:
              "Predicted Weekly Cost is an estimate of your total cost for the week, generated using an XGBoost machine learning model trained on your previous appliance usage and historical weekend/weekday consumption patterns. Because this is a prediction rather than a direct calculation, actual results may vary somewhat from the estimate — treat it as a well-informed forecast rather than a guaranteed figure.",
            nav: { label: "Forecast data", link: `${backendApi}en/forecast` },
          },
          {
            id: "CO-Emissions",
            title: "CO₂ Emissions",
            description:
              "This section estimates your weekly CO₂ emissions using the same XGBoost-based machine learning approach applied to cost prediction — drawing on your historical appliance usage patterns to project the environmental impact of your electricity consumption for the week. As with the cost prediction, this is an estimate and may not perfectly match real-world outcomes.",
            nav: { label: "Forecast data", link: `${backendApi}en/forecast` },
          },
          {
            id: "7-Day-Energy-Consumption",
            title: "7-Day Energy Consumption",
            description:
              "Based on your consumption patterns from the previous week and recent days, EcoWatt's model projects your likely energy consumption for each of the next 7 days. This gives you a rolling, day-by-day outlook rather than a single aggregate number, making it easier to anticipate which specific upcoming days might see higher or lower usage.",
            nav: { label: "Forecast data", link: `${backendApi}en/forecast` },
          },
          {
            id: "Predicted-Week-Cost",
            title: "Predicted Weekly Cost (Price Model)",
            description:
              "This more detailed cost prediction factors in both upcoming and recent temperature data and renewable energy generation forecasts, feeding them into a dedicated machine learning price-prediction model. Temperature and renewable generation both influence electricity pricing significantly, so incorporating them tends to produce a more nuanced, accurate forward-looking cost estimate than usage history alone.",
            nav: {
              label: "Price prediction model",
              link: `${backendApi}model/pricePrediction`,
            },
          },
          {
            id: "Predicted-Carbon-Emissions",
            title: "Predicted Carbon Emissions",
            description:
              "Predicted Carbon Emissions combines your past emissions history with several forward-looking factors — including upcoming temperature and other environmental data — to project your future carbon output. Like the price prediction model, this leverages patterns in weather and grid conditions to produce a more accurate, context-aware emissions forecast rather than relying purely on historical averages.",
            nav: {
              label: "Price prediction model",
              link: `${backendApi}model/pricePrediction`,
            },
          },
          {
            id: "forecast-accuracy-note",
            title: "How accurate are the figures on this page?",
            description:
              "Weekly Consumption is a real, calculated figure based on actual usage and is not a prediction. Every other metric on this page — Predicted Weekly Cost, CO₂ Emissions, 7-Day Energy Consumption, and Predicted Carbon Emissions — is generated by machine learning models and carries the ML badge, meaning it should be treated as an informed estimate rather than a guaranteed outcome. Accuracy generally improves as EcoWatt accumulates more historical data on your specific household.",
          },
          {
            id: "forecast-vs-dashboard-vs-footprint",
            title:
              "How does the Forecast Center relate to the Dashboard and Carbon Footprint pages?",
            description:
              "The Dashboard focuses on the present moment, the Forecast Center focuses on where things are trending over the coming days and week, and the Carbon Footprint page focuses specifically on the environmental side of that story in much greater depth. If you want a quick check-in, use the Dashboard; if you're planning ahead, use the Forecast Center; if you want a deep dive into emissions and sustainability, head to Carbon Footprint.",
          },
        ],
      },
    };
  }
};
