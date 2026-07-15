import { useMeta } from "../context/metaContext";

export default function Footer({ navElements }) {
  const { meta } = useMeta();

  return (
    <footer className="bg-palette-space text-palette-denim flex flex-col items-center gap-6 py-4 lg:py-6">
      <span className="text-palette-eggshell text-2xl font-bold lg:text-3xl">
        {meta.site_logo_text}
      </span>
      <nav>
        <ul className="flex list-disc flex-col gap-1">
          {navElements.map((element, index) => (
            <li key={index}>{element}</li>
          ))}
        </ul>
      </nav>
      <a href="#" target="_blank">
        {meta.policy_label}
      </a>
    </footer>
  );
}
