import { DocPage } from "../../docs.types";

export const Installation = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      installation: {
        title: "Installation",
        navUrl: "/docs/installation",
        description:
          "So richten Sie EcoWatt auf jedem Gerät ein — über die Website oder über die nativen Android-/iOS-Apps — inklusive Systemanforderungen und Tipps zur Fehlerbehebung.",
        breadcrumbs: ["Dokumentation", "Erste Schritte", "Installation"],
        sections: [
          {
            id: "install-ecowat",
            title: "Wie installiere ich EcoWatt?",
            description:
              "Leider gibt es derzeit keine dedizierte Desktop-Anwendung für Windows oder macOS — für Desktop-Nutzer ist die Website selbst die vorgesehene Erfahrung und funktioniert einwandfrei in jedem modernen Browser. Für Android und iOS bieten wir native Anwendungen an, die Sie über den untenstehenden Link herunterladen können. Die mobilen Apps bieten ein flüssigeres, nativeres Erlebnis im Vergleich zur mobilen Website.",
            nav: {
              label: "apk/dmg",
              link: "app/link",
            },
          },
          {
            id: "why-to-install",
            title: "Warum sollte ich die App statt der Website nutzen?",
            description:
              "Die Kernfunktionen von EcoWatt sind auf Web und mobiler App identisch — Sie verpassen keine Funktionalität, wenn Sie beim Browser bleiben. Unsere Website ist zwar vollständig responsiv und funktioniert gut in mobilen Browsern, aber die native Android-/iOS-App bietet ein spürbar flüssigeres Erlebnis mit besserer Performance, schnelleren Ladezeiten bei wiederholten Besuchen und einem Look-and-feel, wie man es von einer nativen App erwartet, statt von einem Browser-Tab. Wenn Sie EcoWatt häufig auf Ihrem Smartphone nutzen, ist die Installation der App im Allgemeinen die angenehmere Option.",
          },
          {
            id: "web-vs-app-comparison",
            title: "Website vs. App — worin liegt der Unterschied?",
            description:
              "Funktional sind Website und App auf Feature-Parität ausgelegt — alles, was Sie mit der einen tun können, können Sie auch mit der anderen tun. Die Unterschiede betreffen hauptsächlich Erlebnis und Komfort: Die App kann sich schneller und stärker in Ihr Gerät integriert anfühlen (z. B. durch die Anzeige in Ihrer App-Übersicht/Ihrem Homescreen wie jede andere App), während die Website keinerlei Installation erfordert und von jedem Browser auf jedem Gerät sofort zugänglich ist, ohne Speicherplatz zu benötigen. Wenn Sie unsicher sind, ist die Website eine gute Möglichkeit, EcoWatt auszuprobieren, bevor Sie sich für die Installation der App entscheiden.",
          },
          {
            id: "source-nav",
            title: "Ist die Anwendung Open Source?",
            description:
              "Ja — EcoWatt ist ein Open-Source-Projekt, damit andere Entwickler den Code einsehen, daraus lernen, Verbesserungen beisteuern und anderen weiterhelfen können. Das Ziel ist, das Projekt zugänglich und community-freundlich zu halten, statt es hinter verschlossenen Türen zu verstecken.",
          },
          {
            id: "requirements",
            title: "Gibt es besondere Anforderungen zum Betrieb von EcoWatt?",
            description:
              "Für die Website: keine besonderen Anforderungen — nahezu jeder moderne Browser (Chrome, Firefox, Safari, Edge) auf Desktop oder Mobilgerät kann EcoWatt problemlos ausführen. Für die mobile Anwendung: Da sie mit React Native entwickelt wurde, ist auf Android-Geräten mindestens Android 5 (Lollipop) erforderlich. Die Anforderungen können sich mit der Weiterentwicklung von React Native leicht ändern — weitere allgemeine Informationen zu den Hardware-/Software-Anforderungen von React Native finden Sie in der verlinkten Ressource unten.",
            nav: {
              label: "Anforderungen ansehen",
              link: "https://stackoverflow.com/questions/60105569/minimum-hardware-and-software-requirements-to-run-mobile-apps-built-with-react-n",
            },
          },
          {
            id: "storage-and-permissions",
            title:
              "Welchen Speicherplatz oder welche Berechtigungen benötigt die App?",
            description:
              "Die mobile EcoWatt-App ist schlank und benötigt keinen nennenswerten Gerätespeicher. Je nach genutzten Funktionen (z. B. Benachrichtigungen für Zeitpläne oder Preisalarme) kann die App um die Berechtigung zum Senden von Push-Benachrichtigungen bitten — diese sind vollständig optional und können jederzeit über die Geräteeinstellungen verwaltet werden, ohne die Kernfunktionen zu beeinträchtigen.",
          },
          {
            id: "updating-the-app",
            title: "Wie aktualisiere ich die App?",
            description:
              "Updates für die mobile EcoWatt-App werden auf demselben Weg bereitgestellt, über den Sie sie ursprünglich installiert haben — über den bereitgestellten Download-Link für die APK (Android) bzw. den entsprechenden Verteilungskanal für iOS. Wir empfehlen, regelmäßig nach der neuesten Version zu suchen, um Zugriff auf die neuesten Funktionen, Leistungsverbesserungen und Sicherheitsupdates zu haben. Die Website hingegen ist immer automatisch auf dem neuesten Stand, da nichts manuell installiert werden muss.",
          },
          {
            id: "installation-troubleshooting",
            title: "Fehlerbehebung bei der Installation",
            description:
              "Falls beim Installieren oder Ausführen der App Probleme auftreten — zum Beispiel ein Installationsfehler unter Android —, prüfen Sie zunächst, ob Ihr Gerät die oben genannte Mindestanforderung von Android 5 erfüllt. Wenn Sie die APK direkt installieren, statt sie über einen App Store zu beziehen, stellen Sie sicher, dass Ihr Gerät die Installation aus der entsprechenden Quelle in den Sicherheitseinstellungen erlaubt. Falls die Probleme weiterhin bestehen, ist die Website stets eine zuverlässige Alternative, da sie keinerlei Installation erfordert.",
          },
          {
            id: "uninstalling",
            title: "Wie deinstalliere ich die App?",
            description:
              "Das Deinstallieren von EcoWatt funktioniert genau wie das Deinstallieren jeder anderen App auf Ihrem Gerät — über die Standard-App-Verwaltung Ihres Geräts. Durch die Deinstallation der App wird Ihr EcoWatt-Konto nicht gelöscht; Ihr Konto bleibt vollständig erhalten und ist über die Website oder durch erneutes Installieren der App weiterhin zugänglich.",
          },
        ],
      },
    };
  } else {
    return {
      installation: {
        title: "Installation",
        navUrl: "/docs/installation",
        description:
          "How to get up and running with EcoWatt on any device — via the website, or via the native Android/iOS apps — along with system requirements and troubleshooting tips.",
        breadcrumbs: ["Docs", "Getting Started", "Installation"],
        sections: [
          {
            id: "install-ecowat",
            title: "How do I install EcoWatt?",
            description:
              "We're sorry to say there's currently no dedicated desktop application for Windows or macOS — for desktop users, the website itself is the intended experience and works great in any modern browser. For Android and iOS, we do offer native applications, which you can download from the link below. The mobile apps provide a smoother, more native feel compared to using the mobile website directly.",
            nav: {
              label: "apk/dmg",
              link: "app/link",
            },
          },
          {
            id: "why-to-install",
            title: "Why install the app instead of using the website?",
            description:
              "EcoWatt's core features are identical across the web and the mobile app — you're not missing out on functionality by sticking to the browser. That said, our website is fully responsive and works well on mobile browsers, but the native Android/iOS app offers a noticeably smoother experience with better fluency, quicker load times for repeat visits, and a look-and-feel that matches what you'd expect from a native app rather than a browser tab. If you frequently check EcoWatt on your phone, installing the app is generally the more pleasant option.",
          },
          {
            id: "web-vs-app-comparison",
            title: "Website vs. App — what's the difference?",
            description:
              "Functionally, the website and the app are kept at feature parity — anything you can do on one, you can do on the other. The differences are mainly about experience and convenience: the app can feel snappier and more integrated with your device (e.g. appearing in your app drawer/home screen like any other app), while the website requires no installation at all and is instantly accessible from any browser, on any device, without needing storage space. If you're unsure, the website is a great way to try EcoWatt out before deciding whether to install the app.",
          },
          {
            id: "source-nav",
            title: "Is the application open-source?",
            description:
              "Yes — EcoWatt has been made an open-source project so that fellow developers can explore the codebase, learn from it, contribute improvements, and help others along the way. The intention is to keep the project accessible and community-friendly rather than locking it away behind closed doors.",
          },
          {
            id: "requirements",
            title: "Are there any special requirements to run EcoWatt?",
            description:
              "For the website: no special requirements — nearly any modern browser (Chrome, Firefox, Safari, Edge) on desktop or mobile can run EcoWatt without issues. For the mobile application: since it's built using React Native, a minimum of Android 5 (Lollipop) is required on Android devices. Requirements can shift slightly as React Native itself evolves, so check the linked resource below for more general context on React Native's hardware/software expectations.",
            nav: {
              label: "View Requirements",
              link: "https://stackoverflow.com/questions/60105569/minimum-hardware-and-software-requirements-to-run-mobile-apps-built-with-react-n",
            },
          },
          {
            id: "storage-and-permissions",
            title: "What storage or permissions does the app need?",
            description:
              "The EcoWatt mobile app is lightweight and doesn't require significant device storage. Depending on the features you use (such as notifications for scheduling or price alerts), the app may request permission to send push notifications — these are entirely optional and can be managed from your device's app settings at any time without affecting core functionality.",
          },
          {
            id: "updating-the-app",
            title: "How do I update the app?",
            description:
              "Updates to the EcoWatt mobile app are distributed the same way you originally installed it — through the download link provided for the APK (Android) or the relevant distribution channel for iOS. We recommend periodically checking for the latest version to make sure you have access to the newest features, performance improvements, and security patches. The website, by contrast, is always automatically up to date since there's nothing to manually install.",
          },
          {
            id: "installation-troubleshooting",
            title: "Troubleshooting installation issues",
            description:
              "If you run into trouble installing or running the app — for example, an installation failure on Android — first double check that your device meets the minimum Android 5 requirement mentioned above. If you're installing the APK directly rather than through an app store, make sure your device allows installation from the relevant source in its security settings. If problems persist, using the website is always a reliable fallback while you troubleshoot, since it has no installation requirements at all.",
          },
          {
            id: "uninstalling",
            title: "How do I uninstall the app?",
            description:
              "Uninstalling EcoWatt works exactly like uninstalling any other app on your device — through your device's standard app management settings. Uninstalling the app does not delete your EcoWatt account or data; your account remains fully intact and accessible from the website or by reinstalling the app later.",
          },
        ],
      },
    };
  }
};
