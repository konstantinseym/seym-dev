import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";

import { getPortfolio } from "../api/portfolioApi";
import { useMeta } from "../hooks/useMeta";
import ProjectCard from "../components/ProjectCard";
import SectionHeader from "../components/SectionHeader";

export default function Portfolio() {
  const metaQuery = useMeta();

  const portfolioQuery = useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
  });

  if (portfolioQuery.isPending) return;

  return (
    <section className="flex min-h-screen w-full flex-col items-center bg-white py-24">
      <SectionHeader>{metaQuery.data.portfolioSectionTitle}</SectionHeader>

      <ul className="flex flex-col gap-16 px-8 lg:grid lg:grid-cols-2 lg:px-16">
        {portfolioQuery.data.map((project) => (
          <li key={project.id}>
            <ProjectCard projectData={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
