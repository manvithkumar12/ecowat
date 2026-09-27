"use client";

import { usePathname } from "next/navigation";
import Footer from "@/src/components/Footer/Footer";
import { Navbar } from "@/src/components/Navbar/navbar";
import { ResponsiveToaster } from "@/src/components/Toaster/SonnerToaster";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isBypassedPage =
    pathname?.includes("/login") || pathname?.includes("/register");

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
