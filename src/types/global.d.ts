import React from "react";

export interface Children {
  children: React.ReactNode;
}

export interface CategoryType {
  icon: string;
  context: string;
  color: string;
}

export interface ProjectComponentPropsType {
  title: string;
  description: string;
  tags: string[];
  thumb: string;
  category: CategoryType;
  project_github_url: string;
  delay: number;
}

export type ContactItem =
  | {
      icon: string;
      type: "redirect";
      provider: string;
      account: string;
      redirectUrl: string;
      copyValue?: never;
    }
  | {
      icon: string;
      type: "copy";
      provider: string;
      account: string;
      redirectUrl?: never;
      copyValue: string;
    };

export interface ExpandablePanelPropsType {
  open?: boolean,
  title: string,
}