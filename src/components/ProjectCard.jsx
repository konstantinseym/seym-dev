import { useNavigate } from "react-router-dom";

export default function ProjectCard({ projectData, index }) {
  const navigate = useNavigate();

  return (
    <div
      className="tracking-custom relative m-2 flex h-24 cursor-pointer flex-col items-end justify-between overflow-hidden"
      onClick={() => navigate("/projects/" + projectData.slug)}
    >
      <div className="relative m-1 flex w-4/5 items-center justify-between">
        <span className="text-palette-eggshell text-sm">/ {index}</span>
        <h4 className="text-palette-eggshell text-sm uppercase">
          {projectData.description}
        </h4>
        <div className="border-palette-eggshell absolute right-0 bottom-0 w-4/5 border-b" />
      </div>

      <h3 className="text-palette-eggshell text-sm">{projectData.name}</h3>

      <img
        className="absolute -z-10 w-full -translate-y-1/4 object-cover"
        src={projectData.images[0]}
      />
    </div>
  );
}
