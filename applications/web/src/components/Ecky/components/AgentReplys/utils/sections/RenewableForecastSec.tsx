import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import RenewableForecast from "@/src/components/Dashboard/Charts/dashboard/RenewableForecast";
import { useRenewableDataContext } from "@/src/context/useRenewableData";
import StatLoading from "@/src/components/statsElements/StatLoading";
import StatError from "@/src/components/statsElements/StatError";
import { SunMedium, X } from "lucide-react";

const RenewableForecastSec = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renewableContext = useRenewableDataContext();
  const isError = renewableContext?.isError;
  const renewableData = renewableContext?.renewableData;
  const isLoading = renewableContext?.isLoading;
  const refetch = renewableContext?.refetch;

  if (isLoading || (!renewableData && !isError)) {
    return <StatLoading />;
  }

  if (isError) {
    return <StatError refetch={refetch} />;
  }

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-2 mt-4 py-1.5 bg-green-800 hover:bg-green-700 font-semibold rounded-md text-white transition-colors cursor-pointer"
      >
        View Renewable Data
      </button>

      {isModalOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-[#1e1e1e] flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <SunMedium className="h-4.5 w-4.5 text-amber-500" />
                    Renewable Energy Forecast
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Expected solar and wind contributions for the upcoming week
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="h-8 w-8 rounded-lg border border-slate-200 dark:border-[#2a2a2a] hover:bg-slate-50 dark:hover:bg-[#1c1c1c] flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                <RenewableForecast />
              </div>

              <div className="px-6 py-4 border-t border-slate-200 dark:border-[#1e1e1e] bg-slate-50/50 dark:bg-stone-900/20 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export default RenewableForecastSec;