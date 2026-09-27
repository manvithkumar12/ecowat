"use client";

import Footer from "@/src/components/Footer/Footer";
import { Navbar } from "@/src/components/Navbar/navbar";
import { ResponsiveToaster } from "@/src/components/Toaster/SonnerToaster";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      (args[0].includes("width(-1)") ||
        args[0].includes("height(-1)") ||
        args[0].includes("should be greater than 0"))
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export default function LocaleLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBypassedPage =
    pathname?.includes("/login") ||
    pathname?.includes("/register") ||
    pathname?.includes("/forecast") ||
    pathname?.includes("/recommendations") ||
    pathname?.includes("/appliances") ||
    pathname?.includes("/footprint") ||
    pathname?.includes("/tracker") ||
    pathname?.includes("/schedule") ||
    pathname?.includes("/ecky") ||
    pathname?.includes("/price-history") ||
    pathname?.includes("/dashboard");

  if (isBypassedPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <ResponsiveToaster />
    </>
  );
}
