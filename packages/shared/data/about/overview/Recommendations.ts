import { DocPage } from "../../docs.types";

export const Recommendations = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Recommendations: {
        title: "Empfehlungen",
        navUrl: "/docs/Recommendations",
        description:
          "Das Empfehlungszentrum schlägt die besten Zeiten vor, um Ihre planbaren Geräte laufen zu lassen — basierend auf aktuellen Preisen, der Verfügbarkeit erneuerbarer Energien und dem möglichen Einsparpotenzial.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Empfehlungen"],
        sections: [
          {
            id: "recommendation",
            title: "Empfehlungen",
            description:
              "Im Empfehlungszentrum verwandelt EcoWatt Rohdaten in umsetzbare Vorschläge. Es bündelt Daten zum wöchentlichen Verbrauch, zu den prognostizierten Wochenkosten und zu den CO₂-Emissionen und nutzt sie, um konkrete Zeitfenster zu empfehlen, in denen Sie Ihre Geräte für die beste Kombination aus Kosteneinsparung und Umweltnutzen betreiben sollten.",
            nav: { label: "Empfehlungen", link: "/en/recommendations" },
          },
          {
            id: "Potential-Savings",
            title: "Mögliche Einsparungen",
            description:
              "Mögliche Einsparungen stellen den finanziellen und ökologischen Vorteil dar, den Sie durch das Befolgen der Empfehlungen von EcoWatt erzielen können. Indem Sie die Gerätenutzung in die hier vorgeschlagenen Zeitfenster verlagern, verringern Sie sowohl Ihre Stromkosten als auch Ihre Abhängigkeit von nicht erneuerbarer Erzeugung — diese Empfehlungen dienen genau dazu, zu optimieren, wann und wie Sie Ihre Geräte betreiben.",
          },
          {
            id: "Recommendations-work",
            title: "Wie funktionieren die Empfehlungen?",
            description:
              "Empfehlungen werden erstellt, indem in etwa die nächsten 24 Stunden an Strompreisen zusammen mit der Verfügbarkeit erneuerbarer Energien analysiert werden. Nicht jedes Gerät kommt dafür infrage — nur Geräte, die realistisch umgeplant werden können (zum Beispiel eine Waschmaschine oder ein Geschirrspüler, im Gegensatz zu etwas, das durchgehend laufen muss), werden berücksichtigt. EcoWatt filtert nicht umplanbare Geräte von vornherein heraus, sodass nur wirklich umsetzbare Vorschläge in Ihre Empfehlungsliste gelangen.",
          },
          {
            id: "which-appliances-qualify",
            title: "Welche Geräte kommen für Empfehlungen infrage?",
            description:
              "Nur Geräte, die als umplanbar gekennzeichnet sind, werden in die Empfehlungs-Engine einbezogen. Wenn ein Gerät realistischerweise zu einer festen Zeit oder durchgehend laufen muss (wie zum Beispiel ein Kühlschrank), erscheint es hier nicht, da eine Verschiebung seines Zeitplans keinen praktischen Sinn ergäbe. So bleibt die Seite Empfehlungen ausschließlich auf Geräte fokussiert, bei denen der Zeitpunkt tatsächlich eine Rolle spielt und geändert werden kann.",
          },
          {
            id: "Components-structure",
            title: "Struktur einer Empfehlung",
            description:
              "Jede einzelne Empfehlung setzt sich aus sechs zentralen Datenpunkten zusammen: Bestes Zeitfenster (der empfohlene Zeitraum für den Betrieb des Geräts), Anteil erneuerbarer Energien (%) (wie viel des Stroms in diesem Zeitfenster voraussichtlich aus erneuerbaren Quellen stammt), Energiepreis (kWh) (der erwartete Preis pro Kilowattstunde in diesem Zeitfenster), Geschätzte Kosten (Währung/kWh) (die prognostizierten Kosten für den Betrieb des Geräts in diesem Zeitfenster), Öko-Score (%) (ein kombinierter Wert, der widerspiegelt, wie günstig dieses Zeitfenster insgesamt ist), und Einsparungen (berechnet im Vergleich zum sofortigen Betrieb des Geräts zum aktuellen Zeitpunkt).",
          },
          {
            id: "Eco-Score",
            title: "Was ist der Öko-Score?",
            description:
              "Der Öko-Score ist ein einzelner, kombinierter Prozentwert, der vom Empfehlungsalgorithmus erstellt wird und sowohl den Strompreis als auch die Verfügbarkeit erneuerbarer Ressourcen für ein bestimmtes Zeitfenster berücksichtigt. Betrachten Sie ihn als eine Kurzform dafür, wie günstig dieses Zeitfenster insgesamt ist — je höher der Öko-Score, desto stärker empfiehlt EcoWatt, das Gerät in diesem spezifischen Zeitfenster statt zu einem anderen Zeitpunkt zu betreiben.",
          },
          {
            id: "reading-savings",
            title: "Wie wird der Einsparungswert berechnet?",
            description:
              "Der für jede Empfehlung angezeigte Einsparungswert wird im Vergleich zum sofortigen Betrieb des Geräts zum aktuellen Zeitpunkt berechnet, statt auf das vorgeschlagene Zeitfenster zu warten. Dies liefert Ihnen einen direkten, konkreten Vergleich — er zeigt genau, wie viel Sie (an Kosten und oft auch an Emissionen) sparen würden, wenn Sie abwarten und stattdessen das empfohlene Zeitfenster nutzen, statt das Gerät sofort laufen zu lassen.",
          },
          {
            id: "avoid-appliances",
            title: "Geräte, die (gerade) vermieden werden sollten",
            description:
              "Dieser Abschnitt kennzeichnet Geräte, deren Betrieb im aktuellen oder kurzfristigen Zeitraum ausdrücklich nicht empfohlen wird, basierend auf ungünstigen Preisen und einer geringen Verfügbarkeit erneuerbarer Energien zu diesem Zeitpunkt. Er ist im Grunde das Gegenstück zur Haupt-Empfehlungsliste — statt Ihnen zu sagen, wann Sie etwas betreiben sollten, warnt er Sie, wann Sie es nicht tun sollten, und hilft Ihnen so, die teuersten oder CO2-intensivsten Zeitfenster zu vermeiden.",
          },
          {
            id: "acting-on-recommendations",
            title: "Wie setze ich eine Empfehlung um?",
            description:
              "Sobald Sie ein empfohlenes Zeitfenster sehen, das Sie nutzen möchten, können Sie das entsprechende Gerät direkt für diese Zeit planen, wodurch es als zeitgesteuertes Gerät an die Seite Zeitplaner übermittelt wird. Von dort aus verfolgt EcoWatt es bis zum Abschluss, genau wie jedes andere geplante Gerät.",
            nav: { label: "Zeitplaner", link: "/en/scheduler" },
          },
        ],
      },
    };
  } else {
    return {
      Recommendations: {
        title: "Recommendations",
        navUrl: "/docs/Recommendations",
        description:
          "The Recommendations center suggests the best times to run your schedulable appliances based on live pricing, renewable availability, and potential savings.",
        breadcrumbs: ["Docs", "Overview", "Recommendations"],
        sections: [
          {
            id: "recommendation",
            title: "Recommendations",
            description:
              "The Recommendations center is where EcoWatt turns raw data into actionable suggestions. It brings together weekly consumption, predicted weekly cost, and CO₂ emissions data, then uses it to recommend specific windows of time in which to run your appliances for the best combination of cost savings and environmental benefit.",
            nav: { label: "Recommendations", link: "/en/recommendations" },
          },
          {
            id: "Potential-Savings",
            title: "Potential Savings",
            description:
              "Potential Savings represent the cost and environmental benefit you stand to gain by following EcoWatt's recommendations. By shifting appliance usage to the windows suggested here, you reduce both your electricity spend and your reliance on non-renewable generation — these recommendations exist specifically to help optimize when and how you run your appliances.",
          },
          {
            id: "Recommendations-work",
            title: "How do recommendations work?",
            description:
              "Recommendations are generated by analyzing roughly the next 24 hours of electricity prices alongside renewable energy availability. Not every appliance is eligible for this — only appliances that can realistically be rescheduled (for example, a washing machine or dishwasher, as opposed to something that must run continuously) are considered. EcoWatt filters out non-reschedulable appliances up front, so only genuinely actionable suggestions make it into your Recommendations list.",
          },
          {
            id: "which-appliances-qualify",
            title: "Which appliances are eligible for recommendations?",
            description:
              "Only appliances flagged as reschedulable are included in the recommendation engine. If an appliance realistically needs to run at a fixed time or continuously (such as a refrigerator), it won't appear here, since shifting its schedule wouldn't make practical sense. This keeps the Recommendations page focused only on appliances where timing genuinely matters and can be changed.",
          },
          {
            id: "Components-structure",
            title: "Recommendation Structure",
            description:
              "Each individual recommendation is built from six key data points: Best Window (the recommended time range to run the appliance), Renewable Share (%) (how much of the electricity during that window is expected to come from renewable sources), Energy Price (kWh) (the expected price per kilowatt-hour during that window), Estimated Cost (currency/kWh) (the projected cost of running the appliance in that window), Eco Score (%) (a combined score reflecting how favorable that window is overall), and Savings (calculated relative to running the appliance right now, at the current time).",
          },
          {
            id: "Eco-Score",
            title: "What is the Eco Score?",
            description:
              "The Eco Score is a single combined percentage generated by the recommendation algorithm, factoring in both electricity price and renewable resource availability for a given time window. Think of it as a shorthand for how favorable that window is overall — the higher the Eco Score, the more strongly EcoWatt recommends running that appliance during that specific window rather than at another time.",
          },
          {
            id: "reading-savings",
            title: "How is the Savings figure calculated?",
            description:
              "The Savings value shown for each recommendation is calculated relative to running the appliance right now, at the current moment, rather than waiting for the suggested window. This gives you a direct, concrete comparison — showing exactly how much you'd save (in cost, and often in emissions) by holding off and using the recommended time slot instead of running the appliance immediately.",
          },
          {
            id: "avoid-appliances",
            title: "Appliances to avoid (right now)",
            description:
              "This section flags appliances that are specifically not recommended to run during the current or near-term period, based on unfavorable pricing and low renewable availability at that time. It's essentially the inverse of the main recommendations list — instead of telling you when to run something, it warns you when not to, helping you avoid the most costly or carbon-intensive windows.",
          },
          {
            id: "acting-on-recommendations",
            title: "How do I act on a recommendation?",
            description:
              "Once you see a recommended window you'd like to use, you can schedule the relevant appliance for that time directly, which sends it over to the Scheduler page as a timed appliance. From there, EcoWatt tracks it through to completion just like any other scheduled appliance.",
            nav: { label: "Scheduler", link: "/en/scheduler" },
          },
        ],
      },
    };
  }
};
