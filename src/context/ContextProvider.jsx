import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { MetaContext } from "./metaContext";

export function MetaProvider({ children }) {
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMeta() {
      const { data, error } = await supabase.rpc("get_meta");

      if (error) throw error;

      setMeta(data);
      setIsLoading(false);
    }

    getMeta();
  }, []);

  return (
    <MetaContext.Provider value={{ meta, isLoading }}>
      {children}
    </MetaContext.Provider>
  );
}
