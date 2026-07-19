import { useQuery } from "@tanstack/react-query";

import { getProjectsList } from "../api/portfolioApi";
import { useMeta } from "../context/metaContext";
import SectionContainer from "../components/SectionContainer";
import SectionContentWrapper from "../components/SectionContentWrapper";
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
    <SectionContainer>
      <SectionHeader>{meta.portfolio_section_title}</SectionHeader>
      <SectionContentWrapper>
        {projectsQuery.data.map((project, index) => (
          <div key={project.id} className="px-3 py-2">
            <ProjectCard projectData={project} index={index + 1} />
          </div>
        ))}
      </SectionContentWrapper>
    </SectionContainer>
  );
}
