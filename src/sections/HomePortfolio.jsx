import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import { useMeta } from "../context/metaContext";

export default function HomePortfolio() {
  const { meta } = useMeta();

  return (
    <section className="flex min-h-screen flex-col items-center">
      <SectionContainer>
        <SectionHeader>{meta.portfolio_section_title}</SectionHeader>
        <div className="flex flex-1 flex-col items-center justify-around gap-4 px-4">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </SectionContainer>
    </section>
  );
}
