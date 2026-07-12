import { useQuery } from "@tanstack/react-query";

import HomeHero from "../sections/HomeHero";
import { getMeta } from "../api/siteApi";

export default function Home() {
  const metaQuery = useQuery({
    queryKey: ["meta"],
    queryFn: () => getMeta(),
  });

  if (metaQuery.isPending) return <p>Loading</p>;

  if (metaQuery.isError) return <p>Error</p>;

  console.log(JSON.stringify(metaQuery.data));

  return (
    <>
      <HomeHero
        siteLogoText={metaQuery.data.site_logo_text}
        siteLogoSubtitle={metaQuery.data.site_logo_subtitle}
      />
      <main></main>
    </>
  );
}
