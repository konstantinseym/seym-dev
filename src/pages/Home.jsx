import Footer from "../sections/Footer";
import HomeHero from "../sections/HomeHero";
import HomePortfolio from "../sections/HomePortfolio";
import HomeAbout from "../sections/HomeAbout";
import HomeContact from "../sections/HomeContact";
import { useMeta } from "../hooks/useMeta";

export default function Home() {
  const metaQuery = useMeta();

  if (metaQuery.isPending) return <></>;
  if (metaQuery.isError) return <p>Error</p>;

  return (
    <>
      <HomeHero />
      <main>
        <HomePortfolio />
        <HomeAbout />
        <HomeContact />
      </main>
      <Footer />
    </>
  );
}
