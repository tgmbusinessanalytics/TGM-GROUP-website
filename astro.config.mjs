import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Target domain is confirmed in CLAUDE.md. Canonicals and the sitemap derive from it.
export default defineConfig({
  site: 'https://trevorgmenyatsogroup.co.za',
  output: 'static',
  integrations: [
    sitemap({
      // Insights is out of scope for v1 — the collection exists but nothing is
      // routed under it. This filter is belt and braces.
      filter: (page) => !page.includes('/insights'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
