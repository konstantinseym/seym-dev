import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import HintLabel from "../components/HintLabel";
import { useMeta } from "../context/metaContext";
import { HERO_FADEIN_TRANSITION } from "../config/motion.config";

export default function HomeHero() {
  const { meta } = useMeta();
  const logoLetters = meta.site_logo_text.split("");

  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const logoY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -64, -64]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 32, 32]);
  const firstScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    [1, 0, 0],
  );
  const secondScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.9, 1],
    [0, 0, 1, 1],
  );

  return (
    <header ref={heroRef} className="relative h-[200vh]">
      <motion.div className="sticky top-0 h-screen">
        {/* FIRST SCREEN */}
        <motion.div
          className="absolute top-0 flex h-full w-full flex-col items-center justify-center"
          style={{ opacity: firstScreenOpacity }}
        >
          <motion.p
            className="-tracking-custom text-7xl font-semibold lg:text-8xl"
            style={{ y: logoY }}
          >
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
          </motion.p>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            transition={{ ...HERO_FADEIN_TRANSITION, delay: 2 }}
            style={{ y: subtitleY }}
            className="bg-palette-eggshell flex w-full -translate-y-6 items-center justify-center overflow-hidden lg:-translate-y-7.25"
          >
            <h1 className="text-palette-denim tracking-custom text-base leading-4 font-medium lg:text-xl">
              {meta.site_logo_subtitle}
            </h1>
          </motion.div>
        </motion.div>
        {/* SECOND SCREEN */}
        <motion.div
          style={{ opacity: secondScreenOpacity }}
          className="absolute top-0 flex h-full w-full flex-col items-center justify-center"
        >
          <span className="tracking-custom text-2xl uppercase lg:text-4xl">
            {meta.hero_anthem}
          </span>
        </motion.div>
        {/* LABEL BENEATH SCREENS */}
        <motion.div
          key="labelFadeIn"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...HERO_FADEIN_TRANSITION, delay: 2.5 }}
        >
          <HintLabel label={meta.hero_scroll_label} />
        </motion.div>
      </motion.div>
    </header>
  );
}
