import { DocPage } from "../../docs.types";

export const BestSchedulingPractices = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      BestSchedulingPractices: {
        title: "Bewährte Praktiken zur Zeitplanung",
        navUrl: "/docs/BestSchedulingPractices",
        description:
          "Eine gute Zeitplanung ist mehr als nur Bequemlichkeit — sie ist eine der einfachsten Möglichkeiten, dauerhaft Geld zu sparen und Ihre Umweltauswirkungen zu verringern. So holen Sie das Beste aus dem Zeitplaner von Ecowat heraus.",
        breadcrumbs: [
          "Dokumentation",
          "Anleitungen",
          "Bewährte Praktiken zur Zeitplanung",
        ],
        sections: [
          {
            id: "know-your-peak-hours",
            title: "Kennen Sie Ihre Spitzenzeiten",
            description:
              "Spitzenzeiten sind Zeiten, in denen die Stromnachfrage — und oft auch der Preis — am höchsten ist. Diese Zeitfenster für nicht dringende Geräte zu meiden, ist eine der einfachsten Möglichkeiten, Ihre Kosten zu senken.",
          },
          {
            id: "group-similar-appliances",
            title: "Ähnliche Geräte bündeln",
            description:
              "Bündeln Sie nach Möglichkeit Geräte mit ähnlichen Laufzeiten, wie eine Waschmaschine und einen Trockner, im selben geplanten Zeitfenster. Dadurch müssen Sie seltener über das Timing nachdenken, und Ihr Verbrauch konzentriert sich auf effiziente Stunden.",
          },
          {
            id: "let-recommendations-guide-you",
            title: "Lassen Sie sich von den Empfehlungen leiten",
            description:
              "Statt zu raten, lassen Sie sich von den Empfehlungen von Ecowat den besten Zeitplan basierend auf Ihren gespeicherten Geräten, aktuellen Preisen und Prognosen zu erneuerbaren Energien vorschlagen — und passen Sie ihn dann an Ihre Routine an.",
          },
        ],
      },
    };
  } else {
    return {
      BestSchedulingPractices: {
        title: "Best Scheduling Practices",
        navUrl: "/docs/BestSchedulingPractices",
        description:
          "Good scheduling is about more than convenience — it's one of the easiest ways to consistently save money and reduce your environmental impact. Here's how to get the most out of Ecowat's Scheduler.",
        breadcrumbs: ["Docs", "Guides", "Best Scheduling Practices"],
        sections: [
          {
            id: "know-your-peak-hours",
            title: "Know Your Peak Hours",
            description:
              "Peak hours are when electricity demand — and often price — is highest. Avoiding these windows for non-urgent appliances is one of the simplest ways to lower your costs.",
          },
          {
            id: "group-similar-appliances",
            title: "Group Similar Appliances",
            description:
              "Where possible, batch appliances with similar cycle times, like a washing machine and dryer, into the same scheduled window. This reduces how often you need to think about timing and keeps your usage concentrated in efficient hours.",
          },
          {
            id: "let-recommendations-guide-you",
            title: "Let Recommendations Guide You",
            description:
              "Rather than guessing, let Ecowat's Recommendations suggest the best schedule based on your saved appliances, current prices, and renewable forecasts — then fine-tune it to fit your routine.",
          },
        ],
      },
    };
  }
};
