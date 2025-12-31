import { Children } from "@/types/global";
import { Icon } from "@iconify/react";
import React from "react";

export default function Section({
  children,
  noIcons,
}: Children & {
  noIcons?:
    | { tr?: boolean; tl?: boolean; bl?: boolean; br?: boolean }
    | boolean;
}) {
  const showIcons = {
    tl: !(typeof noIcons === "object" ? noIcons.tl : noIcons === true),
    tr: !(typeof noIcons === "object" ? noIcons.tr : noIcons === true),
    bl: !(typeof noIcons === "object" ? noIcons.bl : noIcons === true),
    br: !(typeof noIcons === "object" ? noIcons.br : noIcons === true),
  };

  return (
    <div
      className="border border-primary-border px-16 md:px-20 lg:px-24 py-16 md:py-20 relative"
    >
      {showIcons.tl && (
        <span className="text-sm z-10 absolute top-[-7.5px] left-[-7.5px] text-n-3">
          <Icon icon="mingcute:plus-fill" />
        </span>
      )}
      {showIcons.tr && (
        <span className="text-sm z-10 absolute top-[-7.5px] right-[-7.5px] text-n-3">
          <Icon icon="mingcute:plus-fill" />
        </span>
      )}
      {showIcons.bl && (
        <span className="text-sm z-10 absolute bottom-[-7.5px] left-[-7.5px] text-n-3">
          <Icon icon="mingcute:plus-fill" />
        </span>
      )}
      {showIcons.br && (
        <span className="text-sm z-10 absolute bottom-[-7.5px] right-[-7.5px] text-n-3">
          <Icon icon="mingcute:plus-fill" />
        </span>
      )}
      {children}
    </div>
  );
}
