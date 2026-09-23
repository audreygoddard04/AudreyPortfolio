/**
 * siteConfig.js
 *
 * Single source of truth for site-wide metadata: URLs, default SEO values,
 * and social profile links. Import this wherever you need site-level info
 * so you only ever update it in one place.
 */

const siteConfig = {
  // The public-facing site name (used in <title> and OG tags)
  siteName: 'Audrey Goddard',

  // Canonical root URL — no trailing slash
  siteUrl: 'https://audreygoddard.com',

  // Fallback <title> used when no page-specific title is provided
  defaultTitle: 'Audrey Goddard | Science, Systems, Business & the Built World',

  // Template for page-specific titles, e.g. "About Me | Audrey Goddard"
  titleTemplate: '%s | Audrey Goddard',

  // Fallback meta description used when no page-specific description is provided
  defaultDescription:
    'Audrey Goddard writes on genetics, health, business, architecture, and real estate — investigating how systems, economics, and human preference shape the built and living world.',

  // Default OG image (relative path from /public)
  defaultImage: '/collage.png',

  // Author name used in structured data (JSON-LD)
  author: 'Audrey Goddard',

  // Social profile URLs — used by JSON-LD (Person schema) and shared by
  // Header & Footer so link URLs only live here, not in two components.
  sameAs: [
    'https://linkedin.com/in/audrey-goddard',
    'https://www.instagram.com/audrey_goddard/',
    'https://x.com/audreygoddard_',
    'https://audreyannagoddard.substack.com/',
  ],
};

// ES module export — consistent with the rest of the codebase
export default siteConfig;
