export default function SectionHeader({ children }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-6">
      <h2 className="">{children}</h2>
      <div className="border-palette-space/50 w-9/10 border-b" />
    </div>
  );
}
