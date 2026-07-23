import { motion, useScroll, useTransform } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

import { getProjectsList } from "../api/portfolioApi";
import { useMeta } from "../hooks/useMeta";
import { ELEMENT_TRANSITION } from "../config/motion.config";
import ScrollDrivenContainer from "../components/ScrollDrivenContainer";
import SectionContentWrapper from "../components/SectionContentWrapper";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";

export default function HomePortfolio() {
  const portfolioRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: portfolioRef,
    offset: ["start start", "end end"],
  });

  const headerTranslatePath = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", "-10vw"],
  );
  const contentY = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const hintOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 1, 1, 0],
  );

  const { meta } = useMeta();

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: getProjectsList,
  });

  return (
    <ScrollDrivenContainer sectionRef={portfolioRef}>
      <motion.div key="header" style={{ x: headerTranslatePath }}>
        <SectionHeader>{meta.portfolio_section_title}</SectionHeader>
      </motion.div>
      <SectionContentWrapper>
        {projectsQuery.isPending && null}
        {projectsQuery.isError && <div>Error</div>}

        {projectsQuery.isSuccess && (
          <motion.div
            key="content"
            style={{ y: contentY }}
            className="flex flex-col"
          >
            <motion.span
              className="tracking-custom text-palette-denim mb-4 text-center text-xs font-medium lg:text-sm"
              style={{ opacity: hintOpacity }}
            >
              {meta.portfolio_hint}
            </motion.span>
            <motion.ul className="flex flex-col gap-px">
              {projectsQuery.data.map((project, index) => (
                <motion.li
                  key={project.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...ELEMENT_TRANSITION, delay: index * 0.1 }}
                  viewport={{ amount: 1, once: true }}
                >
                  <ProjectCard projectData={project} index={index + 1} />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </SectionContentWrapper>
    </ScrollDrivenContainer>
  );
}
