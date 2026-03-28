// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import expressiveCode from "astro-expressive-code";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Overridden by SITE/BASE env vars during GitHub Pages CI build
  site: process.env.SITE ?? "https://your-domain.com",
  base: process.env.BASE ?? "/",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    expressiveCode({
      themeCssSelector: (theme) => `.${theme.type}`,
      themes: ["material-theme-darker", "material-theme-lighter"],
    }),
    mdx(),
    icon(),
    sitemap(),
  ],

  env: {
    schema: {
      UMAMI_URL: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
      UMAMI_WEBSITE_ID: envField.string({
        context: "server",
        access: "public",
        optional: true,
      }),
    },
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.fontsource(),
        name: "Space Grotesk",
        cssVariable: "--font-display",
      },
    ],
  },
});
