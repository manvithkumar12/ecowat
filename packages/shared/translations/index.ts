import enApiReturns from "./en/apiReturns.json";
import deApiReturns from "./de/apiReturns.json";

export const translations = {
  en: {
    apiReturns: enApiReturns,
  },
  de: {
    apiReturns: deApiReturns,
  },
};

export type Language = keyof typeof translations;
