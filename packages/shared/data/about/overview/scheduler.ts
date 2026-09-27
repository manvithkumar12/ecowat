import { DocPage } from "../../docs.types";

export const Scheduler = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Scheduler: {
        title: "Zeitplaner",
        navUrl: "/docs/Scheduler",
        description:
          "Auf der Seite Zeitplaner verwalten Sie jedes Gerät, das Sie für einen bestimmten Zeitpunkt eingeplant haben — sehen Sie anstehende, verpasste und abgeschlossene Läufe ein und planen Sie diese bei Bedarf um oder brechen Sie sie ab.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Zeitplaner"],
        sections: [
          {
            id: "scheduler",
            title: "Zeitplaner",
            description:
              "Die Seite Zeitplaner besteht aus allen Geräten, die Sie für einen bestimmten Zeitpunkt eingeplant haben. Statt sich manuell merken zu müssen, ein Gerät im optimalen Moment zu starten, richten Sie es hier einmal ein, und EcoWatt kümmert sich um die Nachverfolgung — Ihre anstehenden, verpassten und abgeschlossenen Läufe bleiben so an einem Ort organisiert.",
            nav: { label: "Zeitplaner", link: "/en/scheduler" },
          },
          {
            id: "use-of-scheduler",
            title: "Wofür wird der Zeitplaner verwendet?",
            description:
              "Die Seite Zeitplaner zeigt jedes Gerät an, das Sie als zeitgesteuertes Gerät eingerichtet haben — das bedeutet, Sie haben EcoWatt mitgeteilt, dass Sie beabsichtigen, dieses Gerät zu einem bestimmten Zeitpunkt zu betreiben. Diese Seite besuchen Sie, wann immer Sie einen klaren Überblick darüber möchten, was in Ihrem Haushalt genau ansteht und wann.",
          },
          {
            id: "how-it-work",
            title: "Wie funktioniert die Zeitplanung?",
            description:
              "Wenn Sie ein Gerät einplanen, teilen Sie EcoWatt mit, es als zeitgesteuertes Gerät zu behandeln, das an ein bestimmtes bevorstehendes Zeitfenster gebunden ist, statt etwas, das Sie manuell starten, wann immer es praktisch ist. Viele dieser Zeitfenster basieren auf der Seite Empfehlungen, die optimale Fenster basierend auf Preis und der Verfügbarkeit erneuerbarer Energien vorschlägt — Sie können jedoch jederzeit stattdessen eine benutzerdefinierte Zeit wählen, die zu Ihrem Zeitplan passt.",
          },
          {
            id: "creating-a-schedule",
            title: "Wie erstelle ich einen neuen Zeitplan?",
            description:
              "Sie können ein Gerät entweder direkt über die Seite Zeitplaner einplanen oder indem Sie ein vorgeschlagenes Zeitfenster von der Seite Empfehlungen übernehmen. Sobald es eingeplant ist, erscheint das Gerät in Ihrer Liste anstehender Läufe auf der Seite Zeitplaner, und Sie können dessen Status verfolgen, während sich die geplante Zeit nähert, verstreicht oder abgeschlossen wird.",
          },
          {
            id: "miss-schedule",
            title: "Was passiert, wenn ich einen Zeitplan verpasse?",
            description:
              "Wenn Sie den Betrieb eines Geräts zur geplanten Zeit verpassen, wird es nicht einfach verworfen — es wird automatisch in einen Ausstehend-Bereich verschoben, in dem Sie verpasste Geräte überprüfen und entscheiden können, ob Sie sie auf eine neue Zeit umplanen oder manuell behandeln möchten.",
          },
          {
            id: "completed-appliance",
            title: "Kann ich abgeschlossene Geräte einsehen?",
            description:
              "Ja. Am aktuellen Tag abgeschlossene Geräte erscheinen direkt auf der Seite Zeitplaner in einem Abgeschlossen-Bereich. Sobald ein Tag vergangen ist, wechselt der Verlauf abgeschlossener Geräte stattdessen auf die Seite Tracker, sodass sich der Zeitplaner auf die heutigen Aktivitäten konzentriert, während Ihr langfristiger Verlauf anderweitig zugänglich bleibt.",
            nav: { label: "Tracker-Seite", link: "/en/completed-appliance" },
          },
          {
            id: "reshedule-appliance",
            title: "Kann ich ein Gerät umplanen?",
            description:
              "Ja — jedes geplante Gerät kann auf eine andere Zeit umgeplant werden, falls sich Ihre Pläne ändern. Wählen Sie das Gerät einfach auf der Seite Zeitplaner aus und aktualisieren Sie es auf die neue, von Ihnen bevorzugte Zeit; EcoWatt behandelt es ab diesem Zeitpunkt als neu eingeplantes Gerät.",
          },
          {
            id: "delete-schedule-appliance",
            title: "Kann ich ein geplantes Gerät löschen?",
            description:
              "Ja — wenn Sie nicht mehr möchten, dass ein Gerät zur geplanten Zeit läuft, können Sie den Zeitplan direkt auf der Seite Zeitplaner vollständig löschen. Dadurch wird es aus Ihrer Liste anstehender Läufe entfernt, ohne die Registrierung des Geräts unter Meine Geräte zu beeinträchtigen; Sie können später jederzeit einen neuen Zeitplan dafür erstellen.",
          },
          {
            id: "scheduler-vs-recommendations",
            title: "Wie verhält sich der Zeitplaner zu den Empfehlungen?",
            description:
              "Auf der Seite Empfehlungen schlägt EcoWatt gute Zeiten für den Betrieb bestimmter Geräte basierend auf Preis und der Verfügbarkeit erneuerbarer Energien vor, während auf der Seite Zeitplaner diese Entscheidungen tatsächlich verwaltet werden, sobald Sie sich dafür entschieden haben. Kurz gesagt: Empfehlungen helfen Ihnen bei der Entscheidung, wann etwas laufen soll, und der Zeitplaner verfolgt und verwaltet, worauf Sie sich tatsächlich festgelegt haben.",
          },
        ],
      },
    };
  } else {
    return {
      Scheduler: {
        title: "Scheduler",
        navUrl: "/docs/Scheduler",
        description:
          "The Scheduler page is where you manage every appliance you've scheduled to run at a specific time — view upcoming, missed, and completed runs, and reschedule or cancel as needed.",
        breadcrumbs: ["Docs", "Overview", "Scheduler"],
        sections: [
          {
            id: "scheduler",
            title: "Scheduler",
            description:
              "The Scheduler page consists of all the appliances you've scheduled to run at a specific time. Rather than manually remembering to start an appliance at the ideal moment, you set it up once here and EcoWatt takes care of tracking it, keeping your upcoming, missed, and completed runs organized in one place.",
            nav: { label: "Scheduler", link: "/en/scheduler" },
          },
          {
            id: "use-of-scheduler",
            title: "What is the Scheduler used for?",
            description:
              "The Scheduler page displays every appliance you've set up as a timed appliance — meaning you've told EcoWatt you intend to run that appliance at a particular time. This is the page to visit whenever you want a clear view of exactly what's queued up to run, and when, across your household.",
          },
          {
            id: "how-it-work",
            title: "How does scheduling work?",
            description:
              "When you schedule an appliance, you're telling EcoWatt to treat it as a timed appliance tied to a specific upcoming slot rather than something you'll start manually whenever convenient. Many of these time slots are informed by the Recommendations page, which suggests optimal windows based on price and renewable availability — but you're always free to pick a custom time that suits your schedule instead.",
          },
          {
            id: "creating-a-schedule",
            title: "How do I create a new schedule?",
            description:
              "You can schedule an appliance either directly from the Scheduler page or by acting on a suggested time window from the Recommendations page. Once scheduled, the appliance appears in your upcoming list on the Scheduler page, and you'll be able to track its status as the scheduled time approaches, passes, or completes.",
          },
          {
            id: "miss-schedule",
            title: "What happens if I miss a schedule?",
            description:
              "If you miss running an appliance at its scheduled time, it isn't simply discarded — it's automatically moved into a Pending section, where you can review any missed appliances and decide whether to reschedule them for a new time or handle them manually.",
          },
          {
            id: "completed-appliance",
            title: "Can I see appliances that have been completed?",
            description:
              "Yes. Completed appliances from the current day appear in a Completed section directly on the Scheduler page. Once a day has passed, completed appliance history moves over to the Tracker page instead, so the Scheduler stays focused on today's activity while your longer-term history remains accessible elsewhere.",
            nav: { label: "Tracker Page", link: "/en/completed-appliance" },
          },
          {
            id: "reshedule-appliance",
            title: "Can I reschedule an appliance?",
            description:
              "Yes — any scheduled appliance can be rescheduled to a different time if your plans change. Simply select the appliance from the Scheduler page and update it to the new time you'd prefer; EcoWatt will treat it as a fresh timed appliance going forward.",
          },
          {
            id: "delete-schedule-appliance",
            title: "Can I delete a scheduled appliance?",
            description:
              "Yes — if you no longer want an appliance to run at its scheduled time, you can delete the schedule entirely from the Scheduler page. This removes it from your upcoming list without affecting the appliance's registration in My Appliances; you can always create a new schedule for it later.",
          },
          {
            id: "scheduler-vs-recommendations",
            title: "How does the Scheduler relate to Recommendations?",
            description:
              "The Recommendations page is where EcoWatt suggests good times to run specific appliances based on price and renewable availability, while the Scheduler page is where those decisions actually live once you've committed to them. In short: Recommendations helps you decide when to run something, and the Scheduler tracks and manages what you've actually committed to.",
          },
        ],
      },
    };
  }
};
