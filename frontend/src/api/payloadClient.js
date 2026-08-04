const PAYLOAD_URL = import.meta.env.VITE_PAYLOAD_URL;

if (!PAYLOAD_URL) {
  throw new Error("VITE_PAYLOAD_URL is not configured");
}

export async function payloadFetch(path, options = {}) {
  const response = await fetch(`${PAYLOAD_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(
      `Payload request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
