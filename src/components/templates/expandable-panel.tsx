import { Children, ExpandablePanelPropsType } from "@/types/global";
import { Icon } from "@iconify/react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

export const ExpandablePanelContainer = React.memo(({ children }: Children) => {
  return <div className="w-2/3 max-lg:w-4/5 flex flex-col">{children}</div>;
});

export const ExpandablePanel = React.memo(
  ({ open, title, description }: ExpandablePanelPropsType) => {
    const [isOpen, setOpen] = useState(open ?? false);

    const toggle = () => {
      setOpen((prev) => !prev);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3}}
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
              transition={{ duration: 0.3, delay: 0.05 }}
              className="origin-top overflow-hidden w-full"
            >
              <div className="text-grey-70">
                {Array.isArray(description) ? (
                  <div className="flex flex-col justify-start items-start">
                    {description.map((d, i) => (
                      <div
                        key={i}
                        className="flex"
                      >
                        <span>
                          <Icon icon="mdi:dot" className="text-xl self-start" />
                        </span>
                        <p>
                          {d
                            .split(/``(.*?)``/g)
                            .map((part, i) =>
                              i % 2 === 1 ? (
                                <span className="font-bold" key={`part-${i}`}>{part}</span>
                              ) : (
                                part
                              )
                            )}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  description
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
