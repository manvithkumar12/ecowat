import { Link } from "@/src/i18n/routing";
import LanguageSwitcher from "@/src/components/Navbar/client/LanguageSwitcher";
import LoginForm from "@/src/components/login/client/loginForm";
import MagicLink from "./client/MagicLink";
import { useTranslations } from "next-intl";

export default function LoginSection() {
  const t = useTranslations("Auth.login");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-6">
      <div className="w-full max-w-110 bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1f1f1f] rounded-2xl shadow-sm px-8 py-8">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>

        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            {t("subtitle")}
          </p>
        </div>
        <MagicLink />
        {/* Divider */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-slate-100 dark:bg-[#2a2a2a]" />
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            {t("or")}
          </span>
          <div className="flex-1 h-px bg-slate-100 dark:bg-[#2a2a2a]" />
        </div>

        <LoginForm />

        {/* Create account */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          {t("noAccount")}{" "}
          <Link
            href="/register"
            className="font-semibold text-emerald-500 hover:text-emerald-600 transition-colors"
          >
            {t("createAccount")}
          </Link>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-6 text-center text-[11px] text-slate-400 dark:text-slate-500 max-w-[320px] leading-relaxed">
        {t("termsPrefix")}{" "}
        <Link
          href="#"
          className="underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {t("termsOfService")}
        </Link>{" "}
        {t("and")}{" "}
        <Link
          href="#"
          className="underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
        >
          {t("privacyPolicy")}
        </Link>
        .
      </p>
    </div>
  );
}
