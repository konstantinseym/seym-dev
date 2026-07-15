import { useState } from "react";

import { useMeta } from "../context/metaContext";
import Btn from "./Btn";

export default function ContactForm() {
  const { meta } = useMeta();
  const [inputValue, setInputValue] = useState("");

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(inputValue);
  }

  return (
    <form
      className="mb-24 flex flex-col items-center gap-4"
      onSubmit={handleFormSubmit}
    >
      <h3 className="text-sm lg:text-base">{meta.contact_form_label}</h3>
      <input
        className="border-palette-denim h-7 w-xs rounded-full border bg-white px-2 text-center text-xs outline-0 focus:border-2 lg:h-9 lg:w-sm lg:text-sm"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={meta.contact_input_placeholder}
      />
      <Btn type="submit">send</Btn>
    </form>
  );
}
