export default function ContactsGrid({ contacts }) {
  return (
    <div className="mr-8 ml-12 flex flex-col gap-5">
      {contacts.map((contact, index) => (
        <div key={contact.id} className="flex justify-between">
          <span className="tracking-custom">{"/ " + (index + 1)}</span>
          <div className="flex flex-col items-end">
            <span className="tracking-custom uppercase">{contact.label}</span>
            <span className="text-palette-denim text-xs leading-2">
              {contact.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
