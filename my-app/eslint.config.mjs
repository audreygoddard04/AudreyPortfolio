import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  { ignores: ['.next/**', 'node_modules/**'] },
  // Keep the new integration linted without rewriting legacy portfolio components.
  { ignores: ['src/views/**', 'src/components/**', 'src/data/**', 'src/keltner/ArticleContent.jsx', 'src/sanity/**', 'pages/api/send-email.js', 'pages/api/substack-feed.js', 'scripts/smoke.cjs'] },
  { rules: { '@next/next/no-img-element': 'off', '@next/next/no-html-link-for-pages': 'off' } },
];

export default config;
