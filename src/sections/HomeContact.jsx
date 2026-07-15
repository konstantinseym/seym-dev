import { useMeta } from "../context/metaContext";
import SectionContainer from "../components/SectionContainer";
import SectionHeader from "../components/SectionHeader";

export default function HomeContact() {
  const { meta } = useMeta();

  return (
    <section className="flex flex-col items-center">
      <SectionContainer>
        <SectionHeader>{meta.contact_section_title}</SectionHeader>
      </SectionContainer>
    </section>
  );
}
