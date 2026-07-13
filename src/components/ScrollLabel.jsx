import { motion } from "motion/react";

export default function ScrollLabel({ heroScrollLabel }) {
  return (
    <motion.span
      animate={{ y: [0, -4, 4, -2, 2, -1, 1, 0] }}
      transition={{
        repeat: Infinity,
        ease: "easeOut",
        duration: 0.66,
        repeatDelay: 3,
      }}
      className="text-palette-denim absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium lg:text-sm"
    >
      {heroScrollLabel}
    </motion.span>
  );
}
