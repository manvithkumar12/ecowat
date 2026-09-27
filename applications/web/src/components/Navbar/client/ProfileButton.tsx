"use client";

import { useUser } from "@/src/context/userContext";
import { logoutService } from "@ecowat/shared";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { clearClientStorage } from "@/src/utils/storage/clearClientStorage";

const ProfileButton = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useUser();
  const t = useTranslations("profile");
  const handleLogout = async () => {
    try {
      const res = await logoutService("");
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.code ?? "An error occured");
        return;
      }
      clearClientStorage();
      toast.success(data.code || "Logout Successfull");
      window.location.href = "/en/login";
    } catch (error: any) {
      toast.error(error.message || "LOGOUT_FAILED");
    }
  };
  return (
    <>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 rounded-full p-1 transition-colors hover:bg-muted/80 focus:outline-none"
      >
        <div className="h-7 w-7 rounded-full bg-linear-to-tr from-primary to-emerald-600 flex items-center justify-center text-white text-[11px] font-medium shadow-sm">
          {user?.name.split("")[0].toUpperCase() ?? "U"}
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-muted-foreground/70 mr-0.5" />
      </button>

      {isProfileOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsProfileOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card p-1 shadow-lg z-50 animate-in fade-in slide-in-from-top-2">
            <div className="px-2 py-2.5 border-b border-border mb-1">
              <p className="text-sm font-medium leading-none text-card-foreground">
                {user?.name ?? "User"}
              </p>
              <p className="text-xs text-muted-foreground mt-1.5">
                {user?.email ?? "user@gmail.com"}
              </p>
            </div>
            <div className="flex flex-col gap-0.5">
              <Link href={"/profile"}>
                <button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                  <User className="h-4 w-4" />
                  {t("profile")}
                </button>
              </Link>
              <div className="h-px bg-border my-1" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-500 transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                {t("Logout")}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileButton;
