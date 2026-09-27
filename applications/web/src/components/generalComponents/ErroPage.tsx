"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { ErrorType, getErrorMessage } from "@/src/utils/Error/getErrorMessage";

interface ErrorPageProps {
  type: ErrorType;
}

const ErrorPage = ({ type }: ErrorPageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="relative mb-6">
        <div className="h-20 w-20 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center">
          <AlertCircle className="h-10 w-10 text-rose-500 dark:text-rose-400" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center">
          <span className="text-rose-500 text-xs font-bold">!</span>
        </div>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-stone-100 mb-2 text-center">
        Unable to fetch data
      </h2>
      <p className="text-sm text-slate-500 dark:text-stone-400 max-w-sm text-center mb-6 leading-relaxed">
        {getErrorMessage(type)}
      </p>

      <Button
        onClick={() => window.location.reload()}
        variant="outline"
        className="gap-2 border-slate-200 dark:border-stone-800 hover:bg-slate-50 dark:hover:bg-stone-900 hover:border-rose-200 dark:hover:border-rose-900/50 transition-all"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
};

export default ErrorPage;
