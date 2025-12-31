"use client";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const tabs = [
  { id: "", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;

      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY.current && show) {
          setShow(false);
        } else if (scrollY < lastScrollY.current && !show) {
          setShow(true);
        }

        lastScrollY.current = scrollY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [show]);

  return (
    <motion.header
      initial={{ y: 0, scaleY: 2 }}
      animate={show ? { y: 0, scaleY: 1 } : { y: "-150%", scaleY: 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 40 }}
      className="fixed top-0 left-0 right-0 z-99 border-b border-b-white/10 bg-n-8 select-none"
    >
      <div className="px-6 h-14 flex items-center justify-between mx-auto max-w-6xl">
        <button
          onClick={() => router.push("/")}
          className="text-xl font-bold text-white hover:text-n-3 transition-colors cursor-pointer"
        >
          GM
        </button>
        <div className="flex items-center gap-6 text-white">
          <nav className="flex items-center gap-3">
            {tabs.map(({ label, id }) => (
              <div
                key={id}
                className={`${
                  pathname.startsWith(`/${id}`) ? "" : "hover:text-white/50"
                } text-sm relative py-1.5 px-3 cursor-pointer`}
                onClick={() => router.push(`/${id}`)}
              >
                {pathname.startsWith(`/${id}`) && (
                  <motion.div
                    layoutId={"active-pill"}
                    className="bg-white w-full h-full absolute inset-0"
                    style={{ borderRadius: "9999px" }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      duration: 0.6,
                    }}
                  ></motion.div>
                )}
                <span className="mix-blend-exclusion relative z-10">
                  {label}
                </span>
              </div>
            ))}
          </nav>
          <Link
            href={"https://github.com/giamimino"}
            target="_blank"
            rel={"noopener noreferrer"}
            className="cursor-pointer hover:text-white/50 text-xl"
          >
            <Icon icon={"uil:github"} />
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
