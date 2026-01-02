"use client";
import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";

export default function ScrollToUp() {
  const [show, setShow] = useState(true);
  const reachedRef = useRef(false);

  useEffect(() => {
    const listener = () => {
      const currentPlace = window.scrollY;
      const target = 500;
      if (currentPlace > target) {
        if (!reachedRef.current) {
          setShow(false);
          reachedRef.current = true;
        }
      } else {
        if (reachedRef.current) {
          setShow(true);
          reachedRef.current = false;
        }
      }
    };
    document.addEventListener("scroll", listener);

    return () => document.removeEventListener("scroll", listener);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth"})
  }

  if (show) return null;
  return (
    <div
      className="fixed right-3 bottom-3 w-12 h-12 bg-white/5 
    flex justify-center items-center border border-white/20 
    backdrop-blur-sm rounded-full text-white/60 text-2xl cursor-pointer hover:bg-white/1"
    onClick={handleClick}
    >
      <Icon icon={"majesticons:arrow-up"} />
    </div>
  );
}
