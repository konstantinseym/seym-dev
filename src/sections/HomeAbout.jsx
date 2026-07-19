import { useQuery } from "@tanstack/react-query";

import { getAbout } from "../api/aboutApi";
import { useMeta } from "../context/metaContext";
import SectionContainer from "../components/SectionContainer";
import SectionContentWrapper from "../components/SectionContentWrapper";
import SectionHeader from "../components/SectionHeader";

export default function HomeAbout() {
  const { meta } = useMeta();

  const aboutQuery = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  if (aboutQuery.isPending) return <></>;
  if (aboutQuery.isError) return <div>Error</div>;

  console.log(aboutQuery.data);

  return (
    <SectionContainer>
      <SectionHeader>{meta.about_section_title}</SectionHeader>
      <SectionContentWrapper>
        <article className="flex flex-col">
          <img
            className="aspect-video w-9/10 self-end object-cover"
            src={aboutQuery.data.image_url}
          />
          {aboutQuery.data.sections.map((section, index) => (
            <div className="mt-12" key={index}>
              <h3 className="tracking-custom ml-3 uppercase">
                {"/ " + (index + 1) + " " + section.section}
              </h3>
              <div className="border-palette-space w-3/4 border-b" />
              <p className="mt-4 ml-3 max-w-17/20 text-xs leading-5">
                {section.value}
              </p>
            </div>
          ))}
        </article>
      </SectionContentWrapper>
    </SectionContainer>
  );
}
