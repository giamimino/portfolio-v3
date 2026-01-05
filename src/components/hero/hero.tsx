import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Flamenco } from "next/font/google";

export default function Hero({
  icons,
  directions,
}: {
  icons: string[];
  directions?: { t?: number; l?: number; r?: number; b?: number };
}) {
  const [y, setY] = useState(0);
  const ticking = useRef(false);
  const maxTarget = 80;

  useEffect(() => {
    const scroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (scrollY! < maxTarget) {
          setY(scrollY);
        }
        ticking.current = false;
      });
    };

    document.addEventListener("scroll", scroll);

    return () => removeEventListener("scroll", scroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ y, opacity: 1, x: 0 }}
      style={{
        top: directions?.t ? `${directions.t * 4}px` : "",
        left: directions?.l ? `${directions.l * 4}px` : "",
        right: directions?.r ? `${directions.r * 4}px` : "",
        bottom: directions?.b ? `${directions.b * 4}px` : "",
      }}
      transition={{
        y: { type: "spring", stiffness: 10 },
        x: { type: "spring", stiffness: 50 },
        opacity: { type: "spring", stiffness: 50 },
      }}
      className="px-1.5 py-1 rounded-full absolute z-10 
      bg-transparent backdrop-blur-sm border border-secondary-border"
    >
      <div className="flex">
        {icons.map((icon) => (
          <span className="text-xl p-3">
            <Icon icon={icon} />
          </span>
        ))}
      </div>
    </motion.div>
  );
}
