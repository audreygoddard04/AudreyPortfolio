export const publicationOrigin = "https://keltnerpress.com";
export const portfolioOrigin = "https://audreygoddard.com";

// Public URLs omit the implementation's /keltner route prefix. Assets keep it.
export function publicationPath(path = "/") {
  return path.replace(/^\/keltner(?=\/|#|\?|$)/, "").replace(/^(?=[#?]|$)/, "/");
}

export function publicationUrl(path = "/") {
  return new URL(publicationPath(path), publicationOrigin).href;
}

export function domainRoute(hostname, pathname) {
  const publicationHost = ["keltnerpress.com", "www.keltnerpress.com", "keltner.vercel.app"].includes(hostname);
  const portfolioHost = ["audreygoddard.com", "www.audreygoddard.com"].includes(hostname);
  const asset = /\.[^/]+$/.test(pathname);
  const legacy = /^\/keltner(?:\/|$)/.test(pathname) && !asset;
  if ((publicationHost || portfolioHost) && legacy) {
    return { type: "redirect", destination: publicationUrl(pathname) };
  }
  if (!publicationHost) return null;
  const aliases = { "/cars": "/motors", "/motoring": "/motors", "/estates": "/places" };
  if (aliases[pathname]) return { type: "redirect", destination: publicationUrl(aliases[pathname]) };
  if (hostname === "www.keltnerpress.com") {
    return { type: "redirect", destination: publicationUrl(pathname) };
  }
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname.startsWith("/studio") || asset) return null;
  return { type: "rewrite", destination: `/keltner${pathname === "/" ? "" : pathname}` };
}
