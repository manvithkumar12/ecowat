"use client";
import DashboardNavbar from "@/src/components/Dashboard/DashboardNavbar";
import Sidebar from "@/src/components/Dashboard/Sidebar";
import { LivePriceProvider } from "@/src/context/usePriceData";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const currentPage =
    pathname.split("/")[2]?.charAt(0).toLowerCase() +
    pathname.split("/")[2]?.slice(1);
  return (
    <div className="h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 flex transition-colors duration-300 overflow-hidden">
      <Sidebar currentPage={currentPage} />
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto relative">
          <LivePriceProvider>
            <DashboardNavbar />
          </LivePriceProvider>
          {children}
        </div>
      </div>
    </div>
  );
}
