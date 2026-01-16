import { AboutStore } from "@/types/zustand.store";
import { create } from "zustand";

export const useAboutStore = create<AboutStore>((set) => ({
  about: [],
  setAbout: (about) => set({ about }),
}));
