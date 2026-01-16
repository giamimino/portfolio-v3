import { About, Project } from "./firestore";

export interface ProjectsStore {
  projects: Project[],
  setProjects: (projects: Project[]) => void
}

export interface AboutStore {
  about: About[],
  setAbout: (about: About[]) => void
}