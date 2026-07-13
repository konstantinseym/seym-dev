import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { MetaContext } from "./metaContext";

export function MetaProvider({ children }) {
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getMeta() {
      try {
        const { data, error } = await supabase.rpc("get_meta");

        if (error) {
          throw error;
        }

        setMeta(data);
      } catch (error) {
        console.error("Failed to load meta:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getMeta();
  }, []);

  return (
    <MetaContext.Provider value={{ meta, isLoading, isError }}>
      {children}
    </MetaContext.Provider>
  );
}
