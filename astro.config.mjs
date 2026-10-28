import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Target domain is confirmed in CLAUDE.md. Canonicals and the sitemap derive from it.
export default defineConfig({
  site: 'https://trevorgmenyatsogroup.co.za',
  output: 'static',
  integrations: [
    sitemap({
      // Notes (formerly the out-of-scope "insights" collection) is now live and
      // belongs in the sitemap: the whole point of the section is being found.
      // Drafts never reach the sitemap because no page is generated for them.
      //
      // The feed is excluded because it is not a page. Listing an RSS document
      // in a sitemap invites it to be indexed as a search result.
      //
      // The two form outcome pages are excluded for the same reason they carry
      // noindex: each is the end of a journey, and landing on one from a
      // search result without having sent anything is a dead end. The failure
      // page would be actively damaging to surface, since it tells a stranger
      // our mail is broken when, for them, it is not.
      filter: (page) =>
        !page.endsWith('/notes/rss.xml') &&
        !page.endsWith('/contact/thank-you/') &&
        !page.endsWith('/contact/could-not-send/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],

    // This repository lives inside a Google Drive folder, and Drive's virtual
    // filesystem holds handles open on files it is syncing. Vite's default
    // cache sits in node_modules/.vite, which it clears and rewrites whenever
    // the config changes, and on Drive that rmdir fails with ENOTEMPTY and
    // takes the build process down with it. Keeping the cache on local disk
    // removes the whole class of failure. Nothing in it is a build artefact,
    // so it does not need to be in the repository or in a backup.
    cacheDir: join(tmpdir(), 'tgm-site-vite-cache'),
  },
});
