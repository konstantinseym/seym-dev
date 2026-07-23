import { motion } from "motion/react";

export default function ScreenError({ handleReload }) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
        className="mx-4 flex flex-col gap-2 text-center font-medium uppercase"
      >
        sorry, loading failed.
        <button type="button" onClick={handleReload}>
          reload
        </button>
      </motion.span>
    </div>
  );
}
