import { Children, ProjectComponentPropsType } from "@/types/global";
import { Icon } from "@iconify/react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent as ReactMouseEvent } from "react";

export const ProjectsConainer = ({ children }: Children) => {
  return <div className="flex gap-8 flex-wrap justify-center">{children}</div>;
};

export const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className="text-[10px] font-medium px-2 py-0.5 bg-white/10 backdrop-blur-sm text-white/80 rounded-full border border-white/20">
      <span>{tag}</span>
    </div>
  );
};

export const ProjectWrapper = ({
  title,
  description,
  tags,
  thumb,
  category,
  project_github_url,
}: ProjectComponentPropsType) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  function handleMouseMove({
    clientX,
    clientY,
    currentTarget,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const parent = {
    hover: {},
  };
  const image = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      onMouseMove={handleMouseMove}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 50 }}
      className="border border-1-b min-w-100 min-h-50 rounded-2xl p-6 flex 
      items-end relative overflow-hidden cursor-pointer hover:scale-105 
      hover:border-1-b-active transition-all duration-400 group"
      onClick={() => window.open(project_github_url, "_blank")}
    >
      {/* category icon */}

      <div
        className="absolute z-1 top-6 right-6 px-2 py-1 
      bg-black/15 backdrop-blur-sm rounded-full border border-black/20 text-white text-xs font-bold tracking-widest
      flex gap-0.5 items-center group-hover:border-black/10 group-hover:bg-black/5 transition-all duration-500
      group-hover:backdrop-blur-xs"
      >
        <Icon
          icon={category.icon}
          style={{ color: `var(--color-${category.color})` }}
          className="text-lg"
        />
        <span>{category.context}</span>
      </div>

      {/* HoverDetails */}
      <div
        className="z-1 opacity-0 translate-y-2 absolute group-hover:opacity-100 
      group-hover:translate-y-0 transition-all duration-500 top-6 left-6 flex flex-col
      gap-2.5"
      >
        <h1 className="text-white font-medium text-lg text-nowrap">{title}</h1>
        <p className="text-xs text-grey-80 font-medium">{description}</p>
        <div className="flex gap-2.5">
          {tags.slice(0, 4).map((tag, idx) => (
            <Tag key={tag} tag={`${tag}-${idx}`} />
          ))}
        </div>
        <button className="underline w-fit text-n-2 text-sm">
          view project
        </button>
      </div>
      <div className="z-1 relative group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-500">
        <h1 className="text-white font-medium text-lg text-nowrap">{title}</h1>
        <motion.div layoutId="tags-piff" className="flex gap-2.5">
          {tags.slice(0, 4).map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </motion.div>
      </div>

      {/* thumb */}
      <motion.div
        variants={parent}
        initial="initial"
        whileHover="hover"
        className="w-full h-full"
      >
        <motion.div
          variants={image}
          transition={{ duration: 0.3 }}
          className="w-full h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -inset-1"
        >
          <img src={thumb} className="w-full h-full object-cover" />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.8) 90%)",
            }}
            whileHover={{
              background:
                "radial-gradient(circle, rgba(0,0,0, 0.2) 20%, rgba(0,0,0, 0.7) 80%)",
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
      {/* mouse move thing */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgb(0 0, 0, 0.3) 15%, transparent 40%)`,
        }}
      ></motion.div>
    </motion.div>
  );
};
