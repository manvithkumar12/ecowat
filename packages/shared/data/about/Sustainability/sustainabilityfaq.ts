import { DocPage } from "../../docs.types";

export const SustainabilityFAQ = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Sustainability: {
        title: "Nachhaltigkeit — FAQ",
        navUrl: "/docs/SustainabilityFaq",
        description: "Nachhaltigkeit FAQ",
        breadcrumbs: ["Dokumentation", "Übersicht", "Nachhaltigkeit", "FAQ"],
        sections: [
          {
            id: "why-save-energy-1",
            title:
              "Warum sollte ich mich um das Energiesparen zu Hause bemühen?",
            description:
              "Energiesparen senkt Ihre Stromrechnung, verringert die Belastung des Stromnetzes während der Spitzenzeiten und reduziert die Treibhausgasemissionen fossil betriebener Kraftwerke.",
          },
          {
            id: "why-save-energy-2",
            title:
              "Macht es wirklich einen Unterschied, eine kleine Menge Energie zu sparen?",
            description:
              "Ja. Kleine, konsequente Änderungen — wie der Betrieb von Geräten während Zeiten geringerer Auslastung — summieren sich im Laufe der Zeit erheblich, sowohl für Ihren Geldbeutel als auch für die Umwelt.",
          },
          {
            id: "why-save-energy-3",
            title: "Wie hilft mir Ecowat beim Energiesparen?",
            description:
              "Ecowat erfasst Ihren Verbrauch, prognostiziert Preise und die Verfügbarkeit erneuerbarer Energien und empfiehlt die besten Zeiten für den Betrieb Ihrer Geräte, sodass Sie den Verbrauch senken können, ohne Ihre Routine zu ändern.",
          },

          {
            id: "renewable-energy-1",
            title: "Was zählt als erneuerbare Energie?",
            description:
              "Erneuerbare Energie stammt aus sich natürlich erneuernden Quellen wie Sonnenlicht, Wind und fließendem Wasser, im Gegensatz zu fossilen Brennstoffen, die begrenzt sind und Millionen von Jahren zur Entstehung benötigen.",
          },
          {
            id: "renewable-energy-2",
            title: "Wie nutzt Ecowat Daten zu erneuerbaren Energien?",
            description:
              "Die Prognose erneuerbarer Energien von Ecowat sagt die Verfügbarkeit von Solar- und Windenergie für die kommende Woche voraus, sodass Sie wissen, wann saubere Energie voraussichtlich einen größeren Anteil im Netz ausmacht.",
          },
          {
            id: "renewable-energy-3",
            title:
              "Warum sollte ich die Gerätenutzung an der Verfügbarkeit erneuerbarer Energien ausrichten?",
            description:
              "Wenn Sie Strom nutzen, während die Erzeugung erneuerbarer Energien hoch ist, stammt ein größerer Teil des von Ihnen verbrauchten Stroms aus sauberen Quellen, wodurch Ihre Abhängigkeit von fossiler Erzeugung sinkt.",
          },

          {
            id: "carbon-emissions-1",
            title: "Was sind CO2-Emissionen und warum sind sie wichtig?",
            description:
              "CO2-Emissionen sind Treibhausgase, hauptsächlich Kohlendioxid, die freigesetzt werden, wenn fossile Brennstoffe für Strom, Heizung und Transport verbrannt werden. Sie sind einer der Haupttreiber des Klimawandels.",
          },
          {
            id: "carbon-emissions-2",
            title: "Wie trägt mein Stromverbrauch zu CO2-Emissionen bei?",
            description:
              "Ein Großteil des Stromnetzes basiert weiterhin auf fossilen Brennstoffen, sodass jede von Ihnen genutzte Stromeinheit indirekt zu CO2-Emissionen beiträgt, es sei denn, sie stammt aus erneuerbaren Quellen.",
          },
          {
            id: "carbon-emissions-3",
            title: "Wie kann ich meine CO2-Auswirkungen mit Ecowat verfolgen?",
            description:
              "Die Seite CO2-Fußabdruck von Ecowat zeigt, wie sich Ihr Verbrauch im Zeitverlauf in Emissionen niederschlägt, und hebt Ihre Fortschritte hervor, während Sie sich auf intelligentere, sauberere Gewohnheiten umstellen.",
          },

          {
            id: "eco-tips-1",
            title:
              "Was ist eine einfache Möglichkeit, heute mit dem Energiesparen zu beginnen?",
            description:
              "Geräte an der Steckdose auszuschalten, statt sie im Standby-Modus zu lassen, und Geräte mit hohem Verbrauch während Zeiten geringerer Auslastung oder hoher Verfügbarkeit erneuerbarer Energien zu betreiben, sind einfache erste Schritte.",
          },
          {
            id: "eco-tips-2",
            title:
              "Helfen kleine Gewohnheiten wie das Abstecken von Ladegeräten tatsächlich?",
            description:
              "Ja, der Standby-Verbrauch kann über ein Jahr hinweg einen spürbaren Anteil am Stromverbrauch eines Haushalts ausmachen, sodass sich das Abstecken ungenutzter Geräte summiert.",
          },
          {
            id: "eco-tips-3",
            title: "Wo finde ich personalisierte Tipps für mein Zuhause?",
            description:
              "Die Empfehlungsfunktion von Ecowat analysiert Ihre gespeicherten Geräte und Nutzungsmuster, um Tipps und Planungsänderungen vorzuschlagen, die speziell auf Sie zugeschnitten sind.",
          },

          {
            id: "environmental-impact-1",
            title:
              "Wie wirkt sich der Energieverbrauch eines Haushalts auf die Umwelt aus?",
            description:
              "Die Stromerzeugung, insbesondere aus fossilen Brennstoffen, trägt zu Luftverschmutzung, Ressourcenerschöpfung und Klimawandel bei, was sich alles auf Ökosysteme und die biologische Vielfalt auswirkt.",
          },
          {
            id: "environmental-impact-2",
            title:
              "Können individuelle Änderungen die Umwelt wirklich beeinflussen?",
            description:
              "Ja. Wenn viele Haushalte ihren Verbrauch in Zeiten geringerer Auslastung und mit hoher Verfügbarkeit erneuerbarer Energien verlagern, verringert dies gemeinsam die Belastung fossil betriebener Kraftwerke und senkt die Gesamtemissionen.",
          },
          {
            id: "environmental-impact-3",
            title:
              "Wie hilft mir Ecowat, meine Umweltauswirkungen zu verstehen?",
            description:
              "Indem Ecowat Ihre Verbrauchshistorie, Ihren CO2-Fußabdruck und Daten zu erneuerbaren Energien kombiniert, erhalten Sie ein fortlaufendes Bild davon, wie sich Ihre Gewohnheiten auf die Umwelt auswirken — und wie sie sich verbessern.",
          },
        ],
      },
    };
  } else {
    return {
      Sustainability: {
        title: "Sustainability — FAQ",
        navUrl: "/docs/SustainabilityFaq",
        description: "Sustainability Faq",
        breadcrumbs: ["Docs", "Overview", "Sustainability", "FAQ"],
        sections: [
          {
            id: "why-save-energy-1",
            title: "Why should I bother saving energy at home?",
            description:
              "Saving energy lowers your electricity bills, reduces demand on the power grid during peak hours, and cuts down the greenhouse gas emissions produced by fossil-fuel power plants.",
          },
          {
            id: "why-save-energy-2",
            title:
              "Does saving a small amount of energy really make a difference?",
            description:
              "Yes. Small, consistent changes — like running appliances during off-peak hours — add up significantly over time, both for your wallet and for the environment.",
          },
          {
            id: "why-save-energy-3",
            title: "How does Ecowat help me save energy?",
            description:
              "Ecowat tracks your usage, predicts prices and renewable availability, and recommends the best times to run your appliances so you can cut consumption without changing your routine.",
          },

          {
            id: "renewable-energy-1",
            title: "What counts as renewable energy?",
            description:
              "Renewable energy comes from naturally replenishing sources such as sunlight, wind, and flowing water, unlike fossil fuels, which are finite and take millions of years to form.",
          },
          {
            id: "renewable-energy-2",
            title: "How does Ecowat use renewable energy data?",
            description:
              "Ecowat's Renewable Energy Forecast predicts solar and wind availability for the week ahead, so you know when clean energy is likely to make up a larger share of the grid.",
          },
          {
            id: "renewable-energy-3",
            title:
              "Why should I plan appliance usage around renewable availability?",
            description:
              "Using electricity when renewable generation is high means more of the power you consume comes from clean sources, reducing your reliance on fossil-fuel generation.",
          },

          {
            id: "carbon-emissions-1",
            title: "What are carbon emissions and why do they matter?",
            description:
              "Carbon emissions are greenhouse gases, mainly carbon dioxide, released when fossil fuels are burned for electricity, heating, and transportation. They're a leading driver of climate change.",
          },
          {
            id: "carbon-emissions-2",
            title:
              "How does my electricity usage contribute to carbon emissions?",
            description:
              "Much of the electricity grid still relies on fossil fuels, so every unit of electricity you use indirectly contributes to carbon emissions unless it comes from renewables.",
          },
          {
            id: "carbon-emissions-3",
            title: "How can I track my carbon impact with Ecowat?",
            description:
              "Ecowat's Carbon Footprint page shows how your usage translates into emissions over time and highlights your progress as you shift toward smarter, cleaner habits.",
          },

          {
            id: "eco-tips-1",
            title: "What's an easy way to start saving energy today?",
            description:
              "Switching off appliances at the socket instead of leaving them on standby, and running high-consumption devices during off-peak or high-renewable hours, are simple first steps.",
          },
          {
            id: "eco-tips-2",
            title: "Do small habits like unplugging chargers actually help?",
            description:
              "Yes, standby power can account for a noticeable share of household electricity use over a year, so unplugging unused devices adds up.",
          },
          {
            id: "eco-tips-3",
            title: "Where can I find personalized tips for my home?",
            description:
              "Ecowat's Recommendations feature analyzes your saved appliances and usage patterns to suggest tips and scheduling changes tailored specifically to you.",
          },

          {
            id: "environmental-impact-1",
            title: "How does household energy use affect the environment?",
            description:
              "Electricity generation, especially from fossil fuels, contributes to air pollution, resource depletion, and climate change, all of which affect ecosystems and biodiversity.",
          },
          {
            id: "environmental-impact-2",
            title: "Can individual changes really impact the environment?",
            description:
              "Yes. When many households shift usage toward off-peak and renewable-rich hours, it collectively reduces strain on fossil-fuel power plants and lowers overall emissions.",
          },
          {
            id: "environmental-impact-3",
            title:
              "How does Ecowat help me understand my environmental impact?",
            description:
              "By combining your usage history, carbon footprint, and renewable energy data, Ecowat gives you an ongoing picture of how your habits affect the environment—and how they're improving.",
          },
        ],
      },
    };
  }
};
