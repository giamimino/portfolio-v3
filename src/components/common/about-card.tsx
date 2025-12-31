import React, { useState } from "react";
import Tag from "../ui/tag";
import { Icon } from "@iconify/react";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { MouseEvent as ReactMouseEvent } from "react";

export default function AboutCard({
  title,
  context,
  skills,
  tags,
}: {
  title: string;
  context: string;
  skills: string[];
  tags: string[];
}) {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  function handleMouseMove({ clientX, clientY, currentTarget }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      onMouseMove={handleMouseMove}
      className="border-4 border-primary-border flex flex-col gap-3.5 p-5 relative overflow-hidden group"
    >
      <h1 className="text-white text-3xl font-light">{title}</h1>
      <p className="text-c-8">{context}</p>
      <span className="w-full h-px border border-primary-border/65"></span>
      <div className="flex flex-col gap-2.5">
        {skills.map((skill) => (
          <div key={skill} className="flex gap-2.5 items-center">
            <span className="w-8 h-8 rounded-full bg-dark-02/70 border border-dark-03 text-white/80 flex justify-center items-center">
              <Icon icon={"ic:baseline-check"} />
            </span>
            <p className="text-b-9">{skill}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {tags.map((tag) => (
          <Tag tag={tag} key={tag} />
        ))}
      </div>

      {/* mouse move thing */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgb(255 255, 255, 0.10), transparent 50%)`,
        }}
      ></motion.div>
    </div>
  );
}
