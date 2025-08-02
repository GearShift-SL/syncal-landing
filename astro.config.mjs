// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: 'https://autoipc.es',
  integrations: [
    icon(),
    sitemap({
      filter: (page) => page !== 'https://autoipc.es/stripe-callback/',
    }),
    mdx(),
    react(),
  ],
  trailingSlash: 'always',
});
