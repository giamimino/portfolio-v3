import { Children } from "@/types/global";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function SectionTitle({
  children,
  font,
  size,
}: Children & { font?: string; size?: number }) {
  const [show, setShow] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div
      className={`${
        show ? "animated-word-play" : "animated-word"
      } transition-all ease-out duration-500`}
      ref={titleRef}
    >
      <h1
        className={`font-bold text-shadow-67 text-white text-center lg:max-w-212.5 leading-none`}
        style={{
          fontSize: size ? `${size * 4}px` : `60px`,
        }}
      >
        {children}
      </h1>
    </div>
  );
}
