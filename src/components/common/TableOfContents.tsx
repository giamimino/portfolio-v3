import { useScroll, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function TableOfContents({
  sections,
}: {
  sections: { id: string; title: string }[];
}) {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="space-y-2 flex flex-col gap-1">
      {sections.map((sec) => (
        <a
          key={sec.id}
          href={`#${sec.id}`}
          className={
            `${sec.id === current
              ? "font-bold text-white"
              : "text-grey-40 hover:text-grey-70"} transition-all duration-300 mb-0`
          }
        >
          {sec.title}
        </a>
      ))}
    </nav>
  );
}
