"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Zap,
  Copy,
  Check,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Menu,
  X,
  ExternalLink,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { DocPage, docsData } from "@ecowat/shared";
import { toast } from "sonner";
import { useLocale } from "next-intl";

export default function DocsPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const FinalDocsData = docsData(locale as keyof typeof docsData);
  const activeSlug = (params?.title as string) || "installation";

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCopyDropdown, setShowCopyDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Dynamic navigation slugs based on FinalDocsData structure
  const allSlugs = useMemo(() => {
    const slugs: string[] = [];
    if (FinalDocsData) {
      for (const pages of Object.values(FinalDocsData)) {
        if (pages && typeof pages === "object") {
          slugs.push(...Object.keys(pages));
        }
      }
    }
    return slugs;
  }, []);

  // Fetch page data dynamically with fallback
  const pageData = useMemo(() => {
    if (!FinalDocsData) return null;
    // Search in all categories of FinalDocsData
    for (const category in FinalDocsData) {
      if (FinalDocsData[category] && FinalDocsData[category][activeSlug]) {
        return FinalDocsData[category][activeSlug];
      }
    }
    // Fallback: search for introduction, or return the first page found
    for (const category in FinalDocsData) {
      if (FinalDocsData[category] && FinalDocsData[category]["introduction"]) {
        return FinalDocsData[category]["introduction"];
      }
    }
    const firstCategory = Object.keys(FinalDocsData)[0];
    if (firstCategory && FinalDocsData[firstCategory]) {
      const firstPageKey = Object.keys(FinalDocsData[firstCategory])[0];
      if (firstPageKey) {
        return FinalDocsData[firstCategory][firstPageKey];
      }
    }
    return null;
  }, [activeSlug]) as DocPage;

  // Find category for current page to display on top
  const activeCategoryName = useMemo(() => {
    if (!FinalDocsData) return "";
    for (const [categoryKey, pages] of Object.entries(FinalDocsData)) {
      if (pages && typeof pages === "object" && pages[activeSlug]) {
        return categoryKey.replace(/_/g, " ");
      }
    }
    return "";
  }, [activeSlug]);

  // Navigate calculation using dynamic slugs list
  const { prevSlug, nextSlug } = useMemo(() => {
    const idx = allSlugs.indexOf(activeSlug);
    return {
      prevSlug: idx > 0 ? allSlugs[idx - 1] : null,
      nextSlug: idx < allSlugs.length - 1 ? allSlugs[idx + 1] : null,
    };
  }, [activeSlug, allSlugs]);

  // Handle Scroll Spy for Right TOC
  useEffect(() => {
    if (!pageData.sections.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // offset for headers

      let currentActive: string | null = null;
      for (const section of pageData.sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            currentActive = section.id;
          }
        }
      }

      if (currentActive !== activeSection) {
        setActiveSection(currentActive || pageData.sections[0]?.id || null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pageData, activeSection]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(id);
    }
  };

  const copynav = (nav: string, id: string) => {
    navigator.clipboard.writeText(nav);
    setCopiedId(id);
    toast.success("nav copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyPageOption = (option: string) => {
    setShowCopyDropdown(false);
    let textToCopy = "";

    if (option === "url") {
      textToCopy = window.location.href;
      toast.success("Page URL copied!");
    } else if (option === "markdown") {
      textToCopy =
        `# ${pageData.title}\n\n${pageData.description}\n\n` +
        pageData.sections
          .map((s) => {
            let navStr = "";
            if (s.nav) {
              if (typeof s.nav === "string") {
                navStr = `\`\`\`typescript\n${s.nav}\n\`\`\``;
              } else if (s.nav.link) {
                navStr = `[Link](${s.nav.link})`;
              }
            }
            return `## ${s.title}\n${s.description || ""}\n${navStr}`;
          })
          .join("\n\n");
      toast.success("Page Markdown copied!");
    }
    navigator.clipboard.writeText(textToCopy);
  };

  const renderSidebarContent = () => (
    <div className="space-y-8 py-2">
      {FinalDocsData &&
        Object.entries(FinalDocsData).map(([categoryKey, pages]) => {
          const categoryName = categoryKey.replace(/_/g, " ");
          return (
            <div key={categoryKey}>
              <h4 className="px-3 mb-3 text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                {categoryName}
              </h4>
              <div className="space-y-1">
                {pages &&
                  typeof pages === "object" &&
                  Object.entries(pages).map(([slug, page]: [string, any]) => {
                    if (!page) return null;
                    const isActive = activeSlug === slug;
                    return (
                      <Link
                        key={slug}
                        href={`/${locale}/docs/${slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center px-3 py-1.5 text-[14px] rounded-md transition-all duration-150 ${
                          isActive
                            ? "bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary font-bold border-l-2 border-primary rounded-l-none"
                            : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900/50"
                        }`}
                      >
                        {page.title}
                      </Link>
                    );
                  })}
              </div>
            </div>
          );
        })}
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80 px-4 py-3 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur sticky top-16 z-30">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex items-center gap-2 text-[14px] text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium"
        >
          <Menu className="h-4.5 w-4.5" />
          Menu
        </button>
        <span className="text-[13px] font-semibold text-zinc-500 capitalize">
          {pageData.title}
        </span>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex gap-8">
        {/* Left Sidebar - Desktop */}
        <aside className="w-56 shrink-0 hidden md:block border-r border-zinc-200/60 dark:border-zinc-800/60 pr-6 overflow-y-auto max-h-[calc(100vh-140px)] sticky top-24 [&::-webkit-scrollbar]:hidden scrollbar-none">
          {renderSidebarContent()}
        </aside>

        {/* Center Panel (Content) */}
        <main className="flex-1 min-w-0 max-w-3xl pb-24">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 mb-5 font-medium">
            {pageData.breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb}>
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 opacity-60" />}
                <span
                  className={
                    idx === pageData.breadcrumbs.length - 1
                      ? "text-zinc-900 dark:text-zinc-200 font-semibold"
                      : ""
                  }
                >
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Action Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              {activeCategoryName && (
                <span className="text-[11px] font-bold tracking-widest text-primary uppercase block mb-1.5 animate-fade-in">
                  {activeCategoryName}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                {pageData.title}
              </h1>
            </div>

            {/* Actions: Copy Page & Arrows */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Copy Page Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowCopyDropdown(!showCopyDropdown)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800/80 rounded-md border border-zinc-200/50 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 transition-all active:scale-[0.98] select-none"
                >
                  <Copy className="h-3.5 w-3.5 text-zinc-500" />
                  Copy Page
                  <ChevronDown className="h-3.5 w-3.5 opacity-60 ml-0.5" />
                </button>

                {showCopyDropdown && (
                  <>
                    {/* Overlay to close dropdown */}
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowCopyDropdown(false)}
                    />
                    <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-1.5 z-50 animate-fade-in">
                      <button
                        onClick={() => handleCopyPageOption("url")}
                        className="w-full text-left px-3 py-2 text-[13px] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-2 font-medium"
                      >
                        <Zap className="h-3.5 w-3.5 text-emerald-500" />
                        Copy Page Link
                      </button>
                      <button
                        onClick={() => handleCopyPageOption("markdown")}
                        className="w-full text-left px-3 py-2 text-[13px] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center gap-2 font-medium"
                      >
                        <Copy className="h-3.5 w-3.5 text-zinc-400" />
                        Copy Page Markdown
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Arrow Navs */}
              <div className="flex items-center border border-zinc-200/50 dark:border-zinc-800 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
                <button
                  onClick={() =>
                    prevSlug && router.push(`/${locale}/docs/${prevSlug}`)
                  }
                  disabled={!prevSlug}
                  className={`p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${!prevSlug ? "opacity-35 cursor-not-allowed" : "active:scale-95"}`}
                  title="Previous Page"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800" />
                <button
                  onClick={() =>
                    nextSlug && router.push(`/${locale}/docs/${nextSlug}`)
                  }
                  disabled={!nextSlug}
                  className={`p-1.5 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors ${!nextSlug ? "opacity-35 cursor-not-allowed" : "active:scale-95"}`}
                  title="Next Page"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Subtitle Description */}
          {pageData.description && (
            <p
              className="text-[16px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 font-medium"
              dangerouslySetInnerHTML={{ __html: pageData.description }}
            />
          )}

          {/* Recommended Banner Alert */}
          {pageData.alert && (
            <div className="flex gap-3 px-4 py-3.5 rounded-lg border border-emerald-500/15 bg-emerald-500/4 dark:bg-emerald-500/2 text-emerald-800 dark:text-emerald-300 mb-8 items-start leading-relaxed text-[14px]">
              <Sparkles
                className="h-4.5 w-4.5 text-emerald-500 mt-0.5 shrink-0"
                fill="currentColor"
                fillOpacity={0.15}
              />
              <div className="font-medium">
                {pageData.alert.text.replace(pageData.alert.linkText || "", "")}
                {pageData.alert.linkText && pageData.alert.linkHref && (
                  <Link
                    href={pageData.alert.linkHref}
                    target={
                      pageData.alert.linkHref.startsWith("http")
                        ? "_blank"
                        : "_self"
                    }
                    className="underline font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 decoration-emerald-500/50 hover:decoration-emerald-500"
                  >
                    {pageData.alert.linkText}
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* Sections List */}
          <div className="space-y-12 mt-10">
            {pageData.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 border-t border-zinc-200/60 dark:border-zinc-800/50 pt-8 first:border-0 first:pt-0"
              >
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3 flex items-center gap-2 group">
                  {section.title}
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => scrollToSection(e, section.id)}
                    className="opacity-0 group-hover:opacity-50 text-[14px] text-zinc-400 hover:opacity-100 transition-opacity"
                  >
                    #
                  </a>
                </h2>

                {section.description && (
                  <p
                    className="text-[14.5px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 font-medium"
                    dangerouslySetInnerHTML={{ __html: section.description }}
                  />
                )}

                {/* Optional CTA Button */}
                {section.button && (
                  <div className="my-4">
                    <a
                      href={section.button.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-[13px] font-bold bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-lg hover:opacity-90 transition-all active:scale-[0.98] select-none"
                    >
                      {section.button.label}
                    </a>
                  </div>
                )}

                {/* Optional List */}
                {section.list && (
                  <ul className="list-disc pl-5 space-y-2 mb-4 text-[14px] text-zinc-600 dark:text-zinc-400 font-medium">
                    {section.list.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}

                {/* Optional Framework Cards Grid */}
                {section.cards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {section.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-[#18181b]/20 hover:border-emerald-500/40 dark:hover:border-emerald-500/30 transition-colors"
                      >
                        <h4 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100 mb-1 flex items-center justify-between">
                          {card.title}
                          <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 opacity-60" />
                        </h4>
                        <p className="text-[12.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                          {card.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* nav Terminal Snippet / Link */}
                {section.nav &&
                  (typeof section.nav === "string" ? (
                    <div className="relative mt-4 group">
                      <div className="bg-[#09090b] dark:bg-[#030712] border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm font-mono text-[13px] text-zinc-300">
                        {/* Terminal header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-zinc-950/70 select-none border-b border-zinc-800">
                          <div className="flex gap-1.5 items-center">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]" />
                            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                            <span className="text-[11px] font-bold text-zinc-500 tracking-wide uppercase ml-2.5">
                              Terminal
                            </span>
                          </div>
                          {/* Inline copy button */}
                          <button
                            onClick={() =>
                              copynav(section.nav as string, section.id)
                            }
                            className="flex h-7 px-2.5 items-center gap-1.5 rounded-md bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-[11px] text-zinc-400 hover:text-zinc-200 transition-all active:scale-[0.97] cursor-pointer"
                            title="Copy nav"
                          >
                            {copiedId === section.id ? (
                              <>
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                                <span className="text-emerald-400 font-bold">
                                  Copied
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* nav body */}
                        <pre className="p-4 overflow-x-auto leading-relaxed select-text whitespace-pre-wrap">
                          <nav>{section.nav}</nav>
                        </pre>
                      </div>
                    </div>
                  ) : (
                    section.nav.link && (
                      <div className="mt-4">
                        <Link
                          href={section.nav.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-bold bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-lg transition-all active:scale-[0.98] select-none"
                        >
                          {section.nav.label}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )
                  ))}
              </section>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Desktop TOC */}
        <aside className="w-56 shrink-0 hidden lg:block overflow-y-auto max-h-[calc(100vh-140px)] sticky top-24 pl-2 [&::-webkit-scrollbar]:hidden scrollbar-none">
          {pageData.sections.length > 0 && (
            <div className="mb-6">
              <h4 className="text-[11px] font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase mb-3 px-1">
                On This Page
              </h4>
              <div className="space-y-2 border-l border-zinc-200 dark:border-zinc-800/60 pl-2">
                {pageData.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={(e) => scrollToSection(e, sec.id)}
                    className={`block py-0.5 text-[13.5px] transition-all font-medium duration-150 truncate ${
                      activeSection === sec.id
                        ? "text-emerald-500 dark:text-emerald-400 font-semibold"
                        : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                    }`}
                  >
                    {sec.title}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-white dark:bg-[#09090b] border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col overflow-y-auto animate-slide-in-right [&::-webkit-scrollbar]:hidden scrollbar-none">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-bold text-emerald-500 tracking-wide text-[15px] flex items-center gap-1.5">
                <Zap className="h-4 w-4" fill="currentColor" />
                Docs Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </div>
  );
}
