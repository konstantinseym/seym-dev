import { useQuery } from "@tanstack/react-query";

import { getMeta } from "../api/metaApi";

export function useMeta() {
  const query = useQuery({
    queryKey: ["meta"],
    queryFn: getMeta,
    staleTime: Infinity,
  });

  return { ...query, meta: query.data };
}
