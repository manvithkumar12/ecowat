import { Link } from "@/src/i18n/routing";
import LanguageSwitcher from "@/src/components/Navbar/client/LanguageSwitcher";
import RegisterForm from "@/src/components/register/client/RegisterForm";
import { useTranslations } from "next-intl";

export default function RegisterSection() {
  const t = useTranslations("Auth.register");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="w-full max-w-110 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1f1f1f] rounded-2xl shadow-sm px-8 py-8">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            {t("subtitle")}
          </p>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Sign in link */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          {t("alreadyHaveAccount")}{" "}
          <Link
            href="/login"
            className="font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
          >
            {t("signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
