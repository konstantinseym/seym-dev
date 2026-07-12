export default function HomeHero({ siteLogoText, siteLogoSubtitle }) {
  return (
    <header className="flex min-h-screen flex-col items-start justify-center lg:items-center">
      <div className="-translate-x-1/4 pl-[30vw] lg:translate-x-0 lg:pl-0">
        <p className="text-[40px] leading-12 font-bold lg:text-[64px] lg:leading-18">
          {siteLogoText}
        </p>
        <h1 className="text-palette-denim text-base font-bold lg:text-2xl">
          {siteLogoSubtitle}
        </h1>
      </div>
    </header>
  );
}
