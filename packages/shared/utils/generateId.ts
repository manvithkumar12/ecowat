export const generateTempId = () =>
  typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? `temp-${crypto.randomUUID()}`
    : `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;
