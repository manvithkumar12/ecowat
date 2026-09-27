import { DocPage } from "../../docs.types";

export const backendApi = "http://localhost:3000/api/";

export const Dashboard = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Dashboard: {
        title: "Dashboard",
        navUrl: "/docs/Dashboard",
        description:
          "Ein vollständiger Überblick über das EcoWatt-Dashboard — Ihre Ansicht auf einen Blick für aktuelle Strompreise, das Potenzial erneuerbarer Energien, den heutigen Verbrauch und Kostenprognosen.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Dashboard"],
        sections: [
          {
            id: "creation-of-account",
            title: "Überblick",
            description:
              "Das Dashboard bietet eine schnelle, gebündelte Zusammenfassung aller wichtigsten Komponenten rund um den Stromverbrauch Ihres Haushalts, damit Sie alles an einem Ort finden, ohne sich durch mehrere Seiten klicken zu müssen. Dazu gehören der aktuelle Strompreis, das Potenzial erneuerbarer Energien, der heutige Verbrauch, die geschätzten wöchentlichen Kosten sowie weitere Prognosen, die in den folgenden Abschnitten näher beschrieben werden. Betrachten Sie es als den einen Bildschirm, den Sie jeden Morgen aufrufen würden, um zu verstehen, wie sich Ihr Energieverbrauch entwickelt.",
            nav: { label: "Dashboard", link: "/en/dashboard" },
          },
          {
            id: "Current-Price",
            title: "Aktueller Preis",
            description:
              "Der Abschnitt Aktueller Preis zeigt den aktuellen Strompreis für Deutschland, der in Echtzeit von der aWATTar-Marktdaten-API bezogen wird. So erhalten Sie ein genaues, stündlich aktualisiertes Bild davon, was Strom gerade tatsächlich kostet — die Grundlage für alle kostensparenden Planungsvorschläge, die EcoWatt an anderer Stelle in der App macht.",
            nav: {
              label: "aWATTar Marktdaten-API",
              link: "https://api.awattar.de/v1/marketdata",
            },
          },
          {
            id: "current-price-why-it-matters",
            title: "Warum ist der aktuelle Preis wichtig?",
            description:
              "Strompreise auf dynamischen Märkten wie dem deutschen können im Tagesverlauf je nach Angebot und Nachfrage, einschließlich der Erzeugung erneuerbarer Energien, erheblich schwanken. Die Kenntnis des aktuellen Preises ermöglicht Ihnen sofortige, fundierte Entscheidungen — zum Beispiel eine Wäscheladung um eine Stunde zu verschieben, wenn die Preise gerade hoch sind, oder sie sofort zu starten, wenn die Preise ungewöhnlich niedrig sind.",
          },
          {
            id: "Renewable-Potential",
            title: "Potenzial erneuerbarer Energien",
            description:
              "Der Abschnitt Potenzial erneuerbarer Energien schätzt, wie viel des aktuellen und kurzfristigen Stromangebots wahrscheinlich aus erneuerbaren Quellen stammt, basierend auf aktuellen Wetterdaten — insbesondere kurzwelliger Strahlung (ein Indikator für das Solarerzeugungspotenzial), Bewölkung und Windgeschwindigkeit, bezogen von der Open-Meteo-Prognose-API für Deutschland. Ein höheres Potenzial erneuerbarer Energien bedeutet im Allgemeinen, dass der von Ihnen genutzte Strom sauberer ist. Diese Kennzahl hilft Ihnen also, Ihren Verbrauch nicht nur nach Kosten, sondern auch nach Umweltauswirkungen zu timen.",
            nav: {
              label: "Open-Meteo Prognose-API",
              link: "https://api.open-meteo.com/v1/forecast?latitude=51.1657&longitude=10.4515&hourly=shortwave_radiation,cloud_cover,wind_speed_10m&forecast_days=1",
            },
          },
          {
            id: "renewable-potential-explained",
            title: "Wie wird das Potenzial erneuerbarer Energien berechnet?",
            description:
              "Das Potenzial erneuerbarer Energien wird aus Wetterbedingungen abgeleitet, die sich direkt auf die Solar- und Winderzeugung auswirken — nämlich, wie viel Sonnenlicht den Boden erreicht (kurzwellige Strahlung), wie stark die Bewölkung diesen solaren Ertrag verringert, und wie stark die Windgeschwindigkeiten für die Winderzeugung sind. Durch die Kombination dieser Faktoren erstellt EcoWatt eine Schätzung davon, wie „grün“ das Stromnetz zu einer bestimmten Stunde voraussichtlich ist, ohne direkten Zugriff auf den internen Erzeugungsmix des Netzes zu benötigen.",
          },
          {
            id: "Todays-Consumption",
            title: "Heutiger Verbrauch",
            description:
              "Der heutige Verbrauch bezieht Daten direkt von Ihren registrierten Geräten über das Backend von EcoWatt, um genau anzuzeigen, wie viel Strom Ihr Haushalt heute bereits verbraucht hat. Dieser Wert wird aktualisiert, sobald neue Gerätenutzungsdaten eingehen, und liefert Ihnen so eine laufende Summe statt einer Schätzung am Tagesende, sodass Sie Ihr Verhalten bei Bedarf in Echtzeit anpassen können.",
            nav: {
              label: "Gerätenutzungsdaten",
              link: `${backendApi}used-appliance/get`,
            },
          },
          {
            id: "todays-consumption-breakdown",
            title:
              "Kann ich eine Aufschlüsselung des heutigen Verbrauchs nach Gerät sehen?",
            description:
              "Der heutige Verbrauch auf dem Haupt-Dashboard zeigt die Gesamtsumme des Haushalts, während eine detailliertere Aufschlüsselung pro Gerät auf der Seite Meine Geräte verfügbar ist — dort wird die individuelle Nutzung, der Status (Aktiv, Inaktiv, Hoher Verbrauch, Optimierbar) und der tägliche kWh-Beitrag jedes Geräts separat erfasst.",
          },
          {
            id: "Weekly-Cost",
            title: "Geschätzte wöchentliche Kosten",
            description:
              "Der Wert für die geschätzten wöchentlichen Kosten wird mithilfe eines Machine-Learning-Prognosemodells (XGBoost) erstellt, das Ihre bisherigen Nutzungsmuster analysiert, um Ihre voraussichtlichen Stromkosten für die kommende Woche vorherzusagen. Statt eines einfachen Durchschnitts wählt das Modell die am besten passenden Werte basierend darauf, wie sich Ihr Haushalt in der Vergangenheit tatsächlich verhalten hat — die Schätzung wird also umso persönlicher, je länger Sie EcoWatt nutzen.",
            nav: {
              label: "Gerätenutzungsdaten",
              link: `${backendApi}used-appliance/get`,
            },
          },
          {
            id: "weekly-cost-accuracy",
            title: "Wie genau ist die Prognose der wöchentlichen Kosten?",
            description:
              "Da die geschätzten wöchentlichen Kosten von einem Machine-Learning-Modell erstellt werden (erkennbar am ML-Badge), sollten sie als fundierte Prognose und nicht als Garantie betrachtet werden. Die Genauigkeit verbessert sich in der Regel, je mehr historische Nutzungsdaten für Ihren Haushalt vorliegen — bei einem brandneuen Konto verfeinert sich diese Schätzung im Laufe der ersten Nutzungswochen von selbst.",
          },
          {
            id: "dashboard-refresh",
            title: "Wie oft wird das Dashboard aktualisiert?",
            description:
              "Live-Datenpunkte wie der aktuelle Preis und das Potenzial erneuerbarer Energien aktualisieren sich automatisch in regelmäßigen Abständen, um mit den realen Markt- und Wetterdaten übereinzustimmen, während Verbrauchs- und Kostenwerte aktualisiert werden, sobald neue Gerätenutzungsdaten an das Backend gemeldet werden. In der Regel müssen Sie die Seite nicht manuell aktualisieren, um aktuelle Informationen zu sehen.",
          },
          {
            id: "dashboard-vs-other-pages",
            title:
              "Wie verhält sich das Dashboard zu anderen Seiten wie Geräte oder CO2-Fußabdruck?",
            description:
              "Das Dashboard ist bewusst als übergeordnete Zusammenfassung konzipiert — es ist der schnellste Weg, um sich über die Energiesituation Ihres Haushalts zu informieren. Für tiefere Details schlüsselt die Seite Meine Geräte alles gerätespezifisch auf, und die Seite CO2-Fußabdruck konzentriert sich speziell auf Emissionen, Nachhaltigkeitsbewertung und Umweltauswirkungen. Zusammen bilden diese Seiten eine gestaffelte Ansicht: schnelle Zusammenfassung im Dashboard, gerätespezifische Details unter Meine Geräte und Umweltdetails im CO2-Fußabdruck.",
          },
        ],
      },
    };
  } else {
    return {
      Dashboard: {
        title: "Dashboard",
        navUrl: "/docs/Dashboard",
        description:
          "A complete breakdown of the EcoWatt dashboard — your at-a-glance view of live electricity pricing, renewable potential, today's consumption, and cost predictions.",
        breadcrumbs: ["Docs", "Overview", "Dashboard"],
        sections: [
          {
            id: "creation-of-account",
            title: "Overview",
            description:
              "The dashboard is a quick, unified summary of every component that matters most about your household's electricity usage, designed so you can access everything in one place without digging through multiple pages. This includes the live electricity price, renewable energy potential, today's consumption, estimated weekly cost, and several other predictions detailed in the sections below. Think of it as the single screen you'd check each morning to understand how your energy usage is shaping up.",
            nav: { label: "Dashboard", link: "/en/dashboard" },
          },
          {
            id: "Current-Price",
            title: "Current Price",
            description:
              "The Current Price section shows the live electricity price for Germany, sourced in real time from the aWATTar market data API. This gives you an accurate, up-to-the-hour picture of what electricity actually costs right now, which is the foundation for all of EcoWatt's cost-saving and scheduling suggestions elsewhere in the app.",
            nav: {
              label: "aWATTar market data API",
              link: "https://api.awattar.de/v1/marketdata",
            },
          },
          {
            id: "current-price-why-it-matters",
            title: "Why does the current price matter?",
            description:
              "Electricity prices in dynamic markets like Germany's can fluctuate significantly throughout the day based on demand and supply, including renewable generation. Knowing the current price lets you make immediate, informed decisions — for example, delaying a load of laundry by an hour if prices are currently high, or running it right away if prices are unusually low.",
          },
          {
            id: "Renewable-Potential",
            title: "Renewable Potential",
            description:
              "The Renewable Potential section estimates how much of the current and near-term electricity supply is likely coming from renewable sources, based on live weather data — specifically shortwave radiation (a proxy for solar generation potential), cloud cover, and wind speed, pulled from the Open-Meteo forecast API for Germany. Higher renewable potential generally means the electricity you're using is cleaner, so this metric helps you time usage not just for cost, but for environmental impact as well.",
            nav: {
              label: "Open-Meteo forecast API",
              link: "https://api.open-meteo.com/v1/forecast?latitude=51.1657&longitude=10.4515&hourly=shortwave_radiation,cloud_cover,wind_speed_10m&forecast_days=1",
            },
          },
          {
            id: "renewable-potential-explained",
            title: "How is renewable potential calculated?",
            description:
              "Renewable potential is derived from weather conditions that directly affect solar and wind generation — namely how much sunlight is reaching the ground (shortwave radiation), how much cloud cover is reducing that solar input, and how strong wind speeds are for wind generation. By combining these factors, EcoWatt produces an estimate of how 'green' the grid is likely to be at a given hour, without needing direct access to the grid's internal generation mix.",
          },
          {
            id: "Todays-Consumption",
            title: "Today's Consumption",
            description:
              "Today's Consumption pulls data directly from your registered appliances via EcoWatt's backend to show exactly how much electricity your household has used so far today. This figure updates as appliance usage data comes in, giving you a running total rather than an end-of-day estimate, so you can course-correct your habits in real time if needed.",
            nav: {
              label: "Appliance usage data",
              link: `${backendApi}used-appliance/get`,
            },
          },
          {
            id: "todays-consumption-breakdown",
            title: "Can I see a breakdown of today's consumption by appliance?",
            description:
              "Today's Consumption on the main dashboard gives you the household total, while a more detailed per-appliance breakdown is available on the My Appliances page — where each device's individual usage, state (Active, Inactive, High Usage, Optimizable), and daily kWh contribution is tracked separately.",
          },
          {
            id: "Weekly-Cost",
            title: "Estimated Weekly Cost",
            description:
              "The Estimated Weekly Cost figure is generated using a machine learning prediction model (XGBoost) that analyzes your previous usage patterns to forecast your likely electricity spend for the coming week. Rather than a simple average, the model selects the best-fitting values based on how your household has actually behaved historically, making the estimate more personalized the longer you use EcoWatt.",
            nav: {
              label: "Appliance usage data",
              link: `${backendApi}used-appliance/get`,
            },
          },
          {
            id: "weekly-cost-accuracy",
            title: "How accurate is the weekly cost prediction?",
            description:
              "Since the Estimated Weekly Cost is powered by a machine learning model (as indicated by the ML badge), it should be treated as an informed forecast rather than a guarantee. Accuracy generally improves the more historical usage data is available for your household — a brand-new account will see this estimate refine itself over the first few weeks of regular use.",
          },
          {
            id: "dashboard-refresh",
            title: "How often does the dashboard update?",
            description:
              "Live data points like Current Price and Renewable Potential refresh automatically at regular intervals to stay aligned with real-world market and weather data, while consumption and cost figures update as new appliance usage data is reported to the backend. You generally don't need to manually refresh the page to see current information.",
          },
          {
            id: "dashboard-vs-other-pages",
            title:
              "How does the Dashboard relate to other pages like Appliances or Carbon Footprint?",
            description:
              "The Dashboard is intentionally a high-level summary — it's the fastest way to check in on your household's energy situation. For deeper detail, the My Appliances page breaks things down device by device, and the Carbon Footprint page focuses specifically on emissions, sustainability scoring, and environmental impact. Together, these pages form a layered view: quick summary on the Dashboard, appliance-level detail on My Appliances, and environmental detail on Carbon Footprint.",
          },
        ],
      },
    };
  }
};
