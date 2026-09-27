import { DocPage } from "../../docs.types";

export const Ecky = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Ecky: {
        title: "Ecky",
        navUrl: "/docs/Ecky",
        description:
          "Ecky ist der trainierte KI-Chatbot von EcoWatt, der Ihre Fragen zu Strompreisen, Geräten, Zeitplanung und der Plattform selbst beantwortet — sowohl auf Englisch als auch auf Deutsch.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Ecky"],
        sections: [
          {
            id: "overview of Ecky",
            title: "Überblick über Ecky",
            description:
              "Ecky ist der integrierte, zweisprachige Chatbot von EcoWatt, der fließend sowohl auf Englisch als auch auf Deutsch kommunizieren kann. Ecky kann Fragen zu aktuellen und prognostizierten Strompreisen beantworten, Ihnen helfen, Ihre registrierten Geräte zu verstehen, Sie durch Planungsentscheidungen führen und erklären, wie EcoWatt selbst funktioniert — er dient im Grunde als konversationelle Eingangstür zu allem anderen auf der Plattform.",
            nav: {
              label: "Ecky",
              link: "/en/ecky",
            },
          },
          {
            id: "Unique-features",
            title: "Was sind einige einzigartige Funktionen von Ecky?",
            description:
              "Da Ecky sorgfältig auf EcoWatt-spezifische Daten und Arbeitsabläufe feinabgestimmt wurde, geht er über generische Chatbot-Frage-Antwort-Interaktionen hinaus. Er kann auf Wunsch aktiv Geräte in Ihrem Auftrag einplanen und Echtzeit-Datenfragen beantworten — wie etwa den aktuellen Strompreis —, indem er direkt auf dieselben Datenquellen zugreift, die auch den Rest des Dashboards antreiben, statt sich auf veraltetes oder allgemeines Wissen zu verlassen.",
          },
          {
            id: "how-to-talk-to-ecky",
            title: "Was für Dinge kann ich Ecky fragen?",
            description:
              "Sie können Ecky praktische, alltägliche Fragen stellen, wie zum Beispiel wie der aktuelle oder bevorstehende Strompreis aussieht, wann die beste Zeit wäre, um ein bestimmtes Gerät zu betreiben, wie sich Ihr Verbrauch oder Ihre Kosten über die letzten Tage im Vergleich verhalten, oder allgemeine Fragen dazu, wie die Funktionen von EcoWatt funktionieren. Ecky ist so konzipiert, dass er sich wie ein sachkundiger Assistent für die Energieentscheidungen Ihres Haushalts anfühlt und nicht wie ein starrer, befehlsbasierter Bot.",
          },
          {
            id: "slow-response",
            title: "Warum sind Eckys Antworten manchmal langsam?",
            description:
              "Möglicherweise bemerken Sie gelegentliche Verzögerungen bei den Antworten von Ecky. Das liegt daran, dass Ecky derzeit auf Hugging Face Spaces ohne dedizierte GPU-/CPU-Beschleunigung gehostet wird — eine bewusste, kostenbewusste Entscheidung, da EcoWatt ein selbstfinanziertes Studentenprojekt ist. Der Betrieb auf bescheidenerer, kostenfreier Infrastruktur bedeutet, dass die Antwortzeiten etwas langsamer sein können als bei einer vollständig kommerziellen Bereitstellung, hält das Projekt aber langfristig tragbar und weiterentwickelbar.",
            nav: {
              label: "Hugging Face",
              link: "https://huggingface.co/spaces/manvith09/ecowat-api",
            },
          },
          {
            id: "is-scratch",
            title: "Wurde Ecky vollständig von Grund auf entwickelt?",
            description:
              "Nicht vollständig. Die aktuelle Version von Ecky basiert auf Ollama, einer Plattform zum lokalen Betrieb großer Sprachmodelle. Zu Beginn der Entwicklung wurde versucht, ein Sprachmodell vollständig von Grund auf zu erstellen, doch es zeigte sich, dass das Training eines vollständig benutzerdefinierten Modells auf ein wirklich nutzbares Niveau erhebliche Rechenressourcen erfordert — weit über das hinaus, was für ein selbstfinanziertes Studentenprojekt machbar ist. Der Wechsel zu Ollama ermöglichte es, einen leistungsfähigen, feinabstimmbaren Assistenten zum Laufen zu bringen, ohne eine große Trainingsinfrastruktur zu benötigen.",
          },
          {
            id: "Structure-of-Ecky",
            title: "Die Geschichte hinter der Architektur von Ecky",
            description:
              "Ecky wurde von Manvith entwickelt, nachdem er die vollständige Struktur großer Sprachmodelle eingehend studiert hatte, einschließlich des Aufbaus eines benutzerdefinierten Modells mit einer Transformer-Architektur, bei der Tokenizer und Multi-Head-Attention von Grund auf implementiert wurden. Obwohl dies technisch lehrreich und lohnend war, blieb dieses von Grund auf entwickelte Modell letztlich hinter den Erwartungen zurück, aufgrund begrenzter Trainingsdaten und der erheblichen Rechenressourcen, die für ein sinnvolles Training erforderlich sind. In Anerkennung dieser Einschränkung wechselte das Projekt stattdessen zum Aufbau auf Ollama — wodurch Ecky ein wirklich leistungsfähiges Modell betreiben kann, während die Ressourcenanforderungen für ein unabhängiges, selbst gehostetes Projekt realistisch bleiben.",
          },
          {
            id: "why-transformer-attempt-mattered",
            title:
              "Warum zunächst ein eigenes Modell entwickeln, wenn es letztlich nicht verwendet wurde?",
            description:
              "Auch wenn das von Grund auf entwickelte Transformer-Modell letztlich nicht das ist, was Ecky in der Produktion antreibt, war seine Entwicklung eine bewusste und wertvolle Lernerfahrung — sie ermöglichte ein wesentlich tieferes Verständnis davon, wie große Sprachmodelle intern tatsächlich funktionieren, was später direkt in die Feinabstimmung und Integration von Ecky auf Basis von Ollama einfloss. In diesem Sinne war das „gescheiterte“ benutzerdefinierte Modell keine vergeudete Mühe; es prägte eine bessere endgültige Umsetzung.",
          },
          {
            id: "Ecky-answer",
            title: "Welche Sprachen kann Ecky sprechen?",
            description:
              "Ecky kann sowohl auf Deutsch als auch auf Englisch kommunizieren. Da EcoWatt ursprünglich mit Blick auf deutsche Stromverbraucher entwickelt wurde, erschien die Hinzufügung nativer deutscher Sprachunterstützung als die richtige Wahl, um die Erfahrung für die Kernzielgruppe der Plattform angenehm und natürlich zu gestalten, während gleichzeitig Englisch für eine breitere Zugänglichkeit unterstützt wird.",
          },
          {
            id: "switching-ecky-language",
            title: "Wie wechsle ich die Sprache, in der Ecky antwortet?",
            description:
              "Ecky antwortet im Allgemeinen in der Sprache, in der Sie Ihre Frage stellen — wenn Sie auf Deutsch schreiben, erhalten Sie eine deutsche Antwort, und wenn Sie auf Englisch schreiben, eine englische. Dadurch fühlt sich die Interaktion natürlich an, ohne dass Sie eine Spracheinstellung manuell umschalten müssen, bevor Sie chatten.",
          },
          {
            id: "ecky-limitations",
            title: "Was sind Eckys aktuelle Einschränkungen?",
            description:
              "Wie bei jeder KI-gestützten Funktion in EcoWatt trägt Ecky das ML-Badge und sollte als hilfreicher, fundierter Assistent und nicht als unfehlbare Wahrheitsquelle betrachtet werden. Die Antwortzeiten können aufgrund der oben beschriebenen kostenbewussten Hosting-Einrichtung langsamer sein als bei kommerziellen Chatbots, und Eckys Wissen beschränkt sich hauptsächlich auf Strompreise, Geräte, Zeitplanung und EcoWatt selbst, statt auf allgemeine Themen.",
          },
        ],
      },
    };
  } else {
    return {
      Ecky: {
        title: "Ecky",
        navUrl: "/docs/Ecky",
        description:
          "Ecky is EcoWatt's trained AI chatbot, built to answer your questions about electricity prices, appliances, scheduling, and the platform itself — in both English and German.",
        breadcrumbs: ["Docs", "Overview", "Ecky"],
        sections: [
          {
            id: "overview of Ecky",
            title: "Overview of Ecky",
            description:
              "Ecky is EcoWatt's built-in, bilingual chatbot, able to communicate fluently in both English and German (Deutsch). Ecky can answer questions about live and predicted electricity prices, help you understand your registered appliances, walk you through scheduling decisions, and explain how EcoWatt itself works — essentially acting as a conversational front door to everything else in the platform.",
            nav: {
              label: "Ecky",
              link: "/en/ecky",
            },
          },
          {
            id: "Unique-features",
            title: "What are some unique features of Ecky?",
            description:
              "Because Ecky has been carefully fine-tuned on EcoWatt-specific data and workflows, it goes beyond generic chatbot Q&A. It can actively schedule appliances on your behalf when asked, and it can answer real-time data questions — like the current live electricity price — by pulling directly from the same data sources that power the rest of the dashboard, rather than relying on stale or generic knowledge.",
          },
          {
            id: "how-to-talk-to-ecky",
            title: "What kinds of things can I ask Ecky?",
            description:
              "You can ask Ecky practical, everyday questions such as what the current or upcoming electricity price looks like, when the best time to run a specific appliance would be, how your consumption or costs compare over recent days, or general questions about how EcoWatt's features work. Ecky is designed to feel like a knowledgeable assistant for your household's energy decisions rather than a rigid command-based bot.",
          },
          {
            id: "slow-response",
            title: "Why are Ecky's responses sometimes slow?",
            description:
              "You may notice occasional delays in Ecky's responses. This is because Ecky is currently hosted on Hugging Face Spaces without dedicated GPU/CPU acceleration — a deliberate cost-conscious choice, since EcoWatt is a self-funded student project. Running on more modest, cost-free infrastructure means response times can be a bit slower than a fully commercial deployment, but it keeps the project sustainable to run and improve over time.",
            nav: {
              label: "Hugging Face",
              link: "https://huggingface.co/spaces/manvith09/ecowat-api",
            },
          },
          {
            id: "is-scratch",
            title: "Is Ecky built entirely from scratch?",
            description:
              "Not entirely. Ecky's current version is built on top of Ollama, a platform for running large language models locally. Early in development, an attempt was made to build a language model completely from scratch, but it became clear that training a fully custom model to a genuinely useful standard requires substantial computational resources — far beyond what's feasible for a self-funded student project. Shifting to Ollama made it possible to get a capable, fine-tunable assistant running without needing a large training infrastructure.",
          },
          {
            id: "Structure-of-Ecky",
            title: "The story behind Ecky's architecture",
            description:
              "Ecky was built by Manvith after studying the full structure of large language models in depth, including building a custom model using a transformer architecture with a tokenizer and multi-head attention implemented from first principles. While technically educational and rewarding, that from-scratch model ultimately underperformed due to limited training data and the heavy computational resources required for meaningful training. Recognizing this constraint, the project shifted to building on top of Ollama instead — allowing Ecky to run a genuinely capable model while keeping resource requirements realistic for an independent, self-hosted project.",
          },
          {
            id: "why-transformer-attempt-mattered",
            title:
              "Why build a custom model first if it wasn't used in the end?",
            description:
              "Even though the from-scratch transformer model wasn't ultimately what powers Ecky in production, building it was a deliberate and valuable learning exercise — it provided a much deeper understanding of how large language models actually work internally, which directly informed how Ecky was later fine-tuned and integrated on top of Ollama. In that sense, the 'failed' custom model wasn't wasted effort; it shaped a better final implementation.",
          },
          {
            id: "Ecky-answer",
            title: "What languages can Ecky speak?",
            description:
              "Ecky can communicate in both German (Deutsch) and English. Since EcoWatt was originally built with German electricity consumers in mind, adding native German language support felt like the right choice to make the experience feel comfortable and natural for the platform's core audience, while still supporting English for broader accessibility.",
          },
          {
            id: "switching-ecky-language",
            title: "How do I switch the language Ecky responds in?",
            description:
              "Ecky generally responds in the language you use to ask your question — if you write in German, expect a German response, and if you write in English, expect an English one. This makes the interaction feel natural without requiring you to manually toggle a language setting before chatting.",
          },
          {
            id: "ecky-limitations",
            title: "What are Ecky's current limitations?",
            description:
              "As with any AI-driven feature on EcoWatt, Ecky carries the ML badge and should be treated as a helpful, informed assistant rather than an infallible source of truth. Response times can be slower than commercial chatbots due to the cost-conscious hosting setup described above, and Ecky's knowledge is scoped primarily to electricity pricing, appliances, scheduling, and EcoWatt itself rather than general-purpose topics.",
          },
        ],
      },
    };
  }
};
