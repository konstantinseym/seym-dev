import { useMeta } from "../context/metaContext";

export default function ContactsGrid({ contacts }) {
  const { meta } = useMeta();

  return (
    <div className="flex w-full flex-col px-4 text-sm lg:text-base">
      <span className="my-4">{meta.contact_direct_label}</span>
      <div className="grid w-full grid-cols-2 place-items-center gap-4 self-center px-6">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border-palette-denim flex w-full max-w-64 flex-col rounded-sm border px-3 py-2 text-xs font-medium lg:text-sm"
          >
            <span className="text-palette-denim">{contact.label}</span>
            <span>{contact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
