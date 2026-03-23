import type { Funnel } from "@/types/Funnel";

const STORAGE_KEY = "funnel_data";

export const storageService = {
  saveFunnel: (funnel: Funnel) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(funnel));
  },

  loadFunnel: (): Funnel | null => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  },

  clearFunnel: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
};