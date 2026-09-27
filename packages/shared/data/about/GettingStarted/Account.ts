import { DocPage } from "../../docs.types";

export const Account = (lang: any): Record<string, DocPage> => {
  if (lang === "de") {
    return {
      Account: {
        title: "Kontoeinstellungen",
        navUrl: "/docs/Account",
        description:
          "Alles Wichtige zum Erstellen, Absichern, Verwalten und, falls nötig, Löschen Ihres EcoWatt-Kontos. Diese Seite behandelt Registrierungsanforderungen, Anmeldemethoden, Wiederherstellungsoptionen, Datenschutzeinstellungen und Richtlinien zum Kontolebenszyklus.",
        breadcrumbs: ["Dokumentation", "Erste Schritte", "Konto"],
        sections: [
          {
            id: "creation-of-account",
            title: "So erstellen Sie ein Konto",
            description:
              "Die Erstellung eines EcoWatt-Kontos dauert weniger als eine Minute. Gehen Sie zur Registrierungsseite und geben Sie eine gültige, eindeutige E-Mail-Adresse an, die noch nicht bei uns registriert ist — diese E-Mail wird für die Anmeldung, die Kontowiederherstellung und wichtige Benachrichtigungen verwendet, stellen Sie also sicher, dass Sie Zugriff darauf haben. Wählen Sie anschließend ein Passwort, das unseren Sicherheitsanforderungen entspricht: mindestens 6 Zeichen lang, mit mindestens 1 Großbuchstaben und mindestens 1 Sonderzeichen (wie !, @, #, $ oder %). Diese Regeln dienen dazu, Ihr Konto vor gängigen Brute-Force- und Wörterbuchangriffen zu schützen. Nach dem Absenden des Formulars senden wir Ihnen einen Bestätigungslink per E-Mail — klicken Sie darauf, um Ihr Konto zu aktivieren. Bis die Verifizierung abgeschlossen ist, bleiben einige Funktionen (wie Geräteplanung und Benachrichtigungen) gesperrt.",
            nav: { label: "Hier registrieren", link: "/register" },
          },
          {
            id: "password-strength-tips",
            title: "Tipps für ein starkes Passwort",
            description:
              "Obwohl wir nur 6 Zeichen, 1 Großbuchstaben und 1 Sonderzeichen verlangen, empfehlen wir dringend, über das Minimum hinauszugehen. Längere Passwörter (12+ Zeichen) sind exponentiell schwerer zu knacken. Vermeiden Sie leicht zu erratende Angaben wie Ihren Namen, Geburtstag oder das Wort „Passwort“. Nutzen Sie am besten eine Passphrase — einen kurzen Satz oder eine Kombination unzusammenhängender Wörter, gemischt mit einem Sonderzeichen und einer Zahl. Verwenden Sie niemals ein Passwort erneut, das Sie bereits für andere wichtige Konten wie Online-Banking oder E-Mail nutzen. Sollten Sie vermuten, dass Ihr Passwort kompromittiert wurde, ändern Sie es sofort in Ihren Profileinstellungen.",
          },
          {
            id: "login-user",
            title: "So melden Sie sich an",
            description:
              "Rufen Sie über den untenstehenden Link die Anmeldeseite auf. Dort haben Sie zwei Möglichkeiten, sich anzumelden: (1) Magic Link — geben Sie Ihre registrierte E-Mail-Adresse ein, und wir senden Ihnen einen einmaligen, sicheren Link, mit dem Sie sich sofort ohne Passwort anmelden können, ideal für den schnellen Zugriff auf gemeinsam genutzten oder neuen Geräten, oder (2) Benutzername/Passwort — geben Sie Ihre Zugangsdaten direkt ein und melden Sie sich wie gewohnt an. Beide Methoden sind gleichermaßen sicher; Magic Links sind lediglich eine passwortlose Komfortoption. Wenn Sie mehrfach falsche Zugangsdaten eingeben, kann Ihr Konto aus Sicherheitsgründen vorübergehend eingeschränkt werden.",
            nav: { label: "Hier anmelden", link: "/login" },
          },
          {
            id: "magic-link-details",
            title: "Wie funktioniert die Anmeldung per Magic Link?",
            description:
              "Wenn Sie einen Magic Link anfordern, generieren wir ein eindeutiges, zeitlich begrenztes Einmal-Token und senden es an Ihre registrierte Adresse. Ein Klick auf den Link authentifiziert Ihre Sitzung automatisch — kein Passwort erforderlich. Diese Links laufen aus Sicherheitsgründen nach kurzer Zeit ab (in der Regel 15 Minuten) und können nur einmal verwendet werden. Falls der Link abläuft, bevor Sie ihn anklicken, fordern Sie einfach über die Anmeldeseite einen neuen an. Diese Methode ist besonders nützlich, wenn Sie Ihr Passwort vergessen haben oder sich von einem Gerät aus anmelden, auf dem die Eingabe eines Passworts unpraktisch ist.",
          },
          {
            id: "other-platform",
            title:
              "Kann ich mich mit anderen Plattformen anmelden (Google, Apple usw.)?",
            description:
              "Noch nicht. Derzeit unterstützt EcoWatt nur die Authentifizierung per E-Mail/Passwort und Magic Link — Anmeldungen über soziale oder Drittanbieter-Dienste wie Google, Apple, Facebook oder GitHub werden noch nicht unterstützt. Dies steht auf unserer Roadmap und wird in einem zukünftigen Update hinzugefügt, um den Einstieg noch schneller zu machen. Seien Sie versichert, dass Ihr bestehendes Konto und Ihre Daten davon nicht betroffen sind, wenn diese Funktion eingeführt wird; wahrscheinlich können Sie dann einfach ein soziales Konto mit Ihrem bestehenden Profil verknüpfen, statt sich neu registrieren zu müssen.",
          },
          {
            id: "forgot-password",
            title: "Ich habe mein Passwort vergessen, was tue ich?",
            description:
              "Kein Problem — klicken Sie auf der Anmeldeseite auf „Passwort vergessen“ und geben Sie Ihre registrierte E-Mail-Adresse ein. Wir senden Ihnen einen sicheren Link zum Zurücksetzen, mit dem Sie ein neues Passwort festlegen können. Der Link läuft aus Sicherheitsgründen nach begrenzter Zeit ab, nutzen Sie ihn also zeitnah. Falls Sie die E-Mail nicht innerhalb weniger Minuten erhalten, prüfen Sie Ihren Spam-Ordner, vergewissern Sie sich, dass Sie die richtige E-Mail-Adresse eingegeben haben, oder fordern Sie den Link erneut an. Sollten weiterhin Probleme bestehen, kontaktieren Sie uns direkt für Unterstützung.",
          },
          {
            id: "change-email-password",
            title:
              "Wie aktualisiere ich meine E-Mail-Adresse oder mein Passwort?",
            description:
              "Sie können sowohl Ihre E-Mail-Adresse als auch Ihr Passwort auf der Profilseite unter Kontoeinstellungen aktualisieren. Beim Ändern Ihrer E-Mail-Adresse senden wir einen Bestätigungslink an die neue Adresse, um den Besitz zu verifizieren, bevor die Änderung wirksam wird — Ihre alte E-Mail-Adresse bleibt bis zum Abschluss der Bestätigung aktiv, sodass Sie während des Übergangs nie ausgesperrt werden. Beim Ändern Ihres Passworts werden Sie zunächst zur erneuten Eingabe Ihres aktuellen Passworts als Sicherheitsprüfung aufgefordert und legen anschließend ein neues fest, das unseren Passwortanforderungen entspricht.",
            nav: { label: "Profilseite", link: "/profile" },
          },
          {
            id: "two-factor-auth",
            title:
              "Unterstützt EcoWatt die Zwei-Faktor-Authentifizierung (2FA)?",
            description:
              "Die Zwei-Faktor-Authentifizierung ist derzeit nicht verfügbar, aber im Rahmen unserer laufenden Sicherheits-Roadmap für eine zukünftige Version geplant. Sobald sie verfügbar ist, können Sie sie in den Sicherheitseinstellungen Ihres Profils aktivieren, um über Ihr Passwort hinaus eine zusätzliche Schutzebene hinzuzufügen — typischerweise über eine Authenticator-App oder E-Mail-basierte Einmalcodes. Wir werden diese Funktion bei der Einführung deutlich ankündigen.",
          },
          {
            id: "session-management",
            title:
              "Kann ich sehen oder verwalten, welche Geräte in meinem Konto angemeldet sind?",
            description:
              "Die Sitzungs- und Geräteverwaltung steht auf unserer Roadmap. Künftig zeigt Ihr Profil eine Liste aktiver Sitzungen/Geräte mit Details wie ungefährem Standort und letzter Aktivität, und Sie können sich aus der Ferne von jeder Sitzung abmelden, die Sie nicht erkennen. Sollten Sie derzeit einen unbefugten Zugriff vermuten, ist der sicherste Schritt, Ihr Passwort sofort zu ändern — dadurch werden bestehende Sitzungen ungültig.",
          },
          {
            id: "profile-privacy",
            title: "Welche Informationen sind für andere sichtbar?",
            description:
              "EcoWatt ist ein persönliches Energiemanagement-Tool und keine soziale Plattform — Ihre Profildaten, Verbrauchsdaten, Geräte und Prognosen sind privat und für andere Nutzer nicht sichtbar. Derzeit gibt es keine öffentlichen Profile oder Social-/Sharing-Funktionen. Sollte sich dies in Zukunft ändern (zum Beispiel durch gemeinschaftliche Energiespar-Ranglisten), wird dies stets optional sein und vorab klar erläutert.",
          },
          {
            id: "delete-account",
            title: "So löschen Sie Ihr Konto",
            description:
              "Wenn Sie Ihr Konto löschen möchten, haben Sie zwei Möglichkeiten: Besuchen Sie Ihre Profilseite und nutzen Sie die Option „Konto löschen“ in den Einstellungen, oder senden Sie uns direkt eine E-Mail an <b>ecowatt.auth@gmail.com</b> von Ihrer registrierten E-Mail-Adresse aus mit Ihrer Anfrage. Wir bearbeiten manuelle Anfragen so schnell wie möglich. Überlegen Sie vor dem Löschen, ob Sie nicht lieber eine Pause einlegen möchten — Sie können sich jederzeit abmelden und später zurückkehren, ohne Ihre Daten zu verlieren.",
            nav: { label: "Profilseite", link: "/profile" },
          },
          {
            id: "prmeanent-delete",
            title: "Wird mein Konto sofort endgültig gelöscht?",
            description:
              "Nicht sofort. Wenn Sie die Löschung beantragen, tritt Ihr Konto in eine 30-tägige Karenz-/Testphase ein, statt sofort gelöscht zu werden. In diesem Zeitraum bleiben Ihre Daten erhalten, Ihr Konto ist jedoch deaktiviert. Wenn Sie es sich anders überlegen, melden Sie sich einfach innerhalb dieser 30 Tage erneut an, um den vollen Zugriff automatisch wiederherzustellen — nichts geht verloren. Alternativ können Sie uns von Ihrer registrierten E-Mail-Adresse aus eine E-Mail an <b>ecowatt.auth@gmail.com</b> senden, um eine Reaktivierung zu beantragen. Sobald die 30-tägige Frist ohne Wiederherstellungsaktion verstrichen ist, werden Ihr Konto und die zugehörigen Daten dauerhaft und unwiderruflich aus unseren Systemen gelöscht.",
          },
          {
            id: "data-export",
            title:
              "Kann ich meine Daten vor dem Löschen meines Kontos exportieren?",
            description:
              "Ein Self-Service-Tool zum Datenexport ist noch nicht verfügbar, aber etwas, das wir gerne hinzufügen möchten, damit Sie stets die volle Eigentümerschaft und Übertragbarkeit Ihres Verbrauchsverlaufs, Ihrer Zeitpläne und Prognosen haben. Wenn Sie in der Zwischenzeit vor dem Löschen Ihres Kontos eine Kopie Ihrer Daten benötigen, senden Sie uns eine E-Mail an <b>ecowatt.auth@gmail.com</b>, und wir helfen Ihnen nach besten Kräften manuell weiter.",
          },
          {
            id: "account-security-general",
            title: "Allgemeine Best Practices für die Kontosicherheit",
            description:
              "Über ein starkes Passwort hinaus empfehlen wir: Geben Sie Ihre Zugangsdaten oder Magic-Link-E-Mails niemals an andere weiter, seien Sie vorsichtig bei Phishing-E-Mails, die vorgeben, von EcoWatt zu stammen (wir werden Sie niemals per E-Mail nach Ihrem Passwort fragen), melden Sie sich nach der Nutzung von gemeinsam genutzten oder öffentlichen Geräten ab, und schützen Sie das E-Mail-Konto, das mit Ihrem EcoWatt-Profil verknüpft ist, da es der Wiederherstellungspunkt für Ihr Konto ist. Sollten Sie ungewöhnliche Aktivitäten bemerken, ändern Sie umgehend Ihr Passwort und kontaktieren Sie uns.",
          },
          {
            id: "contact-account-support",
            title: "An wen wende ich mich bei kontobezogenen Problemen?",
            description:
              "Bei allem, was Registrierung, Anmeldeprobleme, Kontowiederherstellung oder Löschanfragen betrifft, senden Sie uns eine E-Mail direkt an <b>ecowatt.auth@gmail.com</b>. Bitte wenden Sie sich nach Möglichkeit von Ihrer registrierten E-Mail-Adresse aus an uns, da dies uns hilft, Ihre Identität schneller zu verifizieren und Ihr Anliegen sicherer zu lösen.",
          },
        ],
      },
    };
  }
  return {
    Account: {
      title: "Account settings",
      navUrl: "/docs/Account",
      description:
        "Everything you need to know about creating, securing, managing, and, if you ever need to, deleting your EcoWatt account. This page covers registration requirements, login methods, recovery options, privacy controls, and account lifecycle policies.",
      breadcrumbs: ["Docs", "Getting Started", "Account"],
      sections: [
        {
          id: "creation-of-account",
          title: "How to Create an Account",
          description:
            "Creating an EcoWatt account takes less than a minute. Head over to the registration page and provide a valid, unique email address that isn't already registered with us — this email will be used for login, account recovery, and important notifications, so make sure you have access to it. Next, choose a password that meets our security requirements: at least 6 characters long, containing at least 1 uppercase letter and at least 1 special character (such as !, @, #, $, or %). We enforce these rules to keep your account safe from common brute-force and dictionary attacks. Once you submit the form, we'll send a verification link to your email — click it to activate your account. Until verification is complete, some features (like appliance scheduling and notifications) will remain locked.",
          nav: { label: "Register here", link: "/register" },
        },
        {
          id: "password-strength-tips",
          title: "Tips for a Strong Password",
          description:
            "While we only require 6 characters, 1 uppercase letter, and 1 special character, we strongly recommend going beyond the minimum. Longer passwords (12+ characters) are exponentially harder to crack. Avoid using easily guessable information like your name, birthday, or the word 'password'. Consider using a passphrase — a short sentence or combination of unrelated words with a special character and number mixed in. Never reuse a password you use on other important accounts such as banking or email. If you ever suspect your password has been compromised, change it immediately from your profile settings.",
        },
        {
          id: "login-user",
          title: "How to Login",
          description:
            "Navigate to the login page using the link below. From there you have two ways to sign in: (1) Magic Link — enter your registered email and we'll send you a one-time secure link that logs you in instantly without needing a password, great for quick access on shared or new devices, or (2) Username/Password — enter your credentials directly and sign in as usual. Both methods are equally secure; magic links are simply a passwordless convenience option. If you enter incorrect credentials multiple times, your account may be temporarily rate-limited for security purposes.",
          nav: { label: "Login here", link: "/login" },
        },
        {
          id: "magic-link-details",
          title: "How does Magic Link login work",
          description:
            "When you request a magic link, we generate a unique, time-limited, single-use token and email it to your registered address. Clicking the link authenticates your session automatically — no password required. These links expire after a short window (typically 15 minutes) for security, and can only be used once. If the link expires before you click it, simply request a new one from the login page. This method is especially useful if you've forgotten your password or are logging in from a device where typing a password isn't convenient.",
        },
        {
          id: "other-platform",
          title: "Can I login with other platforms (Google, Apple, etc.)?",
          description:
            "Not yet. Currently EcoWatt only supports email/password and magic-link authentication — we don't yet support social or third-party logins such as Google, Apple, Facebook, or GitHub. This is on our roadmap and will be added in a future update to make onboarding even faster. Rest assured your existing account and data won't be affected when this is introduced; we'll likely allow you to simply link a social account to your existing profile rather than forcing a new signup.",
        },
        {
          id: "forgot-password",
          title: "I forgot my password, what do I do?",
          description:
            "No problem — click 'Forgot Password' on the login page and enter your registered email. We'll send a secure reset link that lets you set a new password. The reset link expires after a limited time for security reasons, so use it promptly. If you don't receive the email within a few minutes, check your spam folder, confirm you entered the correct email, or try requesting the link again. If you still face trouble, reach out to us directly for help.",
        },
        {
          id: "change-email-password",
          title: "How do I update my email or password?",
          description:
            "You can update both your email address and password from the Profile page under Account Settings. When changing your email, we'll send a confirmation link to the new address to verify ownership before the change takes effect — your old email will remain active until confirmation is complete, so you're never locked out mid-transition. When changing your password, you'll be asked to re-enter your current password first as a security check, then set a new one that meets our password requirements.",
          nav: { label: "profile page", link: "/profile" },
        },
        {
          id: "two-factor-auth",
          title: "Does EcoWatt support Two-Factor Authentication (2FA)?",
          description:
            "Two-factor authentication is not currently available but is planned for a future release as part of our ongoing security roadmap. Once available, you'll be able to enable it from your profile's security settings to add an extra layer of protection beyond just your password — typically via an authenticator app or email-based one-time codes. We'll announce this feature prominently when it launches.",
        },
        {
          id: "session-management",
          title: "Can I see or manage devices logged into my account?",
          description:
            "Session and device management is on our roadmap. In the future, your profile will show a list of active sessions/devices with details like approximate location and last-active time, and you'll be able to remotely log out of any session you don't recognize. For now, if you suspect unauthorized access, the safest step is to change your password immediately, which will invalidate existing sessions.",
        },
        {
          id: "profile-privacy",
          title: "What information is visible to others?",
          description:
            "EcoWatt is a personal energy-management tool, not a social platform — your profile details, consumption data, appliances, and predictions are private to you and are not visible to other users. There is currently no public profile or social/sharing feature. If this changes in the future (for example, community energy-saving leaderboards), it will always be opt-in and clearly explained beforehand.",
        },
        {
          id: "delete-account",
          title: "How to delete your account",
          description:
            "If you'd like to delete your account, you have two options: visit your Profile page and use the 'Delete Account' option under settings, or email us directly at <b>ecowatt.auth@gmail.com</b> from your registered email address with your request. We'll process manual requests as quickly as possible. Before deleting, consider whether you'd rather just take a break — you can always log out and come back later without losing your data.",
          nav: { label: "profile page", link: "/profile" },
        },
        {
          id: "prmeanent-delete",
          title: "Will my account be deleted permanently right away?",
          description:
            "Not immediately. When you request deletion, your account enters a 30-day grace/trial period rather than being erased instantly. During this window, your data is preserved but your account is deactivated. If you change your mind, simply log back in during those 30 days to automatically restore full access — nothing will be lost. Alternatively you can email us at <b>ecowatt.auth@gmail.com</b> from your registered email to request reactivation. Once the 30-day period passes without any recovery action, your account and associated data are permanently and irreversibly deleted from our systems.",
        },
        {
          id: "data-export",
          title: "Can I export my data before deleting my account?",
          description:
            "A self-service data export tool isn't available yet, but it's something we'd like to add so you always have full ownership and portability of your consumption history, schedules, and predictions. In the meantime, if you need a copy of your data before deleting your account, email us at <b>ecowatt.auth@gmail.com</b> and we'll do our best to help manually.",
        },
        {
          id: "account-security-general",
          title: "General account security best practices",
          description:
            "Beyond a strong password, we recommend: never sharing your login credentials or magic-link emails with anyone, being cautious of phishing emails pretending to be from EcoWatt (we will never ask for your password via email), logging out of shared or public devices after use, and keeping the email account tied to your EcoWatt profile secure since it's the recovery point for your account. If you ever notice unfamiliar activity, change your password immediately and contact us.",
        },
        {
          id: "contact-account-support",
          title: "Who do I contact for account-related issues?",
          description:
            "For anything related to registration, login problems, account recovery, or deletion requests, email us directly at <b>ecowatt.auth@gmail.com</b>. Please reach out from your registered email address whenever possible, as this helps us verify your identity faster and resolve your issue more securely.",
        },
      ],
    },
  };
};
