import { AnimatePresence, motion } from "motion/react";

import { useScroll } from "../hooks/useScroll";

export default function NavBar({ elements }) {
  const isScrolled = useScroll();

  return (
    <AnimatePresence mode="wait">
      {isScrolled ? (
        <motion.nav
          initial={{ opacity: 0, y: -54 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          key={navigation}
          className="fixed left-1/2 z-10 -translate-x-1/2"
        >
          <ul className="flex gap-8 pt-6 pb-3 font-medium lg:gap-16">
            {elements.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
          </ul>
          <div className="border-palette-denim absolute left-1/2 w-2/3 -translate-x-1/2 border-b" />
        </motion.nav>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
}
