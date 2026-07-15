export default function Btn({ children, onClick, type = "button" }) {
  return (
    <button
      className="border-palette-denim cursor-pointer rounded-sm border px-4 py-1 text-xs lg:text-sm"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
