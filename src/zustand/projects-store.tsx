import { ProjectsStore } from "@/types/zustand.store"
import { create } from "zustand"

export const useProjectsStore = create<ProjectsStore>((set) => ({
  projects: [],
  setProjects: (projects) => set({ projects })
}))