import { motion } from "motion/react";

import { CARDS_FADE_SPRING_TRANSITION } from "../config/motion.config";

export default function ProjectCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 1 }}
      transition={CARDS_FADE_SPRING_TRANSITION}
      className="border-palette-denim flex w-full max-w-md flex-col border-t border-b px-4 py-6"
    >
      card
    </motion.div>
  );
}
