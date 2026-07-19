import { useState } from "react";

import SendIcon from "./SendIcon";
import { useMeta } from "../context/metaContext";

export default function ContactForm() {
  const { meta } = useMeta();
  const [inputValue, setInputValue] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(inputValue);
  }

  return (
    <form
      className="bg-palette-space text-palette-eggshell mr-3 mb-12 flex flex-col gap-3 p-6"
      onSubmit={handleFormSubmit}
    >
      <span className="text-3xl font-medium">{meta.contact_title}</span>
      <span className="text-palette-denim text-sm">
        {meta.contact_form_label}
      </span>

      <div className="relative w-4/5">
        <input
          className="h-7 w-full border-b px-2 text-center text-xs outline-0"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={meta.contact_input_placeholder}
        />
        <button
          className="text-palette-eggshell absolute top-1/2 -right-6 -translate-y-1/2 cursor-pointer"
          type="submit"
        >
          <SendIcon width="18" />
        </button>
      </div>
    </form>
  );
}
