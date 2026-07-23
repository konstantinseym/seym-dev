import { Link } from "react-router-dom";

export default function ProjectCard({ projectData, index }) {
  return (
    <Link
      className="tracking-custom text-palette-eggshell relative m-2 flex h-24 max-w-5xl flex-col items-end justify-between overflow-hidden lg:m-4"
      to={"/projects/" + projectData.slug}
    >
      <div className="relative m-1 flex w-4/5 items-center justify-between">
        <span>/ {index}</span>
        <p className="uppercase">{projectData.description}</p>
        <div className="border-palette-eggshell absolute right-0 bottom-0 w-4/5 border-b" />
      </div>
      <h3>{projectData.name}</h3>
      <img
        className="absolute -z-10 w-full -translate-y-1/4 object-cover"
        src={projectData.images[0]}
        alt=""
      />
    </Link>
  );
}
