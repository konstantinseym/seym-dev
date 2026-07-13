import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";

import HomeHero from "../sections/HomeHero";
import HomePortfolio from "../sections/HomePortfolio";
import HomeAbout from "../sections/HomeAbout";
import HomeContact from "../sections/HomeContact";
import NavBar from "../components/NavBar";
import { getMeta } from "../api/siteApi";

export default function Home() {
  // console.log(JSON.stringify(metaQuery.data));

  const portfolioRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const navElements = [
    <button
      className="cursor-pointer"
      onClick={() => portfolioRef.current.scrollIntoView()}
    >
      portfolio
    </button>,
    <button
      className="cursor-pointer"
      onClick={() => aboutRef.current.scrollIntoView()}
    >
      about
    </button>,
    <button
      className="cursor-pointer"
      onClick={() => contactRef.current.scrollIntoView()}
    >
      contact
    </button>,
  ];

  const metaQuery = useQuery({
    queryKey: ["meta"],
    queryFn: () => getMeta(),
  });

  if (metaQuery.isPending) return <p>Loading</p>;

  if (metaQuery.isError) return <p>Error</p>;
  return (
    <div className="relative">
      <NavBar elements={navElements} />
      <HomeHero
        siteLogoText={metaQuery.data.site_logo_text}
        siteLogoSubtitle={metaQuery.data.site_logo_subtitle}
        heroScrollLabel={metaQuery.data.hero_scroll_label}
        navElements={navElements}
      />
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
