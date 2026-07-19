import Footer from "../sections/Footer";
import HomeHero from "../sections/HomeHero";
import HomePortfolio from "../sections/HomePortfolio";
import HomeAbout from "../sections/HomeAbout";
import HomeContact from "../sections/HomeContact";
import { useMeta } from "../context/metaContext";

export default function Home() {
  const { isLoading, isError } = useMeta();

  if (isLoading) return <></>;
  if (isError) return <p>Error</p>;

  return (
    <div>
      <HomeHero />
      <main>
        <HomePortfolio />
        <HomeAbout />
        <HomeContact />
      </main>
      <Footer />
    </div>
  );
}
