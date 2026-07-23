import { useMeta } from "../hooks/useMeta";

export default function Footer() {
  const { meta } = useMeta();

  return (
    <div className="flex flex-col">
      <span className="text-palette-denim -tracking-custom mt-12 text-6xl lg:text-8xl">
        {meta.contact_thanks_label}
      </span>
      <div className="bg-palette-eggshell text-palette-denim flex -translate-y-2 flex-col items-center gap-4 py-4">
        <span className="text-palette-space -tracking-custom text-3xl font-bold lg:text-5xl">
          {meta.site_logo_text}
        </span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          {meta.policy_label}
        </a>
      </div>
    </div>
  );
}
