import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProject } from "../api/portfolioApi";
import ScreenError from "../components/ScreenError";
import ScreenLoader from "../components/ScreenLoader";

export default function Project() {
  const { name } = useParams();

  const projectQuery = useQuery({
    queryKey: ["project", name],
    queryFn: () => getProject(name),
  });

  const parentVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.125 },
    },
  };

  const childrenVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      {projectQuery.isPending && <ScreenLoader />}
      {projectQuery.isError && (
        <ScreenError handleReload={projectQuery.refetch} />
      )}
      {projectQuery.isSuccess && (
        <motion.section
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto flex min-h-screen max-w-7xl flex-col items-start gap-9 py-9"
        >
          <motion.div
            variants={childrenVariants}
            className="relative overflow-hidden"
          >
            <img
              className="ml-auto aspect-video w-9/10 max-w-lg object-cover opacity-90"
              src={projectQuery.data.images[0]}
            />
            <h1 className="text-palette-eggshell absolute right-0 bottom-0 text-4xl leading-6 font-medium">
              {projectQuery.data.name}
            </h1>
          </motion.div>
          <motion.div variants={childrenVariants}>
            <h2 className="tracking-custom ml-3 text-left text-sm font-normal uppercase lg:text-base">
              / 1 overview
            </h2>
            <div className="border-palette-space w-3/4 border-b" />
            <p className="mt-4 ml-3 max-w-17/20 text-xs leading-5 lg:text-sm">
              {projectQuery.data.overview}
            </p>
          </motion.div>

          <motion.img
            variants={childrenVariants}
            className="aspect-video w-9/10 max-w-lg self-start object-cover opacity-90"
            src={projectQuery.data.images[1]}
          />
          <motion.div variants={childrenVariants}>
            <h2 className="tracking-custom ml-3 text-left text-sm font-normal uppercase lg:text-base">
              / 2 stack
            </h2>
            <div className="border-palette-space w-3/4 border-b" />
            <p className="mt-4 ml-3 max-w-17/20 text-xs leading-5 lg:text-sm">
              {projectQuery.data.stack}
            </p>
          </motion.div>
          <motion.a
            variants={childrenVariants}
            href={projectQuery.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-palette-denim self-center font-medium underline"
          >
            {projectQuery.data.url}
          </motion.a>
        </motion.section>
      )}
    </>
  );
}
