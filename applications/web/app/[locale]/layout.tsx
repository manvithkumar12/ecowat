import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import LocaleLayoutClient from "./LocaleLayoutClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      locale: locale === "de" ? "de_DE" : "en_US",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocaleLayoutClient>{children}</LocaleLayoutClient>
    </NextIntlClientProvider>
  );
}
