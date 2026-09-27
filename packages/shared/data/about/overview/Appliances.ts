import { ApplianceNames } from "../../../types/EcoBot/appliances.types";
import { DocPage } from "../../docs.types";

export const Appliances = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Appliances: {
        title: "Geräte",
        navUrl: "/docs/Appliances",
        description:
          "Alles darüber, wie EcoWatt die Geräte in Ihrem Haushalt erfasst, kategorisiert und Ihnen bei deren Verwaltung hilft — von unterstützten Geräten über Gerätezustände bis hin zur Nutzungsstruktur.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Geräte"],
        sections: [
          {
            id: "Appliances",
            title: "Meine Geräte",
            description:
              "Die Seite „Meine Geräte“ ist Ihre zentrale Anlaufstelle für alles rund um Ihre Geräte. Sie bietet Ihnen eine schnelle, übersichtliche Zusammenfassung jedes bei EcoWatt registrierten Geräts sowie die wichtigsten Kennzahlen: aktueller Strompreis, Potenzial erneuerbarer Energien, heutiger Verbrauch und mehrere weitere Prognosen, die im gesamten Dashboard aufgeführt sind. Statt sich durch Rohdaten zu wühlen, ist diese Seite darauf ausgelegt, genau das anzuzeigen, was Sie brauchen, um schnelle, sichere Entscheidungen darüber zu treffen, wann und wie Sie Ihre Geräte nutzen.",
            nav: { label: "Meine Geräte", link: "/en/Appliances" },
          },
          {
            id: "supported-appliances",
            title: "Unterstützte Geräte",
            description:
              "Unterstützte Geräte sind die spezifischen Geräte, die EcoWatt derzeit überwachen und, sofern zutreffend, bei der Steuerung oder Zeitplanung unterstützen kann. Aktuell können keine benutzerdefinierten oder beliebigen Geräte außerhalb dieser unterstützten Liste hinzugefügt werden — dies ist jedoch ein aktiver Entwicklungsbereich, und in kommenden Versionen werden neue Gerätetypen hinzugefügt, während wir die Abdeckung erweitern. Wenn Sie ein bestimmtes Gerät unterstützt sehen möchten, achten Sie auf zukünftige Updates.",
          },
          {
            id: "why-limited-list",
            title:
              "Warum ist die Liste der unterstützten Geräte derzeit begrenzt?",
            description:
              "Jedes unterstützte Gerät basiert auf abgestimmter Prognoselogik und in vielen Fällen auf gerätespezifischem Planungsverhalten — dies erfordert Zeit, um für jeden Gerätetyp ordnungsgemäß entwickelt und validiert zu werden. Statt beliebige benutzerdefinierte Geräte mit generischen, potenziell ungenauen Schätzungen zuzulassen, haben wir uns entschieden, mit einer kuratierten Liste gängiger Haushaltsgeräte zu beginnen und diese im Laufe der Zeit gezielt zu erweitern, um sicherzustellen, dass die Erfahrung mit dem Wachstum genau und zuverlässig bleibt.",
          },
          {
            id: "appliances-structure",
            title: "Struktur eines Geräteeintrags",
            description:
              "Jedes bei EcoWatt registrierte Gerät wird durch vier zentrale Datenpunkte dargestellt: Name (worum es sich bei dem Gerät handelt, z. B. „Waschmaschine“), Leistung in Watt (W) (die Leistungsaufnahme des Geräts im Betrieb), Nutzung in Stunden (wie lange das Gerät typischerweise pro Sitzung oder pro Tag läuft) und täglicher Verbrauch in Kilowattstunden (kWh) (der berechnete Energieverbrauch pro Tag, abgeleitet aus Leistung und Nutzungsstunden). Zusammen ermöglichen diese vier Felder EcoWatt, für jedes Gerät Kosten, CO2-Auswirkungen und optimale Zeitfenster für die Planung zu schätzen.",
          },
          {
            id: "how-daily-usage-calculated",
            title: "Wie wird der tägliche Verbrauch (kWh) berechnet?",
            description:
              "Der tägliche Verbrauch in kWh wird aus der Leistungsaufnahme eines Geräts und seiner Laufzeit abgeleitet. Vereinfacht gesagt wird die Wattzahl in Kilowatt umgerechnet und mit der Anzahl der Stunden multipliziert, die das Gerät pro Tag genutzt wird. So erhalten Sie einen Energiewert, der anschließend mit aktuellen oder prognostizierten Strompreisen abgeglichen werden kann, um Kosten und CO2-Auswirkungen zu schätzen.",
          },
          {
            id: "what-are-appliance-states",
            title: "Was sind Gerätezustände?",
            description:
              "Jedes Gerät auf Ihrem Dashboard befindet sich in einem von fünf Zuständen, die Ihnen helfen, auf einen Blick schnell zu filtern und zu verstehen, was in Ihrem Haushalt gerade passiert:",
            list: [
              "Alle Geräte — jedes registrierte Gerät, unabhängig vom aktuellen Zustand.",
              "Aktiv — Geräte, die gerade laufen oder in Gebrauch sind.",
              "Inaktiv — Geräte, die registriert, aber derzeit nicht in Gebrauch sind.",
              "Hoher Verbrauch — Geräte, die aktuell im Vergleich zu ihrem typischen Muster einen auffällig hohen Energieverbrauch aufweisen.",
              "Optimierbar — Geräte, die EcoWatt als gute Kandidaten für eine intelligentere Zeitplanung identifiziert hat, in der Regel weil der Betrieb zu einer anderen Zeit die Kosten oder die CO2-Auswirkungen verringern könnte.",
            ],
          },
          {
            id: "appliance-state-transitions",
            title: "Wie wechseln Geräte zwischen den Zuständen?",
            description:
              "Gerätezustände werden automatisch anhand von Echtzeit-Nutzungsdaten und der laufenden Analyse von EcoWatt aktualisiert. Beispielsweise wechselt ein Gerät in den Zustand „Aktiv“, sobald es als laufend erkannt wird, und kann als „Hoher Verbrauch“ markiert werden, wenn sein Verbrauch während dieser Sitzung ungewöhnlich hoch ist. „Optimierbar“ ist ein empfehlungsgesteuerter Zustand — er wird angewendet, wenn die Modelle von EcoWatt feststellen, dass eine Verschiebung des Geräteplans die Kosten oder die Ausrichtung auf erneuerbare Energien spürbar verbessern würde.",
          },
          {
            id: "adding-an-appliance",
            title: "Wie füge ich ein Gerät hinzu?",
            description:
              "Auf der Seite Meine Geräte können Sie jedes Gerät aus der unterstützten Liste zu Ihrem Haushaltsprofil hinzufügen. Sobald es hinzugefügt wurde, bezieht EcoWatt es in die Prognosen, Planungsvorschläge, Kostenschätzungen und Berechnungen des CO2-Fußabdrucks Ihres Dashboards ein. Je genauer Sie Ihre Geräteliste aktuell halten, desto präziser werden diese Prognosen.",
          },
          {
            id: "removing-an-appliance",
            title: "Kann ich ein Gerät entfernen?",
            description:
              "Ja — wenn Sie ein bestimmtes Gerät nicht mehr besitzen oder nutzen, können Sie es jederzeit über die Seite Meine Geräte aus Ihrem Profil entfernen. Das Entfernen eines Geräts sorgt dafür, dass es nicht mehr in zukünftige Prognosen und Planungsvorschläge einbezogen wird, wobei die damit verbundenen historischen Daten als Teil Ihres gesamten Nutzungsverlaufs erhalten bleiben.",
          },
          {
            id: "supported-list-appliances",
            title: "Liste der unterstützten Geräte",
            description:
              "Nachfolgend finden Sie die aktuelle Liste der Geräte, die EcoWatt für Überwachung, Prognose und intelligente Zeitplanung unterstützt. Diese Liste wird im Laufe der Zeit weiter wachsen.",
            list: ApplianceNames,
          },
        ],
      },
    };
  } else {
    return {
      Appliances: {
        title: "Appliances",
        navUrl: "/docs/Appliances",
        description:
          "Everything about how EcoWatt tracks, categorizes, and helps you manage the appliances in your household — from supported devices to appliance states and usage structure.",
        breadcrumbs: ["Docs", "Overview", "Appliances"],
        sections: [
          {
            id: "Appliances",
            title: "My Appliances",
            description:
              "The 'My Appliances' page is your central hub for everything appliance-related. It gives you a quick, organized summary of every device you've registered with EcoWatt, along with the key numbers that matter most: live electricity price, renewable energy potential, today's consumption, and several other predictions listed throughout the dashboard. Instead of digging through raw data, this page is designed to surface exactly what you need to make quick, confident decisions about when and how to use your appliances.",
            nav: { label: "My Appliances", link: "/en/Appliances" },
          },
          {
            id: "supported-appliances",
            title: "Supported Appliances",
            description:
              "Supported appliances are the specific devices that EcoWatt is currently able to monitor and, where applicable, help control or schedule. At the moment, we don't support adding custom or arbitrary appliances outside of this supported list — but this is very much an active area of development, and new appliance types will be added in upcoming releases as we expand coverage. If there's a specific appliance you'd like to see supported, keep an eye on future updates.",
          },
          {
            id: "why-limited-list",
            title: "Why is the supported appliance list limited for now?",
            description:
              "Each supported appliance is backed by tuned prediction logic and, in many cases, appliance-specific scheduling behavior — this takes time to build and validate properly for each device type. Rather than allowing arbitrary custom appliances with generic, potentially inaccurate estimates, we've chosen to start with a curated list of common household appliances and expand it deliberately over time, ensuring the experience stays accurate and reliable as it grows.",
          },
          {
            id: "appliances-structure",
            title: "Structure of an appliance entry",
            description:
              "Every appliance registered in EcoWatt is represented using four key data points: Name (what the appliance is, e.g. 'Washing Machine'), Rating in watts (W) (the power draw of the appliance while running), Usage in hours (how long the appliance typically runs per session or per day), and Daily usage in kilowatt-hours (kWh) (the calculated energy consumption per day, derived from rating and usage hours). Together, these four fields let EcoWatt estimate cost, carbon impact, and optimal scheduling windows for each device.",
          },
          {
            id: "how-daily-usage-calculated",
            title: "How is daily usage (kWh) calculated?",
            description:
              "Daily usage in kWh is derived from an appliance's power rating and how long it runs. In simple terms, wattage is converted to kilowatts and multiplied by the number of hours the appliance is used per day, giving you an energy figure that can then be matched against live or predicted electricity prices to estimate cost and carbon impact.",
          },
          {
            id: "what-are-appliance-states",
            title: "What are appliance states?",
            description:
              "Every appliance on your dashboard falls into one of five states, which help you quickly filter and understand what's happening across your household at a glance:",
            list: [
              "All Appliances — every registered appliance, regardless of current state.",
              "Active — appliances that are currently running or in use.",
              "Inactive — appliances that are registered but not currently in use.",
              "High Usage — appliances currently consuming a notably high amount of energy relative to their typical pattern.",
              "Optimizable — appliances that EcoWatt has identified as good candidates for smarter scheduling, typically because running them at a different time could reduce cost or carbon impact.",
            ],
          },
          {
            id: "appliance-state-transitions",
            title: "How do appliances move between states?",
            description:
              "Appliance states update automatically based on real-time usage data and EcoWatt's ongoing analysis. For example, an appliance moves into 'Active' the moment it's detected as running, and may be flagged as 'High Usage' if its consumption during that session is unusually high. 'Optimizable' is a recommendation-driven state — it's applied when EcoWatt's models determine that shifting the appliance's schedule would meaningfully improve cost or renewable-energy alignment.",
          },
          {
            id: "adding-an-appliance",
            title: "How do I add an appliance?",
            description:
              "From the My Appliances page, you can add any appliance from the supported list to your household profile. Once added, EcoWatt begins factoring it into your dashboard's predictions, scheduling suggestions, cost estimates, and carbon footprint calculations. The more accurately you keep your appliance list up to date, the more precise these predictions become.",
          },
          {
            id: "removing-an-appliance",
            title: "Can I remove an appliance?",
            description:
              "Yes — if you no longer own or use a particular appliance, you can remove it from your profile at any time from the My Appliances page. Removing an appliance stops it from being factored into future predictions and scheduling suggestions, though your historical data associated with it is preserved as part of your overall usage history.",
          },
          {
            id: "supported-list-appliances",
            title: "List of Supported Appliances",
            description:
              "Below is the current list of appliances EcoWatt supports for monitoring, prediction, and smart scheduling. This list will continue to grow over time.",
            list: ApplianceNames,
          },
        ],
      },
    };
  }
};
