# Preview — all nine pages, no build step

Open `pages.html` for a contact sheet of everything, or `index.html` to start at
the homepage and click through. Double-click either; nothing needs installing.

```
pages.html      contact sheet — links to all nine (preview only, no real equivalent)
index.html      /
services.html   /services
approach.html   /approach
about.html      /about
contact.html    /contact
privacy.html    /privacy
terms.html      /terms
paia.html       /paia
404.html        /404
preview.css     one stylesheet, shared by all of them
```

## This is not the website

These files are a hand-built mirror of `../src`, made so the site could be
looked at before Node was installed. **Nothing keeps them in step with the Astro
source.** Two rules:

1. Never edit these files to change the design. Change the Astro source and
   regenerate, or throw these away.
2. Never deploy them. They have no JSON-LD, no canonical URLs, no sitemap, no
   security headers and no real font strategy.

Once `npm run dev` works, this directory stops being useful. Delete it rather
than letting it rot into a second, wrong version of the site.

## Three deliberate differences from the build

**Fonts load from Google.** So you can see real Archivo and Source Sans 3 before
the `.woff2` files exist. The actual site self-hosts them and must never call
fonts.googleapis.com — see `../CLAUDE.md` and `../public/fonts/README.md`. If you
find yourself copying those `<link>` tags into the build, stop.

**Links point at local files.** `services.html`, not `/services/`. Otherwise
nothing would be clickable from the file system.

**Page styles are prefixed.** Astro scopes each page's and component's CSS
automatically. Flattened into one stylesheet that scoping is gone, and some
class names genuinely collide — `.practice-card` is defined differently on the
homepage and on `/about` (the about version sits on a sunken section and needs
its own background), and `.phase-grid` is a four-column grid on the homepage but
a two-column one on `/approach`. So every page-level rule in `preview.css` is
prefixed with a body class: `.page-home`, `.page-services`, `.page-approach`,
`.page-about`, `.page-contact`, `.page-legal`, `.page-404`. Component rules are
not prefixed, because they are genuinely shared. No values were changed.

There is also a small fixed "PREVIEW" flag bottom-right, so nobody mistakes a
screenshot of this for the real site.

## What it does show accurately

Every colour, size, space and rule is copied from `../src/styles/tokens.css` and
the component styles. The responsive behaviour is real — drag the window narrow
and the services grid goes 3 to 2 to 1, the motif rescales to 64px bars on an
80px pitch below 768px, the third statistic drops on mobile, and the desktop nav
becomes the full-screen `<details>` menu below 900px. The contact form's submit
is disabled, exactly as it is in the build, because there is no endpoint yet.

The visible `[__]`, `[Sector]`, `[Founder biography]` and `[Registration number]`
placeholders are not preview artefacts. They are in the real build too, on
purpose, until Trevor supplies the facts.

## Rebuilding it

Assembled from fragments by a throwaway script in the session scratchpad. It was
not kept, because keeping a generator for a directory that should be deleted
would be the wrong thing to maintain. If you need to regenerate after a source
change, the honest answer is to install Node and run the real thing instead.
