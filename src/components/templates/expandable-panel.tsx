import { Children, ExpandablePanelPropsType } from "@/types/global";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Flamenco } from "next/font/google";
import React, { useState } from "react";

export const ExpandablePanelContainer = React.memo(({ children }: Children) => {
  return <div className="w-2/3 flex flex-col">{children}</div>;
});

export const ExpandablePanel = React.memo(
  ({ open, title }: ExpandablePanelPropsType) => {
    const [isOpen, setOpen] = useState(open ?? false);

    const toggle = () => {
      setOpen((prev) => !prev);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        layout
        className="border-b border-white/10 py-4 w-full"
      >
        <motion.div
          layout
          className="transition-all flex w-full justify-between cursor-pointer select-none py-4"
          onClick={toggle}
        >
          <h1 className="text-white text-2xl font-semibold">{title}</h1>
          <button
            className={clsx(
              "text-white transition-all duration-500",
              isOpen ? "rotate-0" : "-rotate-45"
            )}
          >
            <Icon icon={"mingcute:close-fill"} />
          </button>
        </motion.div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden w-full"
            >
              <p className="text-grey-70">
                I'm someone who enjoys exploring the way things work—from the
                tiniest patterns in nature to the biggest ideas in science and
                creativity. Curiosity is a huge part of my identity, and I’m
                always drawn to things that challenge me or open up new ways of
                thinking.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
