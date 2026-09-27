export const WeekPriceLoadingState = ({}) => (
  <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-5 sm:p-6 rounded-2xl shadow-sm flex flex-col h-100">
    <div className="mb-4">
      <div className="h-4 w-32 bg-slate-200 dark:bg-[#1e1e1e] rounded animate-pulse mb-2" />
      <div className="h-3 w-48 bg-slate-100 dark:bg-[#1a1a1a] rounded animate-pulse" />
    </div>
    <div className="flex-1 flex items-end gap-2 pt-4">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-md bg-emerald-100 dark:bg-emerald-900/20 animate-pulse"
          style={{ height: `${40 + Math.random() * 120}px` }}
        />
      ))}
    </div>
  </div>
);
