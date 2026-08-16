type SectionHeaderProps = {
  label: string
}

export default function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <h2 className="text-palette-eggshell tracking-custom px-9 pt-6 pb-9 text-5xl lowercase lg:text-7xl">
      {label}
    </h2>
  )
}
