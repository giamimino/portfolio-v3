import {
  CategoryType,
  Children,
  ProjectComponentPropsType,
} from "@/types/global";
import { Icon } from "@iconify/react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent as ReactMouseEvent } from "react";
import clsx from "clsx";

export const ProjectsConainer = ({ children }: Children) => {
  return (
    <div className="flex gap-8 max-lg:gap-6 flex-wrap max-md:flex-col justify-center">
      {children}
    </div>
  );
};

export const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className="text-[10px] font-medium px-2 py-0.5 bg-white/10 backdrop-blur-sm text-white/80 rounded-full border border-white/20">
      <span>{tag}</span>
    </div>
  );
};

export const Category = ({
  icon,
  context,
  color,
  active,
  onClick,
}: CategoryType & { active: boolean; onClick: () => void }) => {
  return (
    <button
      className={clsx(
        `px-4 py-2
        backdrop-blur-sm rounded-full border border-white/10
       text-sm font-medium
        flex gap-1 items-center
        transition-all duration-400 select-none cursor-pointer max-sm:scale-90`,
        !active && "hover:bg-white/13 border-white/15",
        active ? "bg-white text-black" : "bg-white/6 text-grey-60"
      )}
      onClick={onClick}
    >
      <Icon
        icon={icon}
        style={{ color: `var(${color})` }}
        className="text-lg"
      />
      <span>{context}</span>
    </button>
  );
};

export const ProjectWrapper = ({
  title,
  description,
  tags,
  thumb,
  category,
  project_github_url,
  delay,
}: ProjectComponentPropsType) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={() => window.open(project_github_url, "_blank")}
      className="border border-1-b min-w-99 min-h-50 max-lg:min-w-75  max-md:min-w-full max-md:h-65 max-sm:h-55 rounded-2xl p-6 max-lg:p-4 flex items-end relative overflow-hidden cursor-pointer hover:border-1-b-active hover:scale-105 transition-all duration-300 ease-out group animate-hideUpDown opacity-0"
      style={{
        animationDelay: `${delay}s`,
      }}
    >
      {/* Category */}
      <div className="absolute z-10 top-6 right-6 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/15 text-white text-xs font-bold tracking-widest flex gap-1 items-center group-hover:border-white/10 group-hover:bg-white/5 transition-all duration-500 max-lg:top-4 max-lg:right-4">
        <Icon
          icon={category.icon}
          style={{ color: `var(${category.color})` }}
          className="text-lg"
        />
        <span>{category.context}</span>
      </div>

      {/* Hover Content */}
      <div className="z-10 opacity-0 translate-y-2 absolute group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bottom-5 left-6 flex flex-col gap-2.5 max-lg:bottom-3.5 max-lg:left-3.5 max-lg:gap-1.5">
        <h1 className="text-white font-medium text-lg">{title}</h1>
        <p className="text-xs text-grey-80 font-medium">{description}</p>

        <div className="flex gap-2.5 flex-wrap max-w-100 max-lg:max-w-60 max-md:max-w-full">
          {tags.slice(0, 4).map((tag, idx) => (
            <Tag key={`${tag}-${idx}`} tag={tag} />
          ))}
          {tags.slice(4, tags.length).length !== 0 && (
            <Tag tag={`+${tags.length - 4}`} />
          )}
        </div>

        <button className="underline w-fit text-n-2 text-sm">
          view project
        </button>
      </div>

      <div className="z-10 relative group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-500">
        <h1 className="text-white font-medium text-lg">{title}</h1>
        <div className="flex flex-wrap gap-2.5 ">
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 group-hover:scale-115 transition-all duration-300 ease-out">
          <img src={thumb} className="w-full h-full object-cover" alt={title} />

          <div
            className="absolute inset-0 pointer-events-none
            hover:[radial-gradient(circle,_rgba(0,0,0,0.2)_20%,_rgba(0,0,0,0.7)_80%)]"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.8) 90%)",
            }}
          />
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0
        group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              circle at ${mouseX}px ${mouseY}px,
              rgba(0,0,0,0.3) 15%,
              transparent 40%
            )
          `,
        }}
      />
    </div>
  );
};
