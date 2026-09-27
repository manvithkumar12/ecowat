import { Card } from "@/shadcn/ui/card";

export function PriceHistorySkeleton() {
  return (
    <div className="space-y-8 w-full animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card
            key={i}
            className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111] p-5 shadow-xs"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-20 rounded bg-slate-200 dark:bg-stone-800" />
              <div className="h-8 w-8 rounded-xl bg-slate-200 dark:bg-stone-800" />
            </div>
            <div className="h-7 w-28 rounded bg-slate-200 dark:bg-stone-800 mb-2" />
            <div className="h-3 w-36 rounded bg-slate-200 dark:bg-stone-800" />
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 dark:border-[#1e1e1e] bg-white dark:bg-[#111111] p-6 shadow-xs">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="mb-2 h-5 w-48 rounded bg-slate-200 dark:bg-stone-800" />
            <div className="h-3.5 w-72 rounded bg-slate-200 dark:bg-stone-800" />
          </div>
          <div className="h-6 w-32 rounded bg-slate-200 dark:bg-stone-800" />
        </div>
        <div className="h-80 sm:h-96 w-full rounded-xl bg-slate-100 dark:bg-stone-900/50 relative overflow-hidden">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-slate-200 dark:border-stone-800"
              style={{ top: `${i * 22}%` }}
            />
          ))}
          <div className="absolute bottom-0 left-4 right-4 flex items-end gap-2 px-2 pb-2">
            {[40, 65, 30, 85, 50, 75, 45, 90, 60, 35, 70, 55, 48, 80].map(
              (h, idx) => (
                <div
                  key={idx}
                  className="flex-1 rounded-t bg-emerald-200 dark:bg-emerald-900/40"
                  style={{ height: `${h}%` }}
                />
              ),
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
