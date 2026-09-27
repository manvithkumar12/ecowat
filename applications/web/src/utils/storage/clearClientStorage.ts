/**
 * Clears client-side browser storage (localStorage, sessionStorage, React Query persister cache)
 * when a user logs in, logs out, or deletes their account.
 */
export const clearClientStorage = () => {
  if (typeof window !== "undefined") {
    try {
      localStorage.clear();
      sessionStorage.clear();
    } catch (error) {
      console.error("Failed to clear browser storage:", error);
    }
  }
};
