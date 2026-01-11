import { Children } from "@/types/global";
import React, { useEffect, useRef, useState } from "react";

export default function InViewport({ children, animate }: Children & { animate?: boolean}) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={animate ? show ? "fade-up show" : "fade-up" : ""}
      style={{ minHeight: "100px", }}
    >
      {show && children}
    </div>
  );
}
