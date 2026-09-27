import { DocPage } from "../../docs.types";

export const Footprint = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Footprint: {
        title: "CO2-Fußabdruck",
        navUrl: "/docs/Footprint",
        description:
          "Verfolgen Sie die CO₂-Emissionen Ihres Haushalts, überwachen Sie Ihre Nachhaltigkeitsfortschritte, schätzen Sie zukünftige Reduktionen ab und analysieren Sie die Umweltauswirkungen Ihres Energieverbrauchs — alles in einem eigenen Dashboard.",
        breadcrumbs: ["Dokumentation", "Übersicht", "CO2-Fußabdruck"],
        sections: [
          {
            id: "overview",
            title: "Überblick",
            description:
              "Das CO2-Fußabdruck-Dashboard bietet einen vollständigen Überblick über die CO₂-Emissionen Ihres Haushalts, den Nachhaltigkeits-Score, den Reduktionsfortschritt und die Umweltauswirkungen basierend auf Ihrer Gerätenutzung. Während sich das Haupt-Dashboard auf Kosten und aktuelle Preise konzentriert, richtet diese Seite den Blick vollständig auf die ökologische Seite Ihrer Energiegewohnheiten — und hilft Ihnen zu verstehen, nicht nur was Sie ausgeben, sondern was Sie ausstoßen und wie sich das im Zeitverlauf entwickelt.",
            nav: {
              label: "Überblick",
              link: "/en/footprint",
            },
          },

          {
            id: "summary-cards",
            title: "Übersichtskarten",
            description:
              "Am oberen Rand der Seite zeigen Ihnen Übersichtskarten auf einen Blick die wichtigsten Zahlen: Ihre wöchentlichen Emissionen, monatlichen Emissionen, geschätzte CO2-Reduktion und den Gesamt-Nachhaltigkeits-Score. Diese Karten sind so gestaltet, dass sie sich in Sekunden erfassen lassen und Ihnen sofort ein Gefühl dafür geben, ob sich die Entwicklung in eine gute Richtung bewegt, bevor Sie sich in die detaillierten Diagramme weiter unten vertiefen.",
          },

          {
            id: "summary-cards-explained",
            title: "Wie sollte ich die Übersichtskarten interpretieren?",
            description:
              "Wöchentliche und monatliche Emissionen liefern Ihnen Rohwerte für einen schnellen Vergleich über Zeiträume hinweg, während die geschätzte CO2-Reduktion widerspiegelt, wie viel CO₂ Sie durch Ihre aktuellen Gewohnheiten und Planungsentscheidungen voraussichtlich einsparen werden. Der Nachhaltigkeits-Score fasst mehrere zugrunde liegende Kennzahlen zu einer einzigen, leicht nachverfolgbaren Zahl zusammen — ein steigender Score bedeutet in der Regel, dass Ihr Haushalt kontinuierliche Fortschritte hin zu einer grüneren Energienutzung macht.",
          },

          {
            id: "weekly-emissions",
            title: "Wöchentliche CO2-Emissionen",
            description:
              "Dieser Abschnitt zeigt die täglichen CO₂-Emissionen der vergangenen sieben Tage, typischerweise als Tag-für-Tag-Diagramm. So können Sie schnell Ihre Tage mit den höchsten und niedrigsten Emissionen erkennen und Muster feststellen — zum Beispiel bemerken, dass die Emissionen an einem bestimmten Tag aufgrund eines bestimmten Geräts oder einer Routine regelmäßig ansteigen —, sodass Sie Ihre wöchentlichen Trends auf einen Blick im Auge behalten können.",
          },

          {
            id: "weekly-insights",
            title: "Wöchentliche Einblicke",
            description:
              "Wöchentliche Einblicke gehen eine Ebene tiefer als das reine Diagramm und liefern Statistiken wie Ihre durchschnittlichen täglichen Emissionen, Ihren Tag mit den höchsten Emissionen, Ihren Tag mit den niedrigsten Emissionen sowie weitere unterstützende Zahlen. Diese Einblicke sollen Ihnen helfen zu verstehen, nicht nur was passiert ist, sondern warum — indem sie Emissionsspitzen oder -rückgänge mit Ihren umfassenderen wöchentlichen Energieverbrauchsmustern in Verbindung bringen.",
          },

          {
            id: "monthly-emissions",
            title: "Monatliche CO2-Emissionen",
            description:
              "Der Abschnitt Monatliche CO2-Emissionen visualisiert die täglichen CO2-Emissionen über den gesamten Monat hinweg mithilfe eines interaktiven Balkendiagramms. Der Wechsel von der Wochenansicht zu einer vollständigen Monatsansicht macht es deutlich leichter, langfristigere Emissionsmuster zu erkennen — wie saisonale Verschiebungen, allmähliche Verbesserungen im Zeitverlauf oder wiederkehrende Tage mit hohen Emissionen, die mit bestimmten wöchentlichen Routinen zusammenhängen.",
          },

          {
            id: "monthly-summary",
            title: "Monatsstatistiken",
            description:
              "Dieser Abschnitt zeigt Ihre gesamten monatlichen Emissionen, Ihre durchschnittlichen täglichen Emissionen über den Monat sowie einen prognostizierten Wert für die monatlichen Emissionen basierend auf Ihrem aktuellen Verbrauchstrend. Die Prognose ist besonders in der Monatsmitte nützlich und gibt Ihnen eine vorausschauende Einschätzung, wo Sie am Monatsende voraussichtlich stehen werden, wenn sich Ihre aktuellen Gewohnheiten nicht ändern.",
          },

          {
            id: "projection",
            title: "Prognostizierte CO2-Reduktion",
            description:
              "Der Abschnitt Prognostizierte CO2-Reduktion sagt die erwartete Verringerung der CO2-Emissionen für die kommende Woche voraus, basierend auf einer Kombination aus Ihren Entscheidungen zur Geräteplanung, Prognosen zur Verfügbarkeit erneuerbarer Energien und den eigenen Optimierungsempfehlungen von EcoWatt. Dies ist eine vorausschauende, ML-gestützte Schätzung — sie zeigt Ihnen den Nutzen, wenn Sie den Vorschlägen von EcoWatt folgen, statt lediglich zu berichten, was bereits geschehen ist.",
          },

          {
            id: "reduction-breakdown",
            title: "Aufschlüsselung der Reduktion",
            description:
              "Damit Sie besser nachvollziehen können, woher Ihre CO2-Einsparungen tatsächlich stammen, schlüsselt dieser Abschnitt die geschätzten Reduktionen in drei Kategorien auf: Intelligente Zeitplanung (Einsparungen durch den Betrieb von Geräten zu optimierten Zeiten), Nutzung erneuerbarer Energien (Einsparungen durch die Abstimmung der Nutzung mit Zeiten höherer Erzeugung erneuerbarer Energien) und Optimierung außerhalb der Spitzenlastzeiten (Einsparungen durch die Verlagerung der Nutzung weg von Zeiten mit hoher Nachfrage und hohen Emissionen). Diese Aufschlüsselung zeigt, welche Verhaltensweisen am meisten zu Ihrer Gesamtreduktion beitragen.",
          },

          {
            id: "reduction-breakdown-why-it-matters",
            title: "Warum ist die Aufschlüsselung der Reduktion wichtig?",
            description:
              "Nicht alle CO2-Einsparungen stammen aus derselben Quelle, und das Verständnis der Aufteilung zwischen Intelligenter Zeitplanung, Nutzung erneuerbarer Energien und Optimierung außerhalb der Spitzenlastzeiten hilft Ihnen zu erkennen, welche Ihrer Gewohnheiten tatsächlich zur Verbesserung beitragen. Wenn eine Kategorie durchweg niedrig ausfällt, kann dies auf eine einfache Chance hinweisen — zum Beispiel die Gerätezeiten weiter anzupassen, um sie besser mit Zeitfenstern erneuerbarer Erzeugung in Einklang zu bringen.",
          },

          {
            id: "total-reduction",
            title: "Geschätzte Gesamtreduktion",
            description:
              "Dieser Abschnitt zeigt die im ausgewählten Zeitraum (wöchentlich oder monatlich) voraussichtlich eingesparte Gesamtmenge an CO₂, visualisiert durch eine intuitive kreisförmige Fortschrittsanzeige. Er soll Ihnen eine einzige, greifbare Zahl liefern, die den kumulierten Nutzen all Ihrer Planungs- und Optimierungsbemühungen zusammen darstellt.",
          },

          {
            id: "sustainability-progress",
            title: "Nachhaltigkeitsfortschritt",
            description:
              "Der Abschnitt Nachhaltigkeitsfortschritt verfolgt mehrere wichtige langfristige Kennzahlen: die Nutzung erneuerbarer Energien (wie viel Ihres Verbrauchs mit der Erzeugung erneuerbarer Energien übereinstimmt), den Fortschritt bei CO2-Reduktionszielen (wie nah Sie an etwaigen Reduktionszielen sind, an denen Sie arbeiten), einen Grün-Energie-Score sowie eine allgemeine Energieeffizienzbewertung. Zusammen ergeben diese ein umfassendes, mehrdimensionales Bild der Nachhaltigkeitsreise Ihres Haushalts, statt sich auf eine einzelne Zahl zu verlassen.",
          },

          {
            id: "environmental-equivalents",
            title: "Umweltäquivalente",
            description:
              "Um abstrakte CO₂-Werte greifbarer und aussagekräftiger zu machen, wandelt dieser Abschnitt Ihre CO2-Einsparungen in reale Äquivalente um — wie die Anzahl der effektiv „gepflanzten“ Bäume, die vermiedene Autofahrstrecke, die Stunden an LED-Beleuchtung, die damit betrieben werden könnten, sowie weitere nachvollziehbare Nachhaltigkeitsvergleiche für den Haushalt. Diese Äquivalente sollen Ihren Fortschritt greifbar und motivierend erscheinen lassen, statt nur eine weitere Zahl in einem Diagramm zu sein.",
          },

          {
            id: "export-report",
            title: "Bericht exportieren",
            description:
              "Mit der Funktion Bericht exportieren können Sie einen detaillierten Bericht zum CO2-Fußabdruck erstellen und herunterladen, der Ihre Emissionsstatistiken, Reduktionsprognosen, Nachhaltigkeitskennzahlen und Zusammenfassungen der Umweltauswirkungen enthält. Dies ist nützlich, wenn Sie eine Offline-Aufzeichnung Ihres Fortschritts im Zeitverlauf führen, Ihre Ergebnisse mit anderen teilen oder Ihre Daten einfach außerhalb der Dashboard-Oberfläche einsehen möchten.",
          },

          {
            id: "export-report-format",
            title:
              "In welchem Format liegt der exportierte Bericht vor, und was enthält er?",
            description:
              "Der exportierte Bericht soll eine in sich geschlossene Zusammenfassung sein, die dieselben Kernkategorien wie das Dashboard abdeckt — wöchentliche und monatliche Emissionen, Aufschlüsselungen der Reduktion, Nachhaltigkeitsfortschritt und Umweltäquivalente —, gebündelt in einem einzigen Dokument, damit Sie eine vollständige Momentaufnahme Ihrer Umweltauswirkungen für den ausgewählten Zeitraum haben.",
          },

          {
            id: "refresh-recommendations",
            title: "Empfehlungen aktualisieren",
            description:
              "Die Aktion Empfehlungen aktualisieren bringt das Dashboard mit den neuesten Empfehlungen zur CO2-Reduktion auf den aktuellen Stand, indem die neuesten verfügbaren Geräteplanungen, Prognosen zu erneuerbaren Energien und Strompreisdaten einbezogen werden. Nutzen Sie dies, wann immer Sie kürzlich Ihre Geräteeinrichtung oder Ihre Planungspräferenzen geändert haben und möchten, dass die Vorschläge des Dashboards diese Änderungen sofort widerspiegeln, statt auf die nächste automatische Aktualisierung zu warten.",
          },

          {
            id: "footprint-ml-badge-note",
            title: "Welche Teile dieser Seite sind Machine-Learning-gestützt?",
            description:
              "Wie im übrigen EcoWatt wird jeder vorausschauende Wert auf dieser Seite — wie die Prognostizierte CO2-Reduktion, die prognostizierten monatlichen Emissionen und die Prognosen in der Aufschlüsselung der Reduktion — von Machine-Learning-Vorhersagen erstellt und trägt das ML-Badge. Historische Werte wie die tatsächlichen wöchentlichen und monatlichen Emissionen werden hingegen direkt aus realen Nutzungsdaten berechnet und nicht prognostiziert — es lohnt sich also, beim Lesen der Seite zwischen „Was ist passiert“-Abschnitten und „Was voraussichtlich passieren wird“-Abschnitten zu unterscheiden.",
          },
        ],
      },
    };
  } else {
    return {
      Footprint: {
        title: "Carbon Footprint",
        navUrl: "/docs/Footprint",
        description:
          "Track household carbon emissions, monitor sustainability progress, estimate future reductions, and analyze the environmental impact of your energy usage — all in one dedicated dashboard.",
        breadcrumbs: ["Docs", "Overview", "Carbon Footprint"],
        sections: [
          {
            id: "overview",
            title: "Overview",
            description:
              "The Carbon Footprint dashboard provides a complete overview of your household's CO₂ emissions, sustainability score, reduction progress, and environmental impact based on your appliance usage. Where the main Dashboard focuses on cost and live pricing, this page shifts the lens entirely toward the environmental side of your energy habits — helping you understand not just what you're spending, but what you're emitting, and how that's trending over time.",
            nav: {
              label: "Overview",
              link: "/en/footprint",
            },
          },

          {
            id: "summary-cards",
            title: "Summary Cards",
            description:
              "At the top of the page, quick-glance summary cards surface the numbers that matter most: your weekly emissions, monthly emissions, estimated carbon reduction, and overall sustainability score. These cards are designed to be understood in seconds, giving you an immediate sense of whether you're trending in a good direction before diving into the detailed charts below.",
          },

          {
            id: "summary-cards-explained",
            title: "How should I interpret the summary cards?",
            description:
              "Weekly and monthly emissions give you raw totals for quick comparison period-over-period, while estimated carbon reduction reflects how much CO₂ you're on track to save through your current habits and scheduling choices. The sustainability score condenses several underlying metrics into a single, easy-to-track number — a rising score generally means your household is making consistent progress toward greener energy use.",
          },

          {
            id: "weekly-emissions",
            title: "Weekly Carbon Emissions",
            description:
              "This section displays the daily CO₂ emissions generated over the past seven days, typically as a day-by-day chart. It allows you to quickly identify your highest and lowest emission days and spot patterns — for example, noticing that emissions consistently spike on a particular day due to a specific appliance or routine — so you can monitor your weekly trends at a glance.",
          },

          {
            id: "weekly-insights",
            title: "Weekly Insights",
            description:
              "Weekly Insights goes a layer deeper than the raw chart, surfacing statistics like your average daily emissions, your single highest emission day, your single lowest emission day, and other supporting figures. These insights are designed to help you understand not just what happened, but why — connecting emission spikes or dips back to your broader weekly energy consumption patterns.",
          },

          {
            id: "monthly-emissions",
            title: "Monthly Carbon Emissions",
            description:
              "The Monthly Carbon Emissions section visualizes daily carbon emissions across the entire month using an interactive bar chart. Zooming out from the weekly view to a full month makes it much easier to spot longer-term emission patterns — such as seasonal shifts, gradual improvement over time, or recurring high-emission days tied to specific weekly routines.",
          },

          {
            id: "monthly-summary",
            title: "Monthly Statistics",
            description:
              "This section displays your total monthly emissions, your average daily emissions across the month, and a projected monthly emissions figure based on your current usage trend. The projection is especially useful mid-month, giving you a forward-looking estimate of where you'll likely land by month's end if your current habits continue unchanged.",
          },

          {
            id: "projection",
            title: "Projected Carbon Reduction",
            description:
              "The Projected Carbon Reduction section forecasts the expected reduction in carbon emissions for the upcoming week, based on a combination of your appliance scheduling choices, renewable energy availability forecasts, and EcoWatt's own optimization recommendations. This is a forward-looking, ML-driven estimate — it shows you the payoff of following EcoWatt's suggestions rather than just reporting on what already happened.",
          },

          {
            id: "reduction-breakdown",
            title: "Reduction Breakdown",
            description:
              "To help you understand where your carbon savings are actually coming from, this section breaks estimated reductions down into three categories: Smart Scheduling (savings from running appliances at optimized times), Renewable Energy Usage (savings from aligning usage with periods of higher renewable generation), and Off-Peak Energy Optimization (savings from shifting usage away from high-demand, high-emission periods). This breakdown highlights which behaviors are contributing the most to your overall reduction.",
          },

          {
            id: "reduction-breakdown-why-it-matters",
            title: "Why does the reduction breakdown matter?",
            description:
              "Not all carbon savings come from the same source, and understanding the split between Smart Scheduling, Renewable Energy Usage, and Off-Peak Optimization helps you see which of your habits are actually driving improvement. If one category is consistently low, it may point to an easy opportunity — for example, adjusting appliance timing further to better align with renewable generation windows.",
          },

          {
            id: "total-reduction",
            title: "Total Estimated Reduction",
            description:
              "This section displays the total amount of CO₂ expected to be reduced during the selected period (weekly or monthly), visualized through an intuitive circular progress indicator. It's designed to give you a single, satisfying number that represents the cumulative payoff of all your scheduling and optimization efforts combined.",
          },

          {
            id: "sustainability-progress",
            title: "Sustainability Progress",
            description:
              "The Sustainability Progress section tracks several important long-term metrics: renewable energy utilization (how much of your usage aligns with renewable generation), carbon reduction goal progress (how close you are to any reduction targets you're working toward), a green energy score, and an overall energy efficiency rating. Together, these give a rounded, multi-dimensional view of your household's sustainability journey rather than relying on a single number.",
          },

          {
            id: "environmental-equivalents",
            title: "Environmental Equivalents",
            description:
              "To make abstract CO₂ figures more tangible and meaningful, this section converts your carbon savings into real-world equivalents — such as the number of trees effectively 'planted', the equivalent car travel distance avoided, hours of LED lighting powered, and other relatable household sustainability comparisons. These equivalents are designed to make your progress feel concrete and motivating rather than just another number on a chart.",
          },

          {
            id: "export-report",
            title: "Export Report",
            description:
              "The Export Report feature lets you generate and download a detailed carbon footprint report containing your emission statistics, reduction forecasts, sustainability metrics, and environmental impact summaries. This is useful if you want to keep an offline record of your progress over time, share your results with others, or simply review your data outside of the dashboard interface.",
          },

          {
            id: "export-report-format",
            title:
              "What format is the exported report in, and what does it include?",
            description:
              "The exported report is intended to be a self-contained summary covering the same core categories shown on the dashboard — weekly and monthly emissions, reduction breakdowns, sustainability progress, and environmental equivalents — bundled together so you have a complete snapshot of your environmental impact for the selected period in a single document.",
          },

          {
            id: "refresh-recommendations",
            title: "Refresh Recommendations",
            description:
              "The Refresh Recommendations action updates the dashboard with the latest carbon reduction recommendations, pulling in the newest appliance schedules, renewable energy forecasts, and electricity pricing data available. Use this whenever you've recently changed your appliance setup or scheduling preferences and want the dashboard's suggestions to reflect those changes immediately rather than waiting for the next automatic update.",
          },

          {
            id: "footprint-ml-badge-note",
            title: "Which parts of this page are machine-learning driven?",
            description:
              "As with the rest of EcoWatt, any forward-looking figure on this page — such as Projected Carbon Reduction, projected monthly emissions, and the reduction breakdown forecasts — is powered by machine learning predictions and carries the ML badge. Historical figures like actual weekly and monthly emissions are calculated directly from real usage data rather than predicted, so it's worth distinguishing between 'what happened' sections and 'what's expected to happen' sections as you read the page.",
          },
        ],
      },
    };
  }
};
