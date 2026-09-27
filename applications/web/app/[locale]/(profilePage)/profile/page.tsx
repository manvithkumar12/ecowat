"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/shadcn/ui/card";
import { Avatar, AvatarFallback } from "@/shadcn/ui/avatar";
import { Loader2, User } from "lucide-react";
import { useState } from "react";
import { useUser } from "@/src/context/userContext";
import { useTranslations } from "next-intl";
import Delete from "@/src/components/profile/Delete";
import ChangePassword from "@/src/components/profile/ChangePassword";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");

  const user = useUser();
  const t = useTranslations("Profile");

  const isVerified = (val?: boolean) => {
    if (val === undefined) return null;
    return val
      ? ` ${t("personalInfo.yes")} ${t("personalInfo.Verified")}`
      : `${t("personalInfo.no")} ${t("personalInfo.Verified")}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <Loader2 className="animate-spin h-12 w-12 text-emerald-500" />
        <p className="text-sm text-slate-600 dark:text-stone-400">
          {t("loading")}
        </p>
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      {/* Page Header */}
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {t("header.title")}
        </h1>
        <p className="text-sm text-slate-600 dark:text-stone-400">
          {t("header.description")}
        </p>
      </header>

      {/* Profile Card */}
      <div className="flex flex-col md:flex-row gap-5 ">
        <Card className="flex flex-col items-center p-6 bg-white dark:bg-[#0c0a09] border border-slate-200 dark:border-stone-800 shadow-sm rounded-2xl">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-4 border-white dark:border-[#0c0a09] bg-linear-to-br from-emerald-100 to-emerald-200">
              <AvatarFallback className="bg-emerald-500 text-white">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>
            {/* Online status indicator */}
            <span className="absolute bottom-0 right-0 block h-4 w-4 rounded-full ring-2 ring-white dark:ring-[#0c0a09] bg-emerald-500" />
          </div>
          <CardContent className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100">
              {user?.name}
            </h2>
            <p className="text-sm text-slate-600 dark:text-stone-400">
              {user?.email}
            </p>
          </CardContent>
        </Card>

        {/* Personal Information Card */}
        <Card className="border border-slate-200 dark:border-stone-800 bg-white dark:bg-[#0c0a09] shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-900 dark:text-white">
              {t("personalInfo.title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-stone-400">
                {t("personalInfo.fullName")}
              </p>
              <p className="text-sm text-slate-900 dark:text-stone-100">
                {user?.name}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-stone-400">
                {t("personalInfo.email")}
              </p>
              <p className="text-sm text-slate-900 dark:text-stone-100">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-stone-400">
                {t("personalInfo.isVerified")}
              </p>
              <p className="text-sm text-slate-900 dark:text-stone-100">
                {isVerified(user?.hasEnergyId) ?? "Nan"}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-stone-400">
                {t("personalInfo.id")}
              </p>
              <p className="text-sm text-slate-900 dark:text-stone-100">
                {user?.id}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <ChangePassword
          isPasswordDialogOpen={isPasswordDialogOpen}
          setIsPasswordDialogOpen={setIsPasswordDialogOpen}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          t={t}
        />
        <Delete
          isDeleteDialogOpen={isDeleteDialogOpen}
          setIsDeleteDialogOpen={setIsDeleteDialogOpen}
          deleteConfirmationText={deleteConfirmationText}
          setDeleteConfirmationText={setDeleteConfirmationText}
          t={t}
        />
      </div>
    </section>
  );
}
