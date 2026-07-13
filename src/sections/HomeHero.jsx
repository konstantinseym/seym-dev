import { motion } from "motion/react";

import ScrollLabel from "../components/ScrollLabel";
import { useMeta } from "../context/metaContext";

export default function HomeHero({ navElements }) {
  const { meta } = useMeta();
  const logoLetters = meta.site_logo_text.split("");

  return (
    <motion.header
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.85 }}
      className="relative z-0 flex min-h-screen flex-col items-start justify-center lg:items-center"
    >
      <div className="-translate-x-1/4 pl-[30vw] lg:translate-x-0 lg:pl-0">
        <p className="text-[40px] leading-12 font-bold lg:text-[64px] lg:leading-18">
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
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
          className="text-palette-denim text-base font-bold lg:text-2xl"
        >
          {meta.site_logo_subtitle}
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
      >
        <nav className="absolute inset-0 top-3/5 left-1/5 text-base font-medium lg:left-7/10 lg:text-2xl">
          <ul className="flex list-disc flex-col gap-4 lg:gap-6">
            {navElements.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
        </nav>
        <ScrollLabel />
      </motion.div>
    </motion.header>
  );
}
