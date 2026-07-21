import { motion, useScroll, useTransform } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

import { getAbout } from "../api/aboutApi";
import { useMeta } from "../context/metaContext";
import ScrollDrivenContainer from "../components/ScrollDrivenContainer";
import SectionContentWrapper from "../components/SectionContentWrapper";
import SectionHeader from "../components/SectionHeader";

export default function HomeAbout() {
  const aboutRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start start", "end end"],
  });

  const headerTranslatePath = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", "-10vw"],
  );
  const articleTranslatePath = useTransform(
    scrollYProgress,
    [0, 1],
    ["calc(0% + 0vw)", "calc(-100% + 100vw)"],
  );

  const { meta } = useMeta();

  const aboutQuery = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  return (
    <ScrollDrivenContainer sectionRef={aboutRef}>
      <motion.div key="header" style={{ x: headerTranslatePath }}>
        <SectionHeader>{meta.about_section_title}</SectionHeader>
      </motion.div>
      <SectionContentWrapper>
        {aboutQuery.isPending && null}
        {aboutQuery.isError && <div>Error</div>}

        {aboutQuery.isSuccess && (
          <article className="flex flex-col">
            <img
              key="image"
              className="aspect-video w-9/10 self-end object-cover"
              src={aboutQuery.data.image_url}
            />
            <div key="article" className="mt-12 flex overflow-hidden">
              <motion.div
                className="flex w-max flex-nowrap"
                style={{ x: articleTranslatePath }}
              >
                {aboutQuery.data.sections.map((section, index) => (
                  <div className="w-screen shrink-0" key={index}>
                    <h3 className="tracking-custom ml-3 uppercase">
                      {"/ " + (index + 1) + " " + section.section}
                    </h3>
                    <div className="border-palette-space w-3/4 border-b" />
                    <p className="mt-4 ml-3 max-w-17/20 text-xs leading-5">
                      {section.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </article>
        )}
      </SectionContentWrapper>
    </ScrollDrivenContainer>
  );
}
