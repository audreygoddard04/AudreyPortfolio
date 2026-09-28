"use client";
import { createElement } from "react";
import { trackEvent } from "../lib/analytics.mjs";
import { safeHttpUrl } from "../keltner/editorial.mjs";

// Use only for CMS-marked affiliate links. Ordinary links remain ordinary anchors.
export default function AffiliateLink({
  href,
  merchant,
  articleSlug,
  category,
  destination,
  placement,
  children,
  target = "_blank",
  rel = "",
  onClick,
  onAuxClick,
  ...props
}) {
  const url = safeHttpUrl(href);
  if (!url) return createElement("span", null, children);
  function track(event) {
    if (event.defaultPrevented) return;
    trackEvent("affiliate_click", {
      merchant,
      article_slug: articleSlug,
      category,
      destination,
      placement,
      link_url: url,
    });
  }
  return createElement(
    "a",
    {
      ...props,
      href: url,
      target,
      rel: [
        ...new Set([
          ...rel.split(/\s+/).filter(Boolean),
          "sponsored",
          "nofollow",
          "noopener",
          "noreferrer",
        ]),
      ].join(" "),
      onClick(event) {
        onClick?.(event);
        track(event);
      },
      onAuxClick(event) {
        onAuxClick?.(event);
        if (event.button === 1) track(event);
      },
    },
    children,
  );
}
