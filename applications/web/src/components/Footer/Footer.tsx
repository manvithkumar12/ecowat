import { Zap } from "lucide-react";
import Link from "next/link";
import { FooterNewsletter } from "./FooterNewsletter";
import { useTranslations } from "next-intl";

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FooterLinkList({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="group relative text-[12.5px] text-muted-foreground hover:text-foreground transition-colors duration-150 inline-block"
          >
            {link.label}
            <span className="absolute -bottom-px left-0 h-px w-0 bg-emerald-500 group-hover:w-full transition-all duration-200" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

const Footer = () => {
  const t = useTranslations("Footer");

  const PRODUCT_LINKS = [
    { label: t("features"), href: "#" },
    { label: t("forecasting"), href: "#" },
    { label: t("analytics"), href: "#" },
    { label: t("smartRecommendations"), href: "#" },
    { label: t("applianceScheduling"), href: "#" },
  ];

  const RESOURCE_LINKS = [
    { label: t("documentation"), href: "#" },
    { label: t("apiReference"), href: "#" },
    { label: t("blog"), href: "#" },
    { label: t("helpCenter"), href: "#" },
    { label: t("faq"), href: "#" },
  ];

  const COMPANY_LINKS = [
    { label: t("about"), href: "#" },
    { label: t("contact"), href: "#" },
    { label: t("careers"), href: "#" },
    { label: t("privacyPolicy"), href: "#" },
    { label: t("termsOfService"), href: "#" },
  ];

  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="px-8 max-w-400 mx-auto py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-emerald-500" fill="currentColor" />
              <span className="text-[14px] font-bold text-foreground tracking-tight">
                EcoWatt
              </span>
            </div>
            <p className="text-[12.5px] text-muted-foreground leading-relaxed max-w-[220px]">
              {t("description")}
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
              >
                <GithubIcon />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
              >
                <LinkedinIcon />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
              >
                <XIcon />
              </a>
            </div>
          </div>

          {/* Column 2 — Product */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground/60">
              {t("product")}
            </h4>
            <FooterLinkList links={PRODUCT_LINKS} />
          </div>

          {/* Column 3 — Resources */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground/60">
              {t("resources")}
            </h4>
            <FooterLinkList links={RESOURCE_LINKS} />
          </div>

          {/* Column 4 — Company */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground/60">
              {t("company")}
            </h4>
            <FooterLinkList links={COMPANY_LINKS} />
          </div>

          {/* Column 5 — Newsletter */}
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-foreground/60">
              {t("stayUpdated")}
            </h4>
            <p className="text-[12px] text-muted-foreground leading-relaxed">
              {t("newsletterDesc")}
            </p>
            <FooterNewsletter />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="px-8 max-w-400 mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-center sm:text-left">
            <p className="text-[11px] text-muted-foreground/60">
              © {new Date().getFullYear()} {t("copyright")}
            </p>
            <span className="hidden sm:block text-border">·</span>
            <p className="text-[11px] text-muted-foreground/50">
              {t("builtWith")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
