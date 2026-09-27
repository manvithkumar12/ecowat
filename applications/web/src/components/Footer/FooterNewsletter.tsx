"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="text-[12px] text-emerald-500 font-medium py-1">
        ✓ You&apos;re on the list. Thanks!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-3 py-2 rounded-md text-[12px] bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
      />
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-semibold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
      >
        Subscribe
        <ArrowRight className="h-3 w-3" />
      </button>
    </form>
  );
}
