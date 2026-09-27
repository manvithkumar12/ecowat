const StatLoading = () => {
  return (
    <div className="bg-white dark:bg-[#111111] border border-slate-200 dark:border-[#1e1e1e] p-6 rounded-2xl shadow-sm min-h-37 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-3 w-28 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="h-8 w-16 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="mt-4 h-3 w-32 rounded bg-slate-200 dark:bg-slate-800" />

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1e1e1e] flex justify-end">
        <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
};

export default StatLoading;
