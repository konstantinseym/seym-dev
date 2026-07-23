import { useMeta } from "../hooks/useMeta";

export default function Footer() {
  const { meta } = useMeta();

  return (
    <footer className="flex flex-col">
      <span className="text-palette-denim -tracking-custom mt-12 text-6xl lg:text-8xl">
        {meta.contact_thanks_label}
      </span>
      <div className="border-palette-denim bg-palette-eggshell text-palette-denim mx-3 flex -translate-y-2 flex-col items-center gap-4 rounded-tl-xl rounded-tr-xl border-t border-r border-l">
        <span className="text-palette-space -tracking-custom text-3xl font-bold lg:text-5xl">
          {meta.site_logo_text}
        </span>
        <a href="#" target="_blank">
          {meta.policy_label}
        </a>
      </div>
    </footer>
  );
}
