"use client";

import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import SearchBox from "../SearchBox";

export const SearchBar = () => {
  const [field, setField] = useState(false);
  const [Query, setQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setField((prev) => !prev);
      }

      if (e.key === "Escape") {
        setField(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="relative hidden items-center group lg:flex">
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />

        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search..."
          value={Query}
          onFocus={() => setField(true)}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 w-72 rounded-full border border-border/60 bg-muted/30 px-9 text-sm outline-none transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:ring-1 focus:ring-primary/20"
        />

        <div className="absolute right-2.5">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      </div>

      {field && (
        <SearchBox Action={setField} Query={Query} setQuery={setQuery} />
      )}
    </>
  );
};
