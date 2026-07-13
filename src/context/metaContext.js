import { createContext, useContext } from "react";

export const MetaContext = createContext(null);

export function useMeta() {
  const value = useContext(MetaContext);
  return value;
}
