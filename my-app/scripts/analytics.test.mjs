import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import {
  analyticsUrl,
  trackEvent,
  newsletterLocation,
  signupLocations,
} from "../src/lib/analytics.mjs";
import AffiliateLink from "../src/components/AffiliateLink.js";

function withAnalytics(run) {
  const calls = [];
  globalThis.window = { gtag: (...args) => calls.push(args) };
  try {
    run(calls);
  } finally {
    delete globalThis.window;
  }
}
test("Tracking is safe without a browser, GA, or with a throwing GA implementation", () => {
  assert.equal(
    trackEvent("newsletter_signup", { signup_location: "footer" }),
    false,
  );
  globalThis.window = {};
  assert.equal(
    trackEvent("newsletter_signup", { signup_location: "footer" }),
    false,
  );
  globalThis.window.gtag = () => {
    throw new Error("blocked");
  };
  assert.equal(
    trackEvent("newsletter_signup", { signup_location: "footer" }),
    false,
  );
  delete globalThis.window;
});
test("Newsletter payload contains only a supported signup location", () =>
  withAnalytics((calls) => {
    for (const location of signupLocations)
      trackEvent("newsletter_signup", {
        signup_location: location,
        email: "reader@example.com",
        firstName: "Reader",
        subscriber_id: "private-id",
      });
    assert.deepEqual(
      calls,
      signupLocations.map((signup_location) => [
        "event",
        "newsletter_signup",
        { signup_location },
      ]),
    );
    assert.equal(
      trackEvent("newsletter_signup", {
        signup_location: "reader@example.com",
      }),
      false,
    );
    assert.equal(trackEvent("page_view", {}), false);
    assert.equal(calls.length, signupLocations.length);
  }));
test("Actual shared-section routes map correctly, including after client navigation", () => {
  assert.equal(newsletterLocation("/keltner"), "homepage");
  assert.equal(newsletterLocation("/keltner/newsletter"), "newsletter_page");
  assert.equal(
    newsletterLocation("/keltner/articles/real-story"),
    "article_end",
  );
  assert.equal(newsletterLocation("/keltner/style"), "footer");
});
test("Analytics URLs remove credentials, query strings, fragments and email-bearing paths", () => {
  assert.equal(
    analyticsUrl(
      "https://user:password@shop.example/item?email=reader%40example.com&subscriber_id=secret#name",
    ),
    "https://shop.example/item",
  );
  assert.equal(
    analyticsUrl("https://shop.example/reader%40example.com"),
    "https://shop.example/",
  );
  for (const url of [
    "javascript:alert(1)",
    "mailto:reader@example.com",
    "invalid",
  ])
    assert.equal(analyticsUrl(url), undefined);
});
test("Affiliate click passes known editorial metadata once without changing navigation", () =>
  withAnalytics((calls) => {
    const href = "https://shop.example/product?affiliate=partner#details";
    const link = AffiliateLink({
      href,
      merchant: "Example Shop",
      articleSlug: "real-story",
      category: "style",
      destination: "country/city",
      placement: "product_card",
      children: "View product",
    });
    const event = {
      defaultPrevented: false,
      preventDefault: () => assert.fail("Navigation must not be cancelled"),
    };
    link.props.onClick(event);
    assert.deepEqual(calls, [
      [
        "event",
        "affiliate_click",
        {
          merchant: "Example Shop",
          article_slug: "real-story",
          category: "style",
          destination: "country/city",
          placement: "product_card",
          link_url: "https://shop.example/product",
        },
      ],
    ]);
    assert.equal(link.props.href, href);
    assert.equal(link.props.target, "_blank");
    for (const value of ["sponsored", "nofollow", "noopener", "noreferrer"])
      assert.ok(link.props.rel.split(" ").includes(value));
    assert.match(renderToStaticMarkup(link), /<a /);
    assert.equal(calls.length, 1, "rendering cannot fire another event");
  }));
test("Minimal links work, middle-click fires once, right-click and cancelled clicks do not", () =>
  withAnalytics((calls) => {
    const link = AffiliateLink({
      href: "https://shop.example/",
      children: "Shop",
    });
    link.props.onAuxClick({ button: 2 });
    link.props.onClick({ defaultPrevented: true });
    assert.equal(calls.length, 0);
    link.props.onAuxClick({ button: 1 });
    assert.deepEqual(calls, [
      ["event", "affiliate_click", { link_url: "https://shop.example/" }],
    ]);
    assert.equal(
      AffiliateLink({ href: "javascript:alert(1)", children: "Unsafe" }).type,
      "span",
    );
  }));
test("Affiliate payload drops unknown fields and obvious email values", () =>
  withAnalytics((calls) => {
    trackEvent("affiliate_click", {
      merchant: "reader@example.com",
      category: "travel",
      email: "reader@example.com",
      subscriber_id: "private",
      link_url: "https://shop.example/?email=reader@example.com",
    });
    assert.deepEqual(calls[0][2], {
      category: "travel",
      link_url: "https://shop.example/",
    });
  }));
