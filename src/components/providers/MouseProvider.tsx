import { Children } from "@/types/global";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import { MouseEvent as ReactMouseEvent } from "react";

export default function MouseProvider({ children }: Children) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({
    clientX,
    clientY,
    currentTarget,
  }: ReactMouseEvent<HTMLDivElement>) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };
  return (
    <div onMouseMove={handleMouseMove} className="relative group">
      {children}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300"
        style={{ background: useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgb(255 255, 255, 0.10), transparent 20%)` }}
      ></motion.div>
    </div>
  );
}
