import { useMeta } from "../hooks/useMeta";

export default function Footer() {
  const { meta } = useMeta();

  return (
    <div className="text-palette-eggshell flex flex-col">
      <span className="-tracking-custom mt-12 text-6xl lg:text-8xl">
        {meta.contact_thanks_label}
      </span>
      <div className="text-palette-eggshell/50 tracking-custom flex flex-col items-center gap-4 pt-12 pb-6 uppercase">
        <a
          href={"mailto:" + meta.owner_email}
          target="_blank"
          rel="noopener noreferrer"
        >
          {meta.owner_email}
        </a>
        <div className="border-palette-eggshell/50 w-xs border-b" />
        <a href="#" target="_blank" rel="noopener noreferrer">
          {meta.policy_label}
        </a>
      </div>
    </div>
  );
}
