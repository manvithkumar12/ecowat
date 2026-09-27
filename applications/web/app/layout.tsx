import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/Theme/themeProvider";
import { TooltipProvider } from "@/shadcn/ui/tooltip";
import { Toaster } from "@/shadcn/ui/sonner";
import QueryProvider from "@/src/Providers/query-provider";
import { UserProvider } from "@/src/context/userContext";
import { getUser } from "@/lib/currentUser";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "EcoWatt — Smart Energy Forecasting",
  description:
    "AI-powered household energy forecasting and appliance scheduling. Predict usage, reduce costs, and align with renewable energy availability.",
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <ThemeProvider>
            <UserProvider user={user}>
              <TooltipProvider delayDuration={100}>{children}</TooltipProvider>
            </UserProvider>
            <Toaster position="bottom-right" richColors />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
