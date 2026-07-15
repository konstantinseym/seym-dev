import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";

import { ELEMENT_FADEIN_TRANSITION } from "../config/motion.config";
import { getAbout } from "../api/aboutApi";
import { useMeta } from "../context/metaContext";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";

export default function HomeAbout() {
  const { meta } = useMeta();

  const aboutQuery = useQuery({
    queryKey: ["about"],
    queryFn: getAbout,
  });

  if (aboutQuery.isPending) return <></>;
  if (aboutQuery.isError) return <div>Error</div>;

  return (
    <section className="flex min-h-screen flex-col items-center">
      <SectionContainer>
        <SectionHeader>{meta.about_section_title}</SectionHeader>
        <motion.article
          key="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={ELEMENT_FADEIN_TRANSITION}
          className="mt-12 flex flex-1 flex-col items-center gap-8 lg:mt-24"
        >
          <img
            src={aboutQuery.data.image_url}
            alt="User avatar"
            className="aspect-square max-w-7/10 rounded-full object-cover lg:max-w-sm"
          />
          <p className="pr-16 pl-8 whitespace-pre-wrap">
            {aboutQuery.data.description}
          </p>
        </motion.article>
      </SectionContainer>
    </section>
  );
}
