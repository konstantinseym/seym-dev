import { useRef } from "react";

import HomeHero from "../sections/HomeHero";
import HomePortfolio from "../sections/HomePortfolio";
import HomeAbout from "../sections/HomeAbout";
import HomeContact from "../sections/HomeContact";
import NavBar from "../components/NavBar";
import { useMeta } from "../context/metaContext";

export default function Home() {
  const { meta, isLoading, isError } = useMeta();

  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  if (isLoading) return <></>;
  if (isError) return <p>Error</p>;

  const navElements = [
    <button
      className="cursor-pointer"
      onClick={() => portfolioRef.current.scrollIntoView()}
    >
      {meta.portfolio_section_title}
    </button>,
    <button
      className="cursor-pointer"
      onClick={() => aboutRef.current.scrollIntoView()}
    >
      {meta.about_section_title}
    </button>,
    <button
      className="cursor-pointer"
      onClick={() => contactRef.current.scrollIntoView()}
    >
      {meta.contact_section_title}
    </button>,
  ];

  return (
    <div className="relative">
      <NavBar elements={navElements} />
      <HomeHero navElements={navElements} />
      <main>
        <div ref={portfolioRef}>
          <HomePortfolio />
        </div>
        <div ref={aboutRef}>
          <HomeAbout />
        </div>
        <div ref={contactRef}>
          <HomeContact />
        </div>
      </main>
    </div>
  );
}
