export default function NavBar({ elements }) {
  return (
    <nav className="fixed left-1/2 z-10 hidden -translate-x-1/2">
      <ul className="flex gap-8 py-6 font-medium lg:gap-16">
        {elements.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
    </nav>
  );
}
