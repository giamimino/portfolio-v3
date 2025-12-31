import React from "react";

export interface Children {
  children: React.ReactNode;
}

export interface ProjectComponentPropsType {
  title: string;
  description: string;
  tags: string[];
  thumb: string;
  category: { icon: string; context: string; color: string };
  project_github_url: string
}
