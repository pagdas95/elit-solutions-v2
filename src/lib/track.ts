type Umami = { track: (event: string, data?: Record<string, string>) => void };

/** Send a custom analytics event if analytics is loaded; no-op otherwise. */
export function track(event: string, data?: Record<string, string>) {
  try {
    (window as unknown as { umami?: Umami }).umami?.track(event, data);
  } catch {
    // analytics must never break the page
  }
}
