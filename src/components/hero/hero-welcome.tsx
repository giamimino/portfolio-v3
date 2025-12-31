"use client";
import { motion } from "framer-motion";
export default function WelcomeGreet() {
  const word = "Hello, I am Gia Miminoshvili.";
  let words = word.split(" ");
  const duration = 1;

  return (
    <motion.div
      key={"Welcome"}
      className="text-6xl flex w-full h-full bg-black justify-center items-center text-white font-bold"
    >
      <h1 className="flex flex-wrap gap-2.5 text-shadow-67 justify-center">
        {words.map((w, idx) => (
          <motion.span
            key={`w-${idx}`}
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: [0, 1, 1, 1],
              y: [30, -15, 0],
            }}
            transition={{
              duration,
              delay: idx / 8,
              ease: "easeInOut",
              times: [0, 0.4, 0.7, 1],
            }}
            className="block"
          >
            {w}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  );
}
