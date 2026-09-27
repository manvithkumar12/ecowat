import React from "react";
import type { LucideIcon } from "lucide-react";
import { Card } from "shadcn/ui/card";

type SummaryItem = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
};

export function SummaryCards({ data }: { data: SummaryItem[] }) {
  return (
    <section aria-labelledby="summary-heading" className="mb-6">
      <h2 id="summary-heading" className="sr-only">
        Summary
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="flex items-start gap-4 rounded-lg border bg-white p-4 shadow-sm hover:shadow-md"
            >
              <div className="rounded-lg bg-emerald-50 p-2">
                {Icon ? <Icon size={20} className="text-emerald-600" /> : null}
              </div>
              <div>
                <p className="text-xs font-medium uppercase text-slate-400">
                  {item.title}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {item.value}
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
