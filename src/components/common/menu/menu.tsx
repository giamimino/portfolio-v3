import { tabs } from "@/constants/tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="w-4 h-4 flex flex-col gap-1 overflow-hidden cursor-pointer"
      >
        <span className={`w-full h-0.5 bg-white inline-block rounded-2xl ${open ? "rotate-45 translate-y-1.75" : "rotate-0"} transition-all duration-300`} ></span>
        <span className={`w-full h-0.5 bg-white inline-block rounded-2xl ${open ? "opacity-0 -translate-x-full" : " opacity-100"} transition-all duration-300`} ></span>
        <span className={`w-full h-0.5 bg-white inline-block rounded-2xl ${open ? "-rotate-45 -translate-y-1.25" : " opacity-100"} transition-all duration-300`} ></span>
      </div>
      <AnimatePresence>{open && <MenuWrapper />}</AnimatePresence>
    </div>
  );
}

export function MenuWrapper() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
      className="text-white absolute left-1/2 top-20 -translate-x-1/2 border 
    border-white/10 bg-n-8 z-99 w-2/3 flex flex-col gap-2.5 p-5 rounded-xl"
    >
      {tabs.map((t) => (
        <div
          key={t.id}
          className="cursor-pointer w-full hover:text-n-3"
          onClick={() => router.push(`/${t.id}`)}
        >
          {t.label}
        </div>
      ))}
    </motion.div>
  );
}
