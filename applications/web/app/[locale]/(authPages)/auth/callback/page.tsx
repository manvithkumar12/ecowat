"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { callBackApi } from "@/ApiServices/callback";

export default function CallbackPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const openAppOrDashboard = () => {
    const fallback = setTimeout(() => {
      router.push(`/${locale}/profile`);
    }, 1500);

    window.location.href = "ecowat://verified";

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(fallback);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange, {
      once: true,
    });
  };

  useEffect(() => {
    const verifyUser = async () => {
      const hash = window.location.hash.substring(1);
      const urlParams = new URLSearchParams(hash);
      const accessToken = urlParams.get("access_token");
      if (!accessToken) {
        router.push(`/${locale}/login`);
        return;
      }
      const res = await callBackApi(accessToken);
      if (!res.ok) {
        router.push(`/${locale}/login`);
        return;
      }
      openAppOrDashboard();
    };
    verifyUser();
  }, [router, locale]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-sm">
        <p className="text-slate-600 dark:text-slate-400 font-medium">
          Verifying account...
        </p>
      </div>
    </div>
  );
}
