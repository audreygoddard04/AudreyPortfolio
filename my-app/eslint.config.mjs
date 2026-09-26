import js from "@eslint/js";
import react from "eslint-plugin-react";
import globals from "globals";
export default [
  { ignores: [".next/**", "build/**", "node_modules/**"] },
  {
    files: [
      "app/keltner/**/*.{js,jsx}",
      "src/keltner/**/*.{js,jsx,mjs}",
      "src/sanity/schema.js",
      "src/components/{GoldFrame,NewsletterPopup,useNewsletterSignup}.{js,jsx}",
      "app/layout.jsx",
      "pages/api/subscribe.js",
      "scripts/*.test.mjs",
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react },
    settings: { react: { version: "detect" } },
    rules: {
      ...js.configs.recommended.rules,
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/no-unknown-property": "error",
    },
  },
];
