import { Children } from "@/types/global";
import React, { useEffect, useRef, useState } from "react";

export default function InViewPort({ children }: Children) {
  const [show, setShow] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting) {
          setShow(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if(wrapperRef.current) {
      observer.observe(wrapperRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return <div ref={wrapperRef}>{show && children}</div>;
}
