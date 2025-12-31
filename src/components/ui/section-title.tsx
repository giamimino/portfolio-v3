import { Children } from "@/types/global";
import { motion } from "framer-motion";

export default function SectionTitle({
  children,
  font,
  size,
}: Children & { font?: string; size?: number }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 50, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 50 }}
      className="font-bold text-shadow-67 text-white text-center lg:max-w-212.5"
      style={{
        fontSize: size ? `${size * 4}px` : `60px`
      }}
    >
      {children}
    </motion.h1>
  );
}
