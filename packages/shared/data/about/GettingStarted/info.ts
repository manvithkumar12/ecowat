import { DocPage } from "../../docs.types";

export const info = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      introduction: {
        title: "Einführung",
        navUrl: "/docs/introduction",
        description:
          "Willkommen in der EcoWatt-Dokumentation. Hier erfahren Sie alles darüber, was EcoWatt ist, warum es existiert, wie es funktioniert und wie Sie es optimal nutzen. Erstellen Sie moderne, umweltfreundliche Prognoseerlebnisse für Energie mit vorformatierten, sofort einsetzbaren Komponenten und lernen Sie die Philosophie hinter dem Projekt kennen.",
        breadcrumbs: ["Dokumentation", "Erste Schritte", "Einführung"],
        alert: {
          text: "EcoWatt bietet jetzt eine native Android-App für mobile Nutzer. Installieren Sie sie über den untenstehenden Link für ein flüssigeres, app-ähnliches Erlebnis.",
          linkText: "App installieren",
          linkHref: "/docs/theming",
        },
        sections: [
          {
            id: "what-is-ecowat",
            title: "Was ist EcoWatt?",
            description:
              "EcoWatt ist eine KI-basierte Plattform zum Strom- und Ressourcensparen, die den Energiealltag intelligenter, günstiger und umweltfreundlicher macht. Sie vereint intelligente Geräteplanung, den KI-Chatbot Ecky, ein personalisiertes Dashboard sowie die Live-Verfolgung von Strompreisen und der Verfügbarkeit erneuerbarer Energie mit kurzfristigen Prognosen. EcoWatt soll Menschen dabei unterstützen, nachhaltige und planvolle Gewohnheiten beim Energieverbrauch aufzubauen – denn bedeutende Umweltveränderungen beginnen beim Einzelnen. Schon ein Haushalt, der unnötigen Verbrauch reduziert, erzeugt einen positiven Dominoeffekt. Wenn viele Menschen diese Gewohnheiten übernehmen, wird der gemeinsame Einfluss auf Stromnetze und Umwelt erheblich.",
          },
          {
            id: "why-ecowat",
            title: "Warum EcoWatt statt anderer Plattformen nutzen?",
            description:
              "Im Bereich Strom- und Energiemanagement gibt es zwar andere Plattformen, doch EcoWatt verfolgt einen deutlich anderen Ansatz.",
            list: [
              "Tiefe statt Breite: Viele Plattformen versuchen, gleichzeitig eine große Zahl an Ländern und Regionen zu unterstützen. EcoWatt konzentriert sich stattdessen darauf, für einen kleineren, gut verstandenen Markt hervorragende Arbeit zu leisten.",
              "Alles aus einer Hand statt fragmentiert: Manche Plattformen zeigen nur Live-Preise, andere bieten nur Geräteplanung oder nur einen Chatbot. EcoWatt vereint alle drei Bereiche zu einem stimmigen Gesamterlebnis.",
              "Proaktiv statt nur informativ: Statt Ihnen lediglich einen niedrigeren Preis zu zeigen, schlägt EcoWatt die Gerätenutzung automatisch auf Basis von Preis und verfügbarer erneuerbarer Energie vor – und kann sie bei aktivierter Funktion auch planen.",
              "Sicherheit an erster Stelle: Auch wenn das Projekt als Studierendenprojekt begann, wurden Sicherheit und der Schutz von Nutzerdaten nie nachrangig behandelt. Passwörter werden gehasht, und der Datenzugriff ist strikt auf den jeweiligen Nutzer beschränkt.",
              "Mit klarer Absicht entwickelt: EcoWatt wurde nicht bloß als technische Übung erstellt, sondern rund um ein tatsächlich beobachtetes Problem. Die Funktionen wurden danach gestaltet, was Haushalten wirklich hilft, Verschwendung und Kosten zu reduzieren.",
            ],
          },
          {
            id: "security-terms",
            title: "Welche Sicherheitsmaßnahmen verwendet EcoWatt?",
            description:
              "EcoWatt nimmt Sicherheit ernst, auch wenn die Plattform keine hochsensiblen Finanz- oder Gesundheitsdaten verarbeitet. Passwörter werden niemals im Klartext gespeichert, sondern vor dem Speichern gehasht. Selbst im unwahrscheinlichen Fall eines Datenlecks wäre Ihr tatsächliches Passwort daher nicht offengelegt. Die gespeicherten Daten sind bewusst begrenzt: Profildaten, tägliche Stromverbrauchswerte, registrierte Geräte und speziell für Ihr Konto erzeugte Modellprognosen. EcoWatt erhebt oder speichert keine weiterreichenden personenbezogenen Daten wie Ausweisnummern, Zahlungskartennummern oder einen präzisen Standortverlauf. Andere Nutzer können weder Ihren Verbrauch noch Ihre Geräte oder Prognosen einsehen.",
          },
          {
            id: "data-retention",
            title: "Wie lange werden meine Daten gespeichert?",
            description:
              "Ihre Daten werden gespeichert, solange Ihr Konto aktiv ist. Wenn Sie Ihr Konto löschen, beginnt eine 30-tägige Kulanzfrist, in der Ihre Daten erhalten bleiben, falls Sie Ihr Konto wiederherstellen möchten. Danach werden sie dauerhaft aus unseren Systemen gelöscht. Vollständige Informationen zum Lösch- und Wiederherstellungsprozess finden Sie in der Kontodokumentation.",
          },
          {
            id: "api-public",
            title: "Sind die APIs öffentlich?",
            description:
              "Derzeit nicht. Aktuell werden weder interne Daten noch APIs von EcoWatt öffentlich bereitgestellt. Der Zugriff ist individuell auf jeden authentifizierten Nutzer beschränkt, und es gibt keine allgemein nutzbare öffentliche API. Für eine spätere Version ist jedoch eine offene, entwicklerorientierte API geplant. Sie wird es anderen Entwicklern erleichtern, auf EcoWatts Prognosen, Preisdaten und Planungslogik aufzubauen und eigene Tools sowie Integrationen zu entwickeln.",
          },
          {
            id: "who-invented-ecowat",
            title: "Wer hat EcoWatt entwickelt?",
            description:
              "EcoWatt wurde von Manvith eigenständig als persönliches Projekt entwickelt. Das Thema wurde gewählt, nachdem es als reales Problem in Deutschland erkannt worden war: Variable Strompreise und die Verfügbarkeit erneuerbarer Energie machen es besonders wertvoll, den eigenen Verbrauch zeitlich zu steuern. Das Projekt deckt außerdem ein breites Spektrum an Fähigkeiten ab – von KI-/ML-Integration bis zur Sicherheit von Full-Stack-Anwendungen. So entstand sowohl ein sinnvolles Produkt als auch eine wertvolle persönliche Lernreise.",
          },
          {
            id: "owner-info",
            title: "Über den Entwickler",
            description:
              "Manvith ist ein Entwickler mit Leidenschaft für innovative, benutzerfreundliche Anwendungen. Sein besonderes Interesse gilt künstlicher Intelligenz und maschinellem Lernen sowie Projekten, die in der realen Welt positive Wirkung entfalten. Seine Reise begann in der Webentwicklung. Nachdem er dort eine solide Grundlage aufgebaut hatte, zog ihn KI zunehmend an – insbesondere die Herausforderung, etwas wirklich Interaktives und Hilfreiches zu entwickeln. Dieses wachsende Interesse an KI prägte EcoWatt letztlich zu der KI-gestützten Plattform, die es heute ist. Über das unten verlinkte Portfolio können Sie mehr über Manvith erfahren und Kontakt aufnehmen.",
            nav: {
              label: "Portfolio besuchen",
              link: "https://portfolio-two-orpin-gh4czncw4j.vercel.app",
            },
          },
          {
            id: "core-features",
            title: "Kernfunktionen",
            list: [
              "KI-gestützter Stromassistent (Ecky) – beantwortet Fragen zu Verbrauch, Preisen und Einsparmöglichkeiten in verständlicher Sprache.",
              "Intelligente Geräteplanung – plant die Gerätenutzung automatisch in günstigere und sauberere Stromzeitfenster.",
              "Live-Überwachung der Strompreise – Echtzeit-Einblick in aktuelle und kurzfristig erwartete Strompreise.",
              "Verfolgung der Verfügbarkeit erneuerbarer Energie – zeigt, wann das Stromnetz einen höheren Anteil erneuerbarer Energie nutzt.",
              "Prognose des Stromverbrauchs – durch maschinelles Lernen erstellte Vorhersagen Ihres bevorstehenden Verbrauchs.",
              "Personalisiertes Dashboard – eine zentrale Ansicht mit Verbrauch, Kosten, Einsparungen und Empfehlungen.",
              "Analyse des Energieverbrauchs – historische Trends und Aufschlüsselungen zur besseren Einordnung Ihrer Gewohnheiten.",
              "Schätzung des CO₂-Fußabdrucks – eine Einschätzung der Umweltwirkung Ihres Stromverbrauchs.",
              "Kostenprognose – vorausschauende Schätzungen Ihrer voraussichtlichen Stromrechnung.",
              "Sichere Nutzerauthentifizierung – gehashte Passwörter, Anmeldung per Magic Link und kontobeschränkter Datenzugriff.",
            ],
          },
          {
            id: "feature-deep-dive-ecky",
            title: "Genauer betrachtet: Ecky, der KI-Assistent",
            description:
              "Ecky ist der integrierte KI-Chatbot von EcoWatt und als freundlicher, jederzeit verfügbarer Begleiter für Ihre Energiedaten konzipiert. Statt Diagramme und Einstellungen durchsuchen zu müssen, können Sie Ecky einfach fragen, wann heute der günstigste Zeitpunkt für Ihre Waschmaschine ist, wie Ihr Verbrauch diese Woche im Vergleich zur letzten Woche ausfällt oder was eine ungewöhnlich hohe Prognose verursacht. Ecky basiert auf denselben Prognosemodellen wie das übrige Dashboard. Deshalb bleiben seine Antworten konsistent mit den Informationen, die Sie an anderer Stelle in der App sehen.",
          },
          {
            id: "feature-deep-dive-scheduling",
            title: "Genauer betrachtet: Intelligente Geräteplanung",
            description:
              "Die intelligente Planung geht über das bloße Anzeigen eines Preisdiagramms hinaus. Sobald Sie ein Gerät und dessen typisches Nutzungsverhalten registriert haben, wertet EcoWatt bevorstehende Preis- und Verfügbarkeitsfenster für erneuerbare Energie automatisch aus und schlägt den optimalen Zeitraum für den Betrieb dieses Geräts vor – oder wendet ihn, falls aktiviert, automatisch an. Das System lenkt Sie standardmäßig zu guten Entscheidungen, statt permanente Aufmerksamkeit zu verlangen.",
          },
          {
            id: "design-principles",
            title: "Gestaltungsprinzipien",
            description:
              "EcoWatt orientiert sich an wenigen, konsequenten Prinzipien: Die Oberfläche soll auch für technisch nicht versierte Nutzer zugänglich sein; der Einsatz von KI und die Verlässlichkeit ihrer Prognosen sollen transparent dargestellt werden; Vorschläge sollen bevorzugt werden, die zugleich Geld sparen und die Umwelt schonen; außerdem haben Sicherheit und Privatsphäre der Nutzerdaten auf jeder Ebene Priorität.",
          },
          {
            id: "ml-icon",
            title: "Wofür steht das ML-Abzeichen?",
            description:
              "In der gesamten App sehen Sie neben bestimmten Funktionen ein kleines ML-Abzeichen bzw. -Symbol. Dieses Abzeichen zeigt an, dass die Funktion ein Modell des maschinellen Lernens nutzt, um ihr Ergebnis zu erzeugen – meist eine Prognose oder Empfehlung statt einer gesicherten Tatsache. Diese Ergebnisse sind Schätzungen und keine Garantien. Sie sollten als hilfreiche Empfehlung betrachtet werden, nicht als etwas, auf das man sich uneingeschränkt verlassen sollte.",
          },
          {
            id: "ecowat-always-correct",
            title: "Liegt EcoWatt immer richtig?",
            description:
              "Nein – und darüber möchten wir offen sein. Jede mit dem ML-Abzeichen gekennzeichnete Funktion wird von einem Modell des maschinellen Lernens betrieben und hat wie jedes solche Modell eine gewisse Fehlerquote. Unser Ziel ist es, die Genauigkeit fortlaufend zu verbessern. Bereits jetzt wurde viel Arbeit in die Abstimmung dieser Modelle investiert, damit sie zuverlässige Prognosen liefern. Dennoch empfehlen wir, KI-gestützte Ergebnisse als fundierte Orientierung für Ihre Entscheidungen zu betrachten und nicht als unfehlbare Wahrheit.",
          },
          {
            id: "work-strucutre",
            title: "So ist EcoWatt aufgebaut",
            description:
              "Diese Dokumentation ist so gegliedert, dass Sie EcoWatt Abschnitt für Abschnitt erkunden können. Jede Seite behandelt eine einzelne Komponente oder Funktion ausführlich. Achten Sie beim Lesen auf das ML-Abzeichen bzw. -Symbol bei Funktionen: Es kennzeichnet klar, welche Bereiche auf Prognosen des maschinellen Lernens und welche auf direkt berechneten Daten beruhen. So wissen Sie jederzeit, welche Art von Information Sie vor sich haben.",
          },
          {
            id: "vision",
            title: "Vision",
            description:
              "EcoWatt möchte den Stromverbrauch intelligenter machen, indem Haushalte Energie dann nutzen, wenn sie sauberer und erschwinglicher ist. Unser langfristiges Ziel ist es, Energieverschwendung zu verringern, Stromrechnungen zu senken und nachhaltiges Leben im großen Maßstab zu fördern – beginnend bei einzelnen Haushalten und mit der Zeit durch einen umfassenderen kulturellen Wandel hin zu einem bewussten, zeitlich geplanten Energieverbrauch.",
          },
          {
            id: "roadmap",
            title: "Was kommt als Nächstes?",
            description:
              "EcoWatt deckt bereits die Grundlagen eines preisbewussten, zeitgesteuerten Energiemanagements ab, doch die weitere Roadmap ist klar. Geplant sind Anmeldemöglichkeiten über soziale Netzwerke bzw. Drittanbieter, Zwei-Faktor-Authentifizierung, Sitzungs- und Geräteverwaltung, eine öffentliche Entwickler-API, ein Selbstbedienungs-Datenexport sowie die fortlaufende Verfeinerung der Prognosemodelle. Funktionen werden schrittweise eingeführt; diese Dokumentation wird mit jeder Veröffentlichung aktualisiert.",
          },
          {
            id: "who-is-ecowat-for",
            title: "Für wen ist EcoWatt?",
            description:
              "EcoWatt richtet sich in erster Linie an einzelne Haushalte und Bewohner, die ihren Strom selbst bezahlen und sowohl ihre Kosten als auch ihren ökologischen Fußabdruck senken möchten, ohne selbst Energieexperten werden zu müssen. Besonders nützlich ist die Plattform in Regionen mit variablen bzw. dynamischen Strompreisen, in denen der Zeitpunkt des Verbrauchs die Rechnung spürbar beeinflussen kann. Sie ist aber auch für alle wertvoll, die einen besseren Einblick in ihre Verbrauchsgewohnheiten erhalten möchten.",
          },
        ],
      },
    };
  } else {
    return {
      introduction: {
        title: "Introduction",
        navUrl: "/docs/introduction",
        description:
          "Welcome to the EcoWatt documentation. Here you'll find everything about what EcoWatt is, why it exists, how it works, and how to get the most out of it. Build modern, eco-friendly energy forecasting experiences with pre-styled, ready-to-use components and learn the philosophy behind the project.",
        breadcrumbs: ["Docs", "Getting Started", "Introduction"],
        alert: {
          text: "EcoWatt now has a native Android app for mobile users. Get a smoother, app-like experience by installing it using the link below.",
          linkText: "Install app",
          linkHref: "/docs/theming",
        },
        sections: [
          {
            id: "what-is-ecowat",
            title: "What is EcoWatt?",
            description:
              "EcoWatt is an AI-based electricity and resource-saving platform designed to make everyday energy use smarter, cheaper, and greener. It brings together several tightly integrated features: smart appliance scheduling that automatically times your appliances to run when electricity is cheapest and cleanest, an AI chatbot named Ecky that answers your energy-related questions and gives personalized suggestions, a personalized dashboard summarizing your consumption, costs, and savings at a glance, and live electricity price and renewable-availability tracking with short-term predictions. The broader intention behind EcoWatt is to help people build sustainable, scheduled habits around energy use — because meaningful environmental change starts with individuals. Even a single household reducing its wasteful consumption creates a ripple effect, and when many people adopt these habits together, the cumulative impact on energy grids and the environment becomes significant.",
          },
          {
            id: "why-ecowat",
            title: "Why use EcoWatt over other platforms?",
            description:
              "There are certainly other platforms in the electricity and energy-management space, but EcoWatt takes a meaningfully different approach.",
            list: [
              "Depth over breadth: many platforms try to support a huge number of countries and regions at once, spreading their features thin. EcoWatt instead focuses on doing an excellent job for a smaller, well-understood market rather than a mediocre job everywhere.",
              "All-in-one, not fragmented: after researching the space, some platforms only show live prices, others only offer appliance scheduling, and others only provide a chatbot — but very few combine all three into a single cohesive experience the way EcoWatt does.",
              "Proactive, not just informative: rather than simply showing you a lower price and expecting you to manually act on it, EcoWatt automatically suggests (and can schedule) appliance usage based on both price and the availability of renewable energy at that time.",
              "Security-first mindset: even though this began as a student project, security and user data protection were never treated as an afterthought — sensitive data like passwords are hashed, and access to data is tightly scoped to the individual user.",
              "Built with intent: EcoWatt wasn't built purely as a technical exercise — it was designed around a real observed problem, with the features shaped by what would genuinely help a household reduce waste and cost.",
            ],
          },
          {
            id: "security-terms",
            title: "What are EcoWatt's security measures?",
            description:
              "EcoWatt takes security seriously, even though the platform itself doesn't handle highly sensitive financial or medical information. Passwords are never stored in plain text — they are hashed before being saved, meaning even in the unlikely event of a data breach, your actual password would not be exposed. The data EcoWatt stores per user is intentionally limited: your profile details (name, email, hashed password), your daily electricity consumption figures, the appliances you've registered, and model predictions generated specifically for your account. EcoWatt does not collect or store more invasive personal information such as government IDs, payment card numbers, or precise location history. Access to your data is scoped strictly to your own account — there is no mechanism for other users to view your consumption, appliances, or predictions.",
          },
          {
            id: "data-retention",
            title: "How long is my data retained?",
            description:
              "Your data is retained for as long as your account remains active. If you choose to delete your account, it enters a 30-day grace period during which your data is preserved in case you want to recover it, after which it is permanently deleted from our systems. See the Account documentation for full details on the deletion and recovery process.",
          },
          {
            id: "api-public",
            title: "Are the APIs public?",
            description:
              "Not at the moment. Currently, none of EcoWatt's internal data or APIs are shared publicly — access is scoped individually to each authenticated user, and there is no general-purpose public API. This is a deliberate choice while the platform matures and the data model stabilizes. However, an open, developer-facing API is planned for a future release, which will make it much easier for other developers to build on top of EcoWatt's predictions, pricing data, and scheduling logic to create their own tools and integrations.",
          },
          {
            id: "who-invented-ecowat",
            title: "Who created EcoWatt?",
            description:
              "EcoWatt was built individually by Manvith as a personal project. The topic was chosen after identifying this as a real, tangible problem in Germany (Deutschland) — where variable electricity pricing and renewable availability make timing your usage genuinely valuable, but few consumer-friendly tools existed to help people act on that information. The project was also deliberately scoped to touch on a wide range of skills the creator wanted to learn and strengthen, from AI/ML integration to full-stack application security, making it both a meaningful product and a rich personal learning journey.",
          },
          {
            id: "owner-info",
            title: "About the Creator",
            description:
              "Manvith is a developer passionate about building innovative, user-friendly applications, with a particular interest in artificial intelligence and machine learning and a drive to work on projects that create a positive real-world impact. His journey began in web development, and after building a solid foundation there, he found himself increasingly drawn to AI — specifically the challenge of building something genuinely interactive and helpful rather than just technically impressive. That growing interest in AI is what ultimately shaped EcoWatt into the AI-driven platform it is today. You can learn more about Manvith and get in touch via his portfolio linked below.",
            nav: {
              label: "visit Portfolio",
              link: "https://portfolio-two-orpin-gh4czncw4j.vercel.app",
            },
          },
          {
            id: "core-features",
            title: "Core Features",
            list: [
              "AI-powered electricity assistant (Ecky) — a conversational assistant that answers questions about your usage, pricing, and savings opportunities in plain language.",
              "Smart appliance scheduling — automatically times appliance usage around cheaper, cleaner electricity windows.",
              "Live electricity price monitoring — real-time visibility into current and near-term electricity prices.",
              "Renewable energy availability tracking — shows when the grid is running on a higher share of renewable energy.",
              "Electricity consumption prediction — machine-learning-driven forecasts of your upcoming usage.",
              "Personalized dashboard — a single view summarizing your consumption, costs, savings, and recommendations.",
              "Energy usage analytics — historical trends and breakdowns to help you understand your habits over time.",
              "Carbon footprint estimation — an estimate of the environmental impact of your electricity usage.",
              "Cost prediction — forward-looking estimates of what your electricity bill is likely to look like.",
              "Secure user authentication — hashed passwords, magic-link login, and account-scoped data access.",
            ],
          },
          {
            id: "feature-deep-dive-ecky",
            title: "A closer look: Ecky, the AI assistant",
            description:
              "Ecky is EcoWatt's built-in AI chatbot, designed to act as a friendly, always-available guide to your own energy data. Rather than requiring you to dig through charts and settings, you can simply ask Ecky things like when the cheapest time to run your washing machine today is, how your consumption this week compares to last week, or what's driving an unusually high prediction. Ecky is built on top of the same underlying prediction models that power the rest of the dashboard, so its answers stay consistent with what you see elsewhere in the app.",
          },
          {
            id: "feature-deep-dive-scheduling",
            title: "A closer look: Smart Appliance Scheduling",
            description:
              "Smart scheduling goes a step beyond simply showing you a price graph. Once you register an appliance and its typical usage pattern, EcoWatt automatically evaluates upcoming price and renewable-availability windows and suggests (or, where enabled, automatically applies) the optimal time slot to run that appliance. The goal is to remove the mental overhead of manually checking prices — the system nudges you toward good decisions by default rather than requiring constant attention.",
          },
          {
            id: "design-principles",
            title: "Design Principles",
            description:
              "EcoWatt is guided by a small number of consistent principles: keep the interface approachable for non-technical users, be transparent about where AI is used and how confident its predictions are, default to suggestions that save both money and the environment simultaneously rather than optimizing for one at the expense of the other, and prioritize the security and privacy of user data at every layer of the stack.",
          },
          {
            id: "ml-icon",
            title: "What does the ML badge represent?",
            description:
              "Throughout the app, you'll notice a small ML badge/icon next to certain features. This badge indicates that the feature relies on a machine learning model to generate its output — typically a prediction or suggestion rather than a hard fact. We show this badge deliberately so that you understand these outputs are estimates, not guarantees, and should be treated as a helpful suggestion rather than something to depend on unconditionally.",
          },
          {
            id: "ecowat-always-correct",
            title: "Is EcoWatt always correct?",
            description:
              "No — and we want to be upfront about that. Any feature marked with the ML badge is powered by a machine learning model, and like all such models, it carries some margin of error. Our goal is to continuously improve accuracy over time, and a lot of effort has already gone into tuning these models to produce strong, reliable predictions for most components. Still, we recommend treating ML-driven outputs as an informed suggestion to guide your decisions rather than an infallible source of truth.",
          },
          {
            id: "work-strucutre",
            title: "How EcoWatt is structured",
            description:
              "This documentation is organized so you can explore EcoWatt section by section, with each page covering an individual component or feature in depth. As you go through the docs, keep an eye out for the ML badge/icon on any feature — this clearly flags which parts of the experience are powered by machine learning predictions versus straightforward calculated data, so you always know what kind of information you're looking at.",
          },
          {
            id: "vision",
            title: "Vision",
            description:
              "EcoWatt aims to make electricity consumption smarter by helping households use energy when it is cleaner and more affordable. Our long-term goal is to reduce energy waste, lower electricity bills, and encourage sustainable living at scale — starting with individual households and, over time, contributing to a broader cultural shift toward mindful, schedule-aware energy consumption.",
          },
          {
            id: "roadmap",
            title: "What's coming next?",
            description:
              "While EcoWatt already covers the essentials of price-aware, schedule-driven energy management, there's a clear roadmap ahead. Planned improvements include social/third-party login options, two-factor authentication, session and device management, a public developer API, self-service data export, and continued refinement of the prediction models to push accuracy even higher. Features will be rolled out incrementally, and this documentation will be updated as each one ships.",
          },
          {
            id: "who-is-ecowat-for",
            title: "Who is EcoWatt for?",
            description:
              "EcoWatt is built primarily for individual households and residents who pay for their own electricity and want to reduce both their costs and their environmental footprint without needing to become energy experts themselves. It's especially useful in regions with variable/dynamic electricity pricing, where the timing of usage can meaningfully affect your bill, but it's also valuable for anyone who simply wants better visibility into their consumption habits.",
          },
        ],
      },
    };
  }
};
