import { motion } from "motion/react";

import ScrollLabel from "../components/ScrollLabel";
import { useMeta } from "../context/metaContext";
import { HERO_FADEIN_TRANSITION } from "../config/motion.config";

export default function HomeHero() {
  const { meta } = useMeta();
  const logoLetters = meta.site_logo_text.split("");

  return (
    <header className="flex min-h-screen flex-col items-center justify-center">
      <p className="-tracking-custom text-7xl font-semibold">
        {logoLetters.map((letter, index) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0, delay: index / 5 }}
            key={index}
          >
            {letter}
          </motion.span>
        ))}
      </p>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        transition={{ ...HERO_FADEIN_TRANSITION, delay: 2 }}
        className="bg-palette-eggshell flex w-full -translate-y-6 items-center justify-center overflow-hidden"
      >
        <h1 className="text-palette-denim tracking-custom text-base leading-4 font-medium">
          {meta.site_logo_subtitle}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...HERO_FADEIN_TRANSITION, delay: 2.5 }}
      >
        <ScrollLabel />
      </motion.div>
    </header>
  );
}
