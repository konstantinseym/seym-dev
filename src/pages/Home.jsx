import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useAnimationControls,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";

import { useMeta } from "../hooks/useMeta";
import { HERO_FADEIN_TRANSITION } from "../config/motion.config";
import Footer from "../components/Footer";
import HintLabel from "../components/HintLabel";
import ScreenLoader from "../components/ScreenLoader";
import ScreenError from "../components/ScreenError";

export default function Home() {
  const metaQuery = useMeta();

  if (metaQuery.isPending) return <ScreenLoader />;

  if (metaQuery.isError) {
    return <ScreenError handleReload={metaQuery.refetch} />;
  }

  return <HomeContent meta={metaQuery.data} />;
}

function HomeContent({ meta }) {
  const pageRef = useRef(null);

  const logoLetters = meta.site_logo_text.split("");

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const firstScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    [1, 0, 0],
  );

  const secondScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0],
  );

  const thirdScreenOpacity = useTransform(
    scrollYProgress,
    [0, 0.8, 0.9, 1],
    [0, 0, 1, 1],
  );

  const firstScreenPointerEvents = useTransform(scrollYProgress, (value) =>
    value < 0.175 ? "auto" : "none",
  );

  const secondScreenPointerEvents = useTransform(scrollYProgress, (value) =>
    value >= 0.175 && value < 0.85 ? "auto" : "none",
  );

  const thirdScreenPointerEvents = useTransform(scrollYProgress, (value) =>
    value >= 0.85 ? "auto" : "none",
  );

  const logoY = useTransform(scrollYProgress, [0, 0.2, 1], [0, -64, -64]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.2, 1], [0, 64, 64]);
  const navHintY = useTransform(
    scrollYProgress,
    [0, 0.8, 0.9, 1],
    [0, 0, -16, -16],
  );

  const firstTextOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.25, 0.35, 0.4],
    [0, 1, 1, 0],
  );

  const secondTextOpacity = useTransform(
    scrollYProgress,
    [0.38, 0.43, 0.55, 0.6],
    [0, 1, 1, 0],
  );

  const thirdTextOpacity = useTransform(
    scrollYProgress,
    [0.58, 0.63, 0.75, 0.8],
    [0, 1, 1, 0],
  );

  const firstTextY = useTransform(scrollYProgress, [0.2, 0.4], [16, -16]);

  const secondTextY = useTransform(
    scrollYProgress,
    [0.38, 0.5, 0.6],
    [16, 0, -8],
  );

  const thirdTextX = useTransform(
    scrollYProgress,
    [0.58, 0.75, 0.8],
    [0, 0, -32],
  );

  const navigationControls = useAnimationControls();
  const navigationPlayedRef = useRef(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value >= 0.9 && !navigationPlayedRef.current) {
      navigationPlayedRef.current = true;
      navigationControls.start("visible");
    }
  });

  const navigationVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const linkVariants = {
    hidden: {
      opacity: 0,
      y: 24,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <div ref={pageRef} className="relative h-[800vh]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={HERO_FADEIN_TRANSITION}
          className="sticky top-0 h-screen bg-[linear-gradient(to_bottom,var(--color-palette-eggshell)_0%,var(--color-palette-eggshell)_60%,rgba(0,0,0,0.5)_90%,#000_100%),url('/img/bg.avif')] bg-cover bg-center bg-no-repeat"
        >
          <motion.header
            className="absolute top-0 flex h-full w-full flex-col items-center justify-center"
            style={{
              opacity: firstScreenOpacity,
              pointerEvents: firstScreenPointerEvents,
            }}
          >
            <motion.p
              className="-tracking-custom text-7xl font-semibold lg:text-8xl"
              style={{ y: logoY }}
            >
              {logoLetters.map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0,
                    delay: 1 + index / 5,
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              transition={{
                ...HERO_FADEIN_TRANSITION,
                delay: 3,
              }}
              style={{ y: subtitleY }}
              className="bg-palette-eggshell flex w-full -translate-y-6 items-center justify-center overflow-hidden lg:-translate-y-7.25"
            >
              <h1 className="text-palette-denim tracking-custom text-base leading-4 font-medium lg:text-xl">
                {meta.site_logo_subtitle}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                ...HERO_FADEIN_TRANSITION,
                delay: 3.5,
              }}
            >
              <HintLabel label={meta.hero_scroll_label} />
            </motion.div>
          </motion.header>

          <motion.section
            className="absolute top-0 flex h-full w-full flex-col items-center justify-center"
            style={{
              opacity: secondScreenOpacity,
              pointerEvents: secondScreenPointerEvents,
            }}
          >
            <div className="relative flex w-full max-w-4xl items-center justify-center">
              <div className="tracking-custom relative grid w-full place-items-center px-12 text-center">
                <motion.span
                  className="tracking-custom col-start-1 row-start-1 text-4xl uppercase"
                  style={{ opacity: firstTextOpacity, y: firstTextY }}
                >
                  welcome
                </motion.span>

                <motion.p
                  className="col-start-1 row-start-1 text-xl leading-10 lg:text-3xl"
                  style={{ opacity: secondTextOpacity, y: secondTextY }}
                >
                  seym.dev is an independent creative studio creating
                  distinctive identities and digital experiences.
                </motion.p>

                <motion.span
                  className="text-palette-denim col-start-1 row-start-1"
                  style={{ opacity: thirdTextOpacity, x: thirdTextX }}
                >
                  explore selected projects, discover the studio, and find
                  everything you need to get in touch.
                </motion.span>
              </div>
            </div>
          </motion.section>

          <motion.section
            className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-12"
            style={{
              opacity: thirdScreenOpacity,
              pointerEvents: thirdScreenPointerEvents,
            }}
          >
            <motion.span
              key="navHint"
              style={{ y: navHintY }}
              className="tracking-custom text-palette-denim"
            >
              explore more info about...
            </motion.span>

            <motion.nav
              initial="hidden"
              animate={navigationControls}
              variants={navigationVariants}
              className="flex w-full max-w-4xl flex-col gap-9 pr-18 pl-9 text-xl"
            >
              <motion.div
                className="flex justify-between"
                variants={linkVariants}
              >
                <Link to="/portfolio">
                  <span className="uppercase">
                    {meta.portfolio_section_title}
                  </span>
                </Link>
                <span className="text-palette-denim text-xs lg:text-sm">
                  / 01
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between"
                variants={linkVariants}
              >
                <Link to="/about">
                  <span className="uppercase">{meta.about_section_title}</span>
                </Link>
                <span className="text-palette-denim text-xs lg:text-sm">
                  / 02
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between"
                variants={linkVariants}
              >
                <Link to="/contact">
                  <span className="uppercase">
                    {meta.contact_section_title}
                  </span>
                </Link>
                <span className="text-palette-denim text-xs lg:text-sm">
                  / 03
                </span>
              </motion.div>
            </motion.nav>
          </motion.section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
