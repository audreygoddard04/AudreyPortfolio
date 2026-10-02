// Only editorial metadata belongs here. Never pass form data or API responses.
export const signupLocations = [
  "footer",
  "homepage",
  "article_inline",
  "article_end",
  "popup",
  "newsletter_page",
];
export function newsletterLocation(pathname) {
  if (pathname === "/keltner" || pathname === "/") return "homepage";
  if (["/keltner/newsletter", "/newsletter"].includes(pathname)) return "newsletter_page";
  if (pathname?.startsWith("/keltner/articles/") || pathname?.startsWith("/articles/")) return "article_end";
  return "footer";
}
export function analyticsUrl(value) {
  try {
    const url = new URL(value);
    if (!["https:", "http:"].includes(url.protocol)) return undefined;
    // Preserve the navigation URL on the anchor, but never send query strings,
    // fragments or credentials (which can contain personal/affiliate IDs) to GA.
    const path = decodeURIComponent(url.pathname);
    return `${url.origin}${/@|\b(?:email|subscriber|customer|user)[_-]?id\b/i.test(path) ? "/" : url.pathname}`;
  } catch {
    return undefined;
  }
}
const affiliateFields = [
  "merchant",
  "article_slug",
  "category",
  "destination",
  "placement",
];
export function trackEvent(name, parameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function")
    return false;
  try {
    const payload = {};
    if (name === "newsletter_signup") {
      if (!signupLocations.includes(parameters.signup_location)) return false;
      payload.signup_location = parameters.signup_location;
    } else if (name === "affiliate_click") {
      for (const key of affiliateFields) {
        const value = parameters[key];
        if (typeof value === "string" && value.trim() && !/@|%40/i.test(value))
          payload[key] = value.trim().slice(0, 100);
      }
      const url = analyticsUrl(parameters.link_url);
      if (url) payload.link_url = url;
    } else return false;
    window.gtag("event", name, payload);
    return true;
  } catch {
    // Analytics must never interfere with signup or navigation.
    return false;
  }
}
