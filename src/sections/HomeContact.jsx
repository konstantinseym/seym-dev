import { useQuery } from "@tanstack/react-query";

import { getContacts } from "../api/contactApi";
import { useMeta } from "../context/metaContext";
import ContactForm from "../components/ContactForm";
import ContactsGrid from "../components/ContactsGrid";
import SectionContainer from "../components/SectionContainer";
import SectionContentWrapper from "../components/SectionContentWrapper";
import SectionHeader from "../components/SectionHeader";

export default function HomeContact() {
  const { meta } = useMeta();

  const contactsQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  if (contactsQuery.isPending) return <></>;
  if (contactsQuery.isError) return <div>Error</div>;

  return (
    <SectionContainer>
      <SectionHeader>{meta.contact_section_title}</SectionHeader>
      <SectionContentWrapper>
        <ContactForm />
        <ContactsGrid contacts={contactsQuery.data} />
      </SectionContentWrapper>
    </SectionContainer>
  );
}
