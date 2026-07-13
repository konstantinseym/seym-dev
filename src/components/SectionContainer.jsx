export default function SectionContainer({ children }) {
  return (
    <div className="flex w-full max-w-7xl flex-1 flex-col py-32">
      {children}
    </div>
  );
}
