import { CategoryType } from "@/types/global";

export const Categories: Record<
  string,
  CategoryType
> = {
  allprojects: {
    icon: "twemoji:direct-hit",
    color: "",
    context: "All Projects"
  },
  fullstack: {
    icon: "ion:flash-sharp",
    color: "--color-yellow-300",
    context: "Full Stack",
  },
  landingpages: {
    icon: "noto:artist-palette",
    color: "",
    context: "Landing"
  },
};
