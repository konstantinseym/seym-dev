import { motion } from "motion/react";

import { ELEMENT_TRANSITION } from "../config/motion.config";

export default function ContactsGrid({ contacts }) {
  return (
    <div className="mr-8 ml-12 flex flex-col gap-5">
      {contacts.map((contact, index) => (
        <motion.div
          key={contact.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...ELEMENT_TRANSITION, delay: index * 0.1 }}
          viewport={{ amount: 1, once: true }}
          className="flex justify-between"
        >
          <span className="tracking-custom">{"/ " + (index + 1)}</span>
          <div className="flex flex-col items-end">
            <span className="tracking-custom uppercase">{contact.label}</span>
            <span className="text-palette-denim text-xs leading-2 lg:text-sm">
              {contact.value}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
