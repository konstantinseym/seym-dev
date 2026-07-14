import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";

import { CARDS_FADE_SPRING_TRANSITION } from "../config/motion.config";
import { getProjectsList } from "../api/portfolioApi";
import { useMeta } from "../context/metaContext";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";

export default function HomePortfolio() {
  const { meta } = useMeta();

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsList,
  });

  if (projectsQuery.isPending) return <></>;
  if (projectsQuery.isError) return <div>Error</div>;

  return (
    <section className="flex min-h-screen flex-col items-center">
      <SectionContainer>
        <SectionHeader>{meta.portfolio_section_title}</SectionHeader>
        <div className="mt-12 flex flex-1 flex-col gap-8 lg:mt-24">
          {projectsQuery.data.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 1 }}
              transition={CARDS_FADE_SPRING_TRANSITION}
              className="flex flex-1 flex-col items-center justify-around px-4"
            >
              <ProjectCard projectData={project} index={index + 1} />
            </motion.div>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}
