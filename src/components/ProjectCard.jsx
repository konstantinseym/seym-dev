import { Link } from "react-router-dom";

export default function ProjectCard({ projectData, index }) {
  return (
    <Link
      className="tracking-custom text-palette-eggshell relative flex h-24 max-w-5xl flex-col items-end justify-between pt-1"
      to={"/projects/" + projectData.slug}
    >
      <div className="relative flex w-4/5 items-center justify-between">
        <span>/ {index}</span>
        <p className="uppercase">{projectData.description}</p>
        <div className="border-palette-eggshell absolute right-0 bottom-0 w-4/5 border-b" />
      </div>
      <h3>{projectData.name}</h3>

      <div className="bg-palette-carbon absolute inset-0 -z-10 w-full">
        <img
          className="h-full w-full object-cover opacity-30"
          src={projectData.images[0]}
          alt=""
        />
      </div>
    </Link>
  );
}
