export default function ScrollDrivenContainer({ children, sectionRef }) {
  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 mx-auto flex h-screen w-full max-w-7xl flex-col">
        {children}
      </div>
    </section>
  );
}
