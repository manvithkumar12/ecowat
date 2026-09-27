import { DocPage } from "../../docs.types";

export const ConsumptionTracker = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      ConsumptionTracker: {
        title: "Tracker",
        navUrl: "/docs/Tracker",
        description:
          "Behalten Sie den Gerätenergieverbrauch, die täglichen Stromkosten, den historischen Verbrauch und die aktuellen Netzpreise im Blick — mit einer vollständigen 30-Tage-Historie der Stromaktivitäten Ihres Haushalts.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Tracker"],
        sections: [
          {
            id: "overview",
            title: "Überblick",
            description:
              "Der Verbrauchstracker bietet eine vollständige Historie zu Gerätenergieverbrauch, Stromkosten, Einsparungen und aktuellen Strompreisen. Statt Ihnen nur eine Momentaufnahme des heutigen Tages zu zeigen, fungiert er als durchsuchbares Protokoll — Sie können frühere Geräteaktivitäten für jedes erfasste Datum innerhalb der letzten 30 Tage einsehen, sodass Sie leicht zurückblicken und genau nachvollziehen können, wie sich der Stromverbrauch Ihres Haushalts entwickelt hat.",
            nav: {
              label: "Verbrauchstracker",
              link: "/en/consumption-tracker",
            },
          },
          {
            id: "summary",
            title: "Übersichtskarten",
            description:
              "Am oberen Rand der Seite bieten Ihnen Übersichtskarten einen sofortigen Überblick: die heutigen Stromkosten, die über die letzten 30 Tage angefallenen Gesamtkosten, geschätzte Einsparungen im Vergleich zum Standardtarif sowie die Gesamtzahl der für das aktuell ausgewählte Datum erfassten Geräteprotokolle. Diese Karten sollen die häufigsten Fragen auf einen Blick beantworten, bevor Sie sich in die detaillierten Protokolle weiter unten vertiefen.",
          },
          {
            id: "date-selection",
            title: "Prüfzeitraum",
            description:
              "Mit der Steuerung des Prüfzeitraums können Sie jedes erfasste Datum innerhalb der letzten 30 Tage auswählen. Die Auswahl eines anderen Datums lädt automatisch die Gerätenutzungsprotokolle, Energieverbrauchswerte und zugehörigen Stromkosten für diesen bestimmten Tag neu — der Tracker wird so zu einem tagesgenauen Prüfwerkzeug statt nur einer Live-Ansicht des heutigen Tages.",
          },
          {
            id: "why-30-days",
            title: "Warum ist die Historie auf 30 Tage begrenzt?",
            description:
              "Das 30-Tage-Fenster schafft eine Balance zwischen einer aussagekräftigen, umsetzbaren Historie und einer schnellen, auf aktuelle, relevante Trends fokussierten Prüfansicht. Für langfristigere Muster — etwa Monat-zu-Monat- oder saisonale Trends — bieten die Seiten Prognosezentrum und CO2-Fußabdruck ergänzende monatliche Ansichten neben diesen tagesgenauen Details.",
          },
          {
            id: "appliance-logs",
            title: "Genutzte Geräte",
            description:
              "Der Abschnitt Genutzte Geräte listet jedes am ausgewählten Datum genutzte Gerät auf, einschließlich Laufzeit, verbrauchter Energie (kWh), geschätzter Stromkosten, geplanter Dauer und weiterer Nutzungsdetails. Dies ist die detaillierteste Ansicht im Tracker — statt nur einer Tagessumme erhalten Sie eine vollständige Aufschlüsselung, welche Geräte genau in welchem Umfang zu dieser Summe beigetragen haben. Historische Geräteprotokolle bleiben für das gesamte 30-Tage-Fenster zugänglich.",
          },
          {
            id: "historical-records",
            title: "Historischer Verbrauch",
            description:
              "Der historische Verbrauch speichert Gerätenutzungsdaten der letzten 30 Tage und ermöglicht es Ihnen, tägliche Energieverbrauchstrends im Zeitverlauf zu überprüfen und zu vergleichen. So lassen sich Veränderungen im Stromverbrauch des Haushalts leicht erkennen — zum Beispiel ein allmählicher Anstieg des täglichen Verbrauchs oder die Bestätigung, dass eine kürzliche Verhaltensänderung den Verbrauch tatsächlich wie beabsichtigt gesenkt hat.",
          },
          {
            id: "grid-price",
            title: "Aktueller Netzpreis",
            description:
              "Dieser Abschnitt zeigt den aktuellsten Strompreis an, der direkt vom Energieversorger abgerufen wird. Dieser aktuelle Preis ist derselbe Wert, der auch an anderen Stellen in EcoWatt verwendet wird, um Betriebskosten von Geräten zu schätzen und die Planungs- und Empfehlungslogik anzutreiben — was Sie hier sehen, stimmt also stets mit den Zahlen überein, die den Rest der Plattform antreiben.",
          },
          {
            id: "add-log",
            title: "Geräteprotokoll hinzufügen",
            description:
              "Wenn die Nutzung eines Geräts nicht automatisch erkannt wurde, können Sie sie manuell über die Funktion Geräteprotokoll hinzufügen erfassen — geben Sie einfach das Gerät, seine Betriebsdauer und alle relevanten Nutzungsdetails an. Neu hinzugefügte Protokolle werden sofort in die Verbrauchsstatistiken, Kostenberechnungen und Übersichtskarten dieses Tages einbezogen, sodass Ihre Aufzeichnungen genau und vollständig bleiben.",
          },
          {
            id: "when-to-add-a-log-manually",
            title: "Wann muss ich ein Protokoll manuell hinzufügen?",
            description:
              "Die manuelle Protokollierung ist in Situationen nützlich, in denen ein Gerät nicht automatisch von der Überwachung durch EcoWatt erfasst wird — zum Beispiel, wenn ein Gerät nur kurz genutzt wurde, außerhalb seines normal registrierten Musters verwendet wurde, oder wenn Sie einfach eine Nutzung erfassen möchten, die stattfand, bevor Sie ein Gerät für die automatische Erfassung verbunden haben. Das manuelle Hinzufügen stellt sicher, dass Ihre Tagessummen und historischen Aufzeichnungen genau bleiben.",
          },
          {
            id: "cost-calculation",
            title: "Kostenberechnung",
            description:
              "Die Stromkosten im Tracker werden berechnet, indem der erfasste Energieverbrauch des Geräts mit dem zum Zeitpunkt der Protokollierung geltenden aktuellen Strompreis kombiniert wird. Das bedeutet, die Kosten spiegeln die tatsächlichen Preisbedingungen zum Zeitpunkt des Gerätebetriebs wider, statt eines pauschalen oder gemittelten Tarifs, und geben Ihnen so ein genaueres Bild davon, was jede einzelne Gerätenutzung tatsächlich gekostet hat.",
          },
          {
            id: "savings",
            title: "Einsparungsanalyse",
            description:
              "Die Einsparungsanalyse vergleicht Ihren optimierten Energieverbrauch mit dem, was Sie bei einem standardmäßigen, nicht optimierten Stromtarif bezahlt hätten, und schätzt die insgesamt über die letzten 30 Tage erzielten finanziellen Einsparungen. Dieser Wert soll den realen Nutzen der Planungs- und Empfehlungsfunktionen von EcoWatt greifbar machen — er zeigt Ihnen konkret, wie viel Ihnen ein intelligenteres Timing tatsächlich erspart hat.",
          },
          {
            id: "tracker-vs-dashboard-vs-forecast",
            title:
              "Wie verhält sich der Tracker zum Dashboard und zum Prognosezentrum?",
            description:
              "Das Dashboard zeigt Ihnen, was gerade jetzt passiert, das Prognosezentrum blickt nach vorne, um vorherzusagen, was als Nächstes kommt, und der Tracker blickt zurück — er gibt Ihnen ein geprüftes, tagesgenaues historisches Protokoll darüber, was genau in den letzten 30 Tagen geschehen ist. Zusammen decken diese drei Seiten die Gegenwart, die Zukunft und die Vergangenheit des Stromverbrauchs Ihres Haushalts ab.",
          },
        ],
      },
    };
  } else {
    return {
      ConsumptionTracker: {
        title: "Tracker",
        navUrl: "/docs/Tracker",
        description:
          "Monitor appliance energy usage, daily electricity costs, historical consumption, and live grid pricing — with a full 30-day audit trail of your household's electricity activity.",
        breadcrumbs: ["Docs", "Overview", "Tracker"],
        sections: [
          {
            id: "overview",
            title: "Overview",
            description:
              "The Consumption Tracker provides a complete history of appliance energy usage, electricity costs, savings, and live electricity prices. Rather than only showing you today's snapshot, it acts as a searchable log — you can review previous appliance activity for any recorded date within the last 30 days, making it easy to look back and understand exactly how your household's electricity usage has evolved.",
            nav: {
              label: "Consumption Tracker",
              link: "/en/consumption-tracker",
            },
          },
          {
            id: "summary",
            title: "Summary Cards",
            description:
              "At the top of the page, summary cards give you an immediate snapshot: today's electricity cost, total cost accumulated over the previous 30 days, estimated savings compared to the standard tariff, and the total number of appliance logs recorded for the currently selected date. These cards are designed to answer the most common questions at a glance before you dig into the detailed logs below.",
          },
          {
            id: "date-selection",
            title: "Audit Period",
            description:
              "The Audit Period control lets you select any recorded date within the previous 30 days. Selecting a different date automatically reloads the appliance usage logs, energy consumption figures, and associated electricity costs for that specific day — turning the Tracker into a day-by-day audit tool rather than just a live view of today.",
          },
          {
            id: "why-30-days",
            title: "Why is history limited to 30 days?",
            description:
              "The 30-day window strikes a balance between giving you meaningful, actionable history and keeping the audit view fast and focused on recent, relevant trends. For longer-term patterns — such as month-over-month or seasonal trends — the Forecast Center and Carbon Footprint pages provide complementary monthly views alongside this day-level detail.",
          },
          {
            id: "appliance-logs",
            title: "Used Appliances",
            description:
              "The Used Appliances section lists every appliance used on the selected date, including its runtime, energy consumed (kWh), estimated electricity cost, scheduled duration, and other usage details. This is the most granular view available on the Tracker — rather than just a daily total, you get a full breakdown of exactly which appliances contributed to that total and by how much. Historical appliance logs remain accessible for the full 30-day window.",
          },
          {
            id: "historical-records",
            title: "Historical Consumption",
            description:
              "Historical Consumption stores appliance usage records for the previous 30 days, letting you review and compare daily energy consumption trends over time. This makes it easy to spot changes in household electricity usage — for example, noticing a gradual increase in daily consumption, or confirming that a recent change in habits has actually reduced usage as intended.",
          },
          {
            id: "grid-price",
            title: "Current Grid Price",
            description:
              "This section displays the latest live electricity price retrieved directly from the utility provider. This live price is the same figure used elsewhere across EcoWatt to estimate appliance operating costs and to power scheduling and recommendation logic, so what you see here is always consistent with the numbers driving the rest of the platform.",
          },
          {
            id: "add-log",
            title: "Add Appliance Log",
            description:
              "If an appliance's usage wasn't automatically detected, you can manually record it using the Add Appliance Log feature — simply specify the appliance, its operating duration, and any relevant usage details. Newly added logs are immediately factored into that day's consumption statistics, cost calculations, and summary cards, so your records stay accurate and complete.",
          },
          {
            id: "when-to-add-a-log-manually",
            title: "When would I need to add a log manually?",
            description:
              "Manual logging is useful in situations where an appliance isn't automatically tracked by EcoWatt's monitoring — for example, if a device was used briefly, used outside its normal registered pattern, or if you simply want to record usage that happened before you connected an appliance for automatic tracking. Adding it manually ensures your daily totals and historical records stay accurate.",
          },
          {
            id: "cost-calculation",
            title: "Cost Calculation",
            description:
              "Electricity costs on the Tracker are calculated by combining the recorded appliance energy consumption with the live electricity price available at the time of logging. This means costs reflect the actual price conditions at the moment an appliance ran, rather than a flat or averaged rate, giving you a more accurate picture of what each appliance session genuinely cost.",
          },
          {
            id: "savings",
            title: "Savings Analysis",
            description:
              "Savings Analysis compares your optimized energy usage against what you would have paid under a standard, non-optimized electricity tariff, estimating the total monetary savings achieved over the previous 30 days. This figure is designed to make the real-world value of following EcoWatt's scheduling and recommendation features tangible — showing you, in concrete terms, how much smarter timing has actually saved you.",
          },
          {
            id: "tracker-vs-dashboard-vs-forecast",
            title:
              "How does the Tracker relate to the Dashboard and Forecast Center?",
            description:
              "The Dashboard shows you what's happening right now, the Forecast Center looks forward to predict what's coming next, and the Tracker looks backward — giving you an audited, day-by-day historical record of exactly what happened over the past 30 days. Together, these three pages cover the present, the future, and the past of your household's electricity usage.",
          },
        ],
      },
    };
  }
};
