import { Link } from "react-router-dom";

export default function ProjectCard({ projectData }) {
  return (
    <div className="flex w-full flex-col items-center gap-4">
      <img className="border" src={projectData.primary_image} alt="" />
      <div className="flex w-full justify-between gap-4">
        <Link to={"/portfolio/" + projectData.slug}>
          <span className="tracking-custom text-lg font-semibold uppercase lg:text-2xl">
            {projectData.name}
          </span>
        </Link>
        <span className="text-palette-denim max-w-1/3 text-right text-xs lowercase lg:text-sm">
          {projectData.description}
        </span>
      </div>
    </div>
  );
}
