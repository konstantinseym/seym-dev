import HomeHero from "../sections/HomeHero";
import HomePortfolio from "../sections/HomePortfolio";
import HomeAbout from "../sections/HomeAbout";
import HomeContact from "../sections/HomeContact";
import ScreenLoader from "../components/ScreenLoader";
import { useMeta } from "../hooks/useMeta";

export default function Home() {
  const metaQuery = useMeta();

  if (metaQuery.isError) return <p>Error</p>;

  return (
    <>
      {metaQuery.isPending && <ScreenLoader />}
      {metaQuery.isSuccess && (
        <>
          <HomeHero />
          <main>
            <HomePortfolio />
            <HomeAbout />
            <HomeContact />
          </main>
        </>
      )}
    </>
  );
}
