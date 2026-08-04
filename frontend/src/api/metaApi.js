import { payloadFetch } from "./payloadClient";

export function getMeta() {
  return payloadFetch("/api/globals/site-settings");
}
