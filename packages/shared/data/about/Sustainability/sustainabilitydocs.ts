import { DocPage } from "../../docs.types";

export const Sustainability = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Sustainability: {
        title: "Nachhaltigkeit",
        navUrl: "/docs/Sustainability",
        description:
          "Verstehen Sie die Auswirkungen Ihrer Energiegewohnheiten und wie sich kleine, informierte Entscheidungen zu einer echten Veränderung für die Umwelt summieren. Dieser Abschnitt behandelt, warum Energiesparen wichtig ist, wie erneuerbare Energien ins Bild passen und wie Ecowat Ihnen hilft, Ihren Fortschritt zu verfolgen.",
        breadcrumbs: ["Dokumentation", "Übersicht", "Nachhaltigkeit"],
        sections: [
          {
            id: "why-save-energy",
            title: "Warum Energie sparen?",
            description:
              "Energiesparen bedeutet nicht nur, Ihre Rechnung zu senken — es verringert auch die Belastung des Stromnetzes, reduziert die Treibhausgase, die von fossil betriebenen Kraftwerken ausgestoßen werden, und trägt dazu bei, natürliche Ressourcen für die Zukunft zu bewahren. Jede Einheit Strom, die Sie nicht aus dem Netz beziehen müssen, ist eine Einheit weniger, die erzeugt, übertragen und bezahlt werden muss. Kleine, konsequente Gewohnheiten wie die Verlagerung des Verbrauchs in Zeiten geringerer Auslastung können sich im Laufe der Zeit zu bedeutenden Einsparungen summieren — sowohl für Ihren Geldbeutel als auch für die Umwelt.",
          },
          {
            id: "renewable-energy",
            title: "Erneuerbare Energien",
            description:
              "Erneuerbare Energien stammen aus sich natürlich erneuernden Quellen wie Sonnenlicht, Wind und fließendem Wasser, im Gegensatz zu fossilen Brennstoffen, die begrenzt sind und Millionen von Jahren zur Entstehung benötigen. Mit zunehmender Kapazität erneuerbarer Energien variiert der Anteil sauberen Stroms im Netz von Stunde zu Stunde je nach Wetter und Nachfrage. Die Prognose erneuerbarer Energien von Ecowat sagt die Verfügbarkeit von Solar- und Windenergie für die kommende Woche voraus, sodass Sie Ihre Gerätenutzung an den Zeiten ausrichten können, in denen saubere Energie am reichlichsten vorhanden ist.",
          },
          {
            id: "carbon-emissions",
            title: "CO2-Emissionen",
            description:
              "CO2-Emissionen sind Treibhausgase, hauptsächlich Kohlendioxid, die freigesetzt werden, wenn fossile Brennstoffe zur Stromerzeugung, zum Heizen von Wohnungen oder zum Antrieb von Verkehrsmitteln verbrannt werden. Da ein Großteil des Stromnetzes weiterhin auf fossilen Brennstoffen basiert, trägt der alltägliche Stromverbrauch indirekt zu diesen Emissionen bei. Die Funktion CO2-Fußabdruck von Ecowat hilft Ihnen zu erkennen, wie sich Ihr Verbrauch im Zeitverlauf in Emissionen niederschlägt, sodass Sie Ihre Auswirkungen leichter verstehen und Verbesserungen verfolgen können.",
          },
          {
            id: "eco-tips",
            title: "Öko-Tipps",
            description:
              "Kleine Gewohnheiten können im Laufe der Zeit einen echten Unterschied machen. Der Betrieb von Geräten mit hohem Verbrauch wie Waschmaschinen oder Geschirrspülern während Zeiten geringerer Auslastung oder hoher Verfügbarkeit erneuerbarer Energien, das Trennen von Geräten vom Netz statt sie im Standby-Modus zu lassen, und die Nutzung der Empfehlungen von Ecowat, um bessere Zeiten für Ihre Routinen zu finden, sind allesamt einfache Wege, um sowohl Ihre Rechnung als auch Ihren ökologischen Fußabdruck zu verringern, ohne Ihren Lebensstil zu ändern.",
          },
          {
            id: "environmental-impact",
            title: "Umweltauswirkungen",
            description:
              "Die Stromerzeugung wirkt sich auf weit mehr aus als nur Ihre monatliche Rechnung — sie trägt zu Luftverschmutzung, Ressourcenerschöpfung und Klimawandel bei, was sich wiederum auf Ökosysteme und die biologische Vielfalt auswirkt. Auch wenn der Verbrauch eines einzelnen Haushalts gering erscheinen mag, verringert eine kollektive Verlagerung hin zu einem Verbrauch außerhalb der Spitzenzeiten und mit hohem Anteil erneuerbarer Energien die Belastung fossil betriebener Kraftwerke spürbar. Ecowat bringt Ihre Verbrauchshistorie, Ihren CO2-Fußabdruck und Daten zu erneuerbaren Energien an einem Ort zusammen, damit Sie sehen können, wie sich Ihre Gewohnheiten auf die Umwelt auswirken und wie sie sich verbessern.",
          },
        ],
      },
    };
  } else {
    return {
      Sustainability: {
        title: "Sustainability",
        navUrl: "/docs/Sustainability",
        description:
          "Understand the impact of your energy habits and how small, informed choices add up to real environmental change. This section covers why saving energy matters, how renewables fit in, and how Ecowat helps you track your progress.",
        breadcrumbs: ["Docs", "Overview", "Sustainability"],
        sections: [
          {
            id: "why-save-energy",
            title: "Why Save Energy?",
            description:
              "Saving energy isn't just about lowering your bill — it reduces the strain on the power grid, cuts down the greenhouse gases released by fossil-fuel power plants, and helps preserve natural resources for the future. Every unit of electricity you don't need to draw from the grid is one less unit that has to be generated, transmitted, and paid for. Small, consistent habits like shifting usage to off-peak hours can add up to meaningful savings over time, both for your wallet and for the environment.",
          },
          {
            id: "renewable-energy",
            title: "Renewable Energy",
            description:
              "Renewable energy comes from naturally replenishing sources such as sunlight, wind, and flowing water, unlike fossil fuels which are finite and take millions of years to form. As more renewable capacity comes online, the share of clean electricity on the grid varies hour to hour depending on weather and demand. Ecowat's Renewable Energy Forecast predicts solar and wind availability for the week ahead, so you can plan your appliance usage around the times when clean energy is most abundant.",
          },
          {
            id: "carbon-emissions",
            title: "Carbon Emissions",
            description:
              "Carbon emissions are greenhouse gases, primarily carbon dioxide, released when fossil fuels are burned to generate electricity, heat homes, or power transportation. Because much of the electricity grid still relies on fossil fuels, everyday electricity use indirectly contributes to these emissions. Ecowat's Carbon Footprint feature helps you see how your usage translates into emissions over time, making it easier to understand your impact and track improvement.",
          },
          {
            id: "eco-tips",
            title: "Eco Tips",
            description:
              "Small habits can make a real difference over time. Running high-consumption appliances like washing machines or dishwashers during off-peak or high-renewable hours, unplugging devices instead of leaving them on standby, and using Ecowat's Recommendations to identify better times for your routines are all simple ways to reduce both your bill and your environmental footprint without changing your lifestyle.",
          },
          {
            id: "environmental-impact",
            title: "Environmental Impact",
            description:
              "Electricity generation affects far more than your monthly bill — it contributes to air pollution, resource depletion, and climate change, all of which ripple out to affect ecosystems and biodiversity. While a single household's usage may seem small, collective shifts toward off-peak and renewable-rich consumption meaningfully reduce strain on fossil-fuel power plants. Ecowat brings your usage history, carbon footprint, and renewable data together so you can see, in one place, how your habits affect the environment and how they're improving.",
          },
        ],
      },
    };
  }
};
