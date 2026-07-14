import { useNavigate } from "react-router-dom";

import { useMeta } from "../context/metaContext";
import Btn from "./Btn";

export default function ProjectCard({ projectData, index }) {
  const navigate = useNavigate();
  const { meta } = useMeta();

  return (
    <div className="border-palette-denim relative flex w-full max-w-md flex-col items-start border-t border-b px-4 py-6">
      <span className="text-palette-denim mb-6 text-xs font-medium lg:text-sm">
        {index}
      </span>
      <h2 className="mb-2 text-2xl lg:text-3xl">{projectData.name}</h2>
      <h3 className="text-palette-denim mb-1 font-medium lg:text-lg">
        {projectData.description}
      </h3>
      <ul className="font-courier ml-4 list-disc text-xs lg:text-sm">
        {projectData.tags.map((tag, index) => (
          <li key={index}>{tag}</li>
        ))}
      </ul>
      <div className="absolute right-1/20 bottom-1/20">
        <Btn onClick={() => navigate("/projects/" + projectData.slug)}>
          {meta.open_project_label}
        </Btn>
      </div>
    </div>
  );
}
