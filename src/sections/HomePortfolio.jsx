import { motion, useScroll, useTransform } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

import { getProjectsList } from "../api/portfolioApi";
import { useMeta } from "../context/metaContext";
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
              className="tracking-custom text-palette-denim my-4 text-center text-xs font-medium lg:text-sm"
              style={{ opacity: hintOpacity }}
            >
              click card to see project details
            </motion.span>
            {projectsQuery.data.map((project, index) => (
              <div key={project.id}>
                <ProjectCard projectData={project} index={index + 1} />
              </div>
            ))}
          </motion.div>
        )}
      </SectionContentWrapper>
    </ScrollDrivenContainer>
  );
}
