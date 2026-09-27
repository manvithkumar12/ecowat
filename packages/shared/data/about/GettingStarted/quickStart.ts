import { DocPage } from "../../docs.types";

export const quickStart = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      quickStart: {
        title: "Schnellstart-Anleitung",
        navUrl: "/docs/quickstart",
        description:
          "Eine schnelle, praxisnahe Anleitung, die Sie von null zu einem vollständig eingerichteten EcoWatt-Konto führt — inklusive Installation, Kontoerstellung, erster Anmeldung sowie Einrichtung Ihres ersten Geräts und Dashboards.",
        breadcrumbs: [
          "Dokumentation",
          "Erste Schritte",
          "Schnellstart-Anleitung",
        ],
        sections: [
          {
            id: "step-1-install",
            title: "Schritt 1: EcoWatt installieren oder öffnen",
            description:
              "Leider gibt es derzeit keine Desktop-Anwendungen für Windows oder macOS — Desktop-Nutzer sollten einfach die Website verwenden. Für Android und iOS stehen native Apps zur Verfügung, die über den untenstehenden Link heruntergeladen werden können. Wählen Sie, was zu Ihrem Gerät und Ihren Vorlieben passt; sowohl die Website als auch die App bieten das volle EcoWatt-Erlebnis.",
            nav: {
              label: "apk/dmg",
              link: "app/link",
            },
          },
          {
            id: "step-2-create-account",
            title: "Schritt 2: Erstellen Sie Ihr Konto",
            description:
              "Gehen Sie zur Registrierungsseite und melden Sie sich mit einer eindeutigen E-Mail-Adresse an, auf die Sie Zugriff haben. Wählen Sie ein Passwort mit mindestens 6 Zeichen, darunter 1 Großbuchstabe und 1 Sonderzeichen. Prüfen Sie nach dem Absenden Ihr Postfach auf eine Bestätigungs-E-Mail und klicken Sie auf den Link, um Ihr Konto vollständig zu aktivieren.",
            nav: { label: "Hier registrieren", link: "/register" },
          },
          {
            id: "step-3-login",
            title: "Schritt 3: Anmelden",
            description:
              "Sobald Ihr Konto verifiziert ist, gehen Sie zur Anmeldeseite. Sie können sich mit Ihrem Benutzernamen und Passwort anmelden oder die passwortlose Magic-Link-Option nutzen, indem Sie Ihre E-Mail-Adresse eingeben und auf den an Ihr Postfach gesendeten Link klicken — je nachdem, was für Sie in dem Moment praktischer ist.",
            nav: { label: "Hier anmelden", link: "/login" },
          },
          {
            id: "step-4-explore-dashboard",
            title: "Schritt 4: Erkunden Sie Ihr persönliches Dashboard",
            description:
              "Nach der ersten Anmeldung gelangen Sie zu Ihrem persönlichen Dashboard. Dies ist Ihre Zentrale — hier werden Ihr aktueller und prognostizierter Stromverbrauch, Live-Preise, die Verfügbarkeit erneuerbarer Energien sowie eventuelle Vorschläge von EcoWatt zusammengefasst. Da Ihr Konto brandneu ist, kann es etwas dauern, bis die Prognosen persönlicher werden, während das System aus Ihrem tatsächlichen Nutzungsverhalten lernt.",
          },
          {
            id: "step-5-add-appliance",
            title: "Schritt 5: Fügen Sie Ihr erstes Gerät hinzu",
            description:
              "Um die intelligente Zeitplanung zu nutzen, fügen Sie über Ihr Dashboard ein Gerät hinzu (zum Beispiel eine Waschmaschine oder einen Geschirrspüler) zusammen mit dessen typischem Nutzungsmuster. Sobald es hinzugefügt wurde, bezieht EcoWatt es in die Planungsvorschläge ein — und empfiehlt optimale Zeiten für den Betrieb basierend auf Live-Preisen und der Verfügbarkeit erneuerbarer Energien, sodass Sie mit minimalem Aufwand Geld sparen und Ihren CO2-Fußabdruck verringern können.",
          },
          {
            id: "step-6-chat-with-ecky",
            title: "Schritt 6: Stellen Sie Ecky eine Frage",
            description:
              "Ecky ist der in EcoWatt integrierte KI-Assistent, der Fragen zu Ihrem Energieverbrauch in einfacher Sprache beantwortet. Probieren Sie zum Beispiel „Wann ist heute die günstigste Zeit, um meine Waschmaschine laufen zu lassen?“ oder „Wie schneidet mein Verbrauch diese Woche im Vergleich zur letzten Woche ab?“, um ein Gefühl dafür zu bekommen, wie Ecky Sie bei Ihren täglichen Entscheidungen unterstützen kann.",
          },
          {
            id: "step-7-understand-ml-badge",
            title: "Schritt 7: Verstehen Sie das ML-Badge",
            description:
              "Beim Erkunden des Dashboards werden Sie feststellen, dass einige Funktionen mit einem kleinen ML-Badge/Symbol versehen sind. Dies bedeutet lediglich, dass diese Funktion von einem Machine-Learning-Modell unterstützt wird und als hilfreicher, fundierter Vorschlag und nicht als garantierte Tatsache zu verstehen ist — die Genauigkeit ist in der Regel hoch, aber wie jedes Prognosesystem ist auch dieses nicht perfekt.",
          },
          {
            id: "step-8-manage-account",
            title: "Schritt 8: Wissen, wo Sie Ihr Konto verwalten",
            description:
              "Immer wenn Sie Ihre E-Mail-Adresse oder Ihr Passwort aktualisieren, Ihre registrierten Geräte überprüfen oder irgendwann Ihr Konto löschen möchten, finden Sie all das auf Ihrer Profilseite. Setzen Sie ein Lesezeichen dafür — sie ist Ihre Schaltzentrale für alles Kontobezogene.",
            nav: { label: "Profilseite", link: "/profile" },
          },
          {
            id: "next-steps",
            title: "Was Sie als Nächstes lesen sollten",
            description:
              "Sobald Sie mit den obigen Grundlagen vertraut sind, empfehlen wir Ihnen, die vollständige Einführungsseite zu lesen, um die Philosophie und Funktionen hinter EcoWatt genauer zu verstehen, die Konto-Seite für Details zu Sicherheit, Anmeldeoptionen sowie Richtlinien zu Kontolöschung/-wiederherstellung, und die Installationsseite, wenn Sie mehr Details zu Systemanforderungen oder zur Fehlerbehebung bei der mobilen App wünschen.",
          },
        ],
      },
    };
  } else {
    return {
      quickStart: {
        title: "Quick Guide",
        navUrl: "/docs/quickstart",
        description:
          "A fast, practical walkthrough to get you from zero to a fully set-up EcoWatt account — covering installation, account creation, your first login, and setting up your first appliance and dashboard.",
        breadcrumbs: ["Docs", "Getting Started", "Quick Guide"],
        sections: [
          {
            id: "step-1-install",
            title: "Step 1: Install or open EcoWatt",
            description:
              "We're sorry to say we don't currently have desktop applications for Windows or macOS — desktop users should simply use the website. For Android and iOS, native apps are available and can be downloaded from the link below. Choose whichever fits your device and preference; both the website and app give you the full EcoWatt experience.",
            nav: {
              label: "apk/dmg",
              link: "app/link",
            },
          },
          {
            id: "step-2-create-account",
            title: "Step 2: Create your account",
            description:
              "Head to the registration page and sign up with a unique email address you have access to. Choose a password with at least 6 characters, including 1 uppercase letter and 1 special character. After submitting, check your inbox for a verification email and click the link to activate your account fully.",
            nav: { label: "Register here", link: "/register" },
          },
          {
            id: "step-3-login",
            title: "Step 3: Log in",
            description:
              "Once your account is verified, head to the login page. You can sign in using your username and password, or use the passwordless Magic Link option by entering your email and clicking the link sent to your inbox — whichever is more convenient for you at that moment.",
            nav: { label: "Login here", link: "/login" },
          },
          {
            id: "step-4-explore-dashboard",
            title: "Step 4: Explore your personalized dashboard",
            description:
              "After logging in for the first time, you'll land on your personalized dashboard. This is your home base — it summarizes your current and predicted electricity consumption, live pricing, renewable-energy availability, and any suggestions EcoWatt has for you. Since your account is brand new, some predictions may take a little time to become more personalized as the system learns from your actual usage patterns.",
          },
          {
            id: "step-5-add-appliance",
            title: "Step 5: Add your first appliance",
            description:
              "To take advantage of smart scheduling, add an appliance from your dashboard (for example, a washing machine or dishwasher) along with its typical usage pattern. Once added, EcoWatt will start factoring it into scheduling suggestions — recommending optimal times to run it based on live pricing and renewable availability, so you can save money and reduce your carbon footprint with minimal effort.",
          },
          {
            id: "step-6-chat-with-ecky",
            title: "Step 6: Try asking Ecky a question",
            description:
              "Ecky is EcoWatt's built-in AI assistant, ready to answer questions about your energy usage in plain language. Try asking something like 'What's the cheapest time to run my washing machine today?' or 'How does my usage this week compare to last week?' to get a feel for how it can help guide your day-to-day decisions.",
          },
          {
            id: "step-7-understand-ml-badge",
            title: "Step 7: Understand the ML badge",
            description:
              "As you explore the dashboard, you'll notice some features carry a small ML badge/icon. This simply means that feature is powered by a machine learning model and should be treated as a helpful, informed suggestion rather than a guaranteed fact — accuracy is generally strong, but like any prediction system, it isn't perfect.",
          },
          {
            id: "step-8-manage-account",
            title: "Step 8: Know where to manage your account",
            description:
              "Whenever you need to update your email or password, review your registered appliances, or eventually delete your account, all of that lives on your profile page. Bookmark it — it's your control center for everything account-related.",
            nav: { label: "profile page", link: "/profile" },
          },
          {
            id: "next-steps",
            title: "What to read next",
            description:
              "Once you're comfortable with the basics above, we recommend reading the full Introduction page to understand the philosophy and features behind EcoWatt in more depth, the Account page for details on security, login options, and account deletion/recovery policies, and the Installation page if you'd like more detail on system requirements or troubleshooting the mobile app.",
          },
        ],
      },
    };
  }
};
