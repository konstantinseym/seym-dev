import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";

import { ELEMENT_TRANSITION } from "../config/motion.config";
import { getContacts } from "../api/contactApi";
import { useMeta } from "../context/metaContext";
import ContactForm from "../components/ContactForm";
import ContactsGrid from "../components/ContactsGrid";
import SectionContentWrapper from "../components/SectionContentWrapper";
import SectionHeader from "../components/SectionHeader";

export default function HomeContact() {
  const { meta } = useMeta();

  const contactsQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
  });

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col">
      <SectionHeader>{meta.contact_section_title}</SectionHeader>
      <SectionContentWrapper>
        {contactsQuery.isPending && null}
        {contactsQuery.isError && <div>Error</div>}

        {contactsQuery.isSuccess && (
          <>
            <motion.div
              key="form"
              initial={{ x: -32, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={ELEMENT_TRANSITION}
            >
              <ContactForm />
            </motion.div>
            <ContactsGrid contacts={contactsQuery.data} />
          </>
        )}
      </SectionContentWrapper>
    </div>
  );
}
