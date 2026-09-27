import { parseInlineFormatting } from "./parseLineFormat";

export const renderFormattedText = (text: string) => {
  return text.split("\n").map((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("###")) {
      return (
        <h3
          key={idx}
          className="text-base font-bold text-slate-800 dark:text-emerald-400 mt-3 mb-1.5 first:mt-0"
        >
          {trimmed.replace("###", "").trim()}
        </h3>
      );
    }
    if (trimmed.startsWith("##")) {
      return (
        <h2
          key={idx}
          className="text-lg font-bold text-slate-900 dark:text-emerald-400 mt-4 mb-2 first:mt-0"
        >
          {trimmed.replace("##", "").trim()}
        </h2>
      );
    }

    // Bullet points
    if (trimmed.startsWith("-") || trimmed.startsWith("*")) {
      const content = trimmed.substring(1).trim();
      return (
        <ul
          key={idx}
          className="list-disc pl-5 my-1 text-slate-700 dark:text-slate-200"
        >
          <li>{parseInlineFormatting(content)}</li>
        </ul>
      );
    }

    // Numbered lists
    if (/^\d+\./.test(trimmed)) {
      const content = trimmed.replace(/^\d+\./, "").trim();
      const num = trimmed.match(/^\d+/)?.[0];
      return (
        <ol
          key={idx}
          className="list-decimal pl-5 my-1 text-slate-700 dark:text-slate-200"
        >
          <li value={num ? parseInt(num) : undefined}>
            {parseInlineFormatting(content)}
          </li>
        </ol>
      );
    }

    // Standard text line
    return line === "" ? (
      <div key={idx} className="h-2" />
    ) : (
      <p
        key={idx}
        className="text-sm leading-relaxed my-1.5 text-slate-700 dark:text-slate-200"
      >
        {parseInlineFormatting(line)}
      </p>
    );
  });
};
