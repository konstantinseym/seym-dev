import { useMeta } from "../hooks/useMeta";
import ScreenLoader from "./ScreenLoader";
import ScreenError from "./ScreenError";

export default function MetaGate({ children }) {
  const metaQuery = useMeta();

  if (metaQuery.isPending) return <ScreenLoader />;

  if (metaQuery.isError) {
    return <ScreenError handleReload={metaQuery.refetch} />;
  }

  return children;
}
