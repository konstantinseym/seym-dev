export default function Btn({ children, onClick }) {
  return (
    <button
      className="border-palette-denim cursor-pointer rounded-sm border px-4 py-1 text-xs lg:text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
