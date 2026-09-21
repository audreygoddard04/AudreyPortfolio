export function safeHttpUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
export function hasAffiliateLinks(article) {
  return (
    (article.products || []).some(
      (product) => product?.isAffiliate && safeHttpUrl(product.url),
    ) ||
    (article.body || []).some((block) =>
      (block.markDefs || []).some(
        (mark) =>
          mark._type === "link" && mark.isAffiliate && safeHttpUrl(mark.href),
      ),
    )
  );
}
export function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
