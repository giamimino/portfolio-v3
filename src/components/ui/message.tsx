import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export default function Message({ text, onClose }: { text: string, onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: "-100%", scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 10 }}
      className="fixed 
      top-5 left-1/2 -translate-x-1/2 flex 
      border border-grey-10 rounded-xl gap-2.5
      bg-black/10 backdrop-blur-lg mix-blend-exclusion text-white font-medium
      max-w-100 sm:max-w-70"
      style={{
        zIndex: 999,
        padding: "14px 24px",
      }}
    >
      <p className="">{text}</p>
      <button onClick={onClose} className="text-2xl cursor-pointer text-red-600 drop-shadow-[0_0_4px_rgba(246,0,0,0.6)]">
        <Icon icon="iconamoon:close-fill" />
      </button>
    </motion.div>
  );
}
