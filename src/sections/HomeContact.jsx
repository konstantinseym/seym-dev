import { useQuery } from "@tanstack/react-query";

import { getContacts } from "../api/contactApi";
import { useMeta } from "../context/metaContext";
import ContactForm from "../components/ContactForm";
import ContactsGrid from "../components/ContactsGrid";
import SectionContainer from "../components/SectionContainer";

export default function HomeContact() {
  const { meta } = useMeta();

  const contactsQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  if (contactsQuery.isPending) return <></>;
  if (contactsQuery.isError) return <div>Error</div>;

  return (
    <section className="flex flex-col items-center">
      <SectionContainer>
        <div className="flex w-full max-w-2xl flex-col items-center self-center">
          <span className="mb-16 text-3xl font-semibold lg:text-4xl">
            {meta.contact_title}
          </span>
          <ContactForm />
          <ContactsGrid contacts={contactsQuery.data} />
          <span className="text-palette-denim mt-12 text-xs lg:text-sm">
            {meta.contact_thanks_label}
          </span>
        </div>
      </SectionContainer>
    </section>
  );
}
