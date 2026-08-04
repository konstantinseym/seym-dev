import { motion } from "motion/react";

const DOTS = [1, 2, 3];

export default function ScreenLoader() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="flex gap-2"
      >
        {DOTS.map((dot) => (
          <motion.div
            animate={{ y: [0, -8, 8, -4, 4, 0] }}
            transition={{
              duration: 1,
              delay: dot / 12,
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
            key={dot}
            className="bg-palette-eggshell h-2 w-2 rounded-full"
          />
        ))}
      </motion.span>
    </div>
  );
}
