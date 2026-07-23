import HomeHero from "../sections/HomeHero";
import HomePortfolio from "../sections/HomePortfolio";
import HomeAbout from "../sections/HomeAbout";
import HomeContact from "../sections/HomeContact";
import ScreenError from "../components/ScreenError";
import ScreenLoader from "../components/ScreenLoader";
import { useMeta } from "../hooks/useMeta";

export default function Home() {
  const metaQuery = useMeta();

  return (
    <>
      {metaQuery.isPending && <ScreenLoader />}
      {metaQuery.isError && <ScreenError handleReload={metaQuery.refetch} />}
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
