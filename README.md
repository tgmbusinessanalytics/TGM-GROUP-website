# TGM Group website

Astro 5, Tailwind CSS 4, static output. Five content pages plus three legal
pages, no CMS, no client framework.

`CLAUDE.md` is the build brief and `design-spec.md` is the written version of
the homepage design. Read both before changing anything — most of what looks
like an omission in this repo is a deliberate decision recorded in one of them.

## Running it

Node 18.20+, 20.3+ or 22+ is required. Built and verified against Node 24.19.0
with npm 11.17.0.

```bash
npm install
npm run dev
```

Then `npm run build` writes static output to `dist/`, and `npm run preview`
serves that build locally. `npm run check` type-checks the Astro and TypeScript
files.

## Deploying

Cloudflare Pages (or Netlify). Build command `npm run build`, output directory
`dist`. `public/_headers` carries the CSP, HSTS and cache rules and is read by
both platforms. Set the custom domain to `trevorgmenyatsogroup.co.za` — it is
hard-coded as `site` in `astro.config.mjs`, which is what canonical URLs, the
sitemap and the Open Graph tags are built from.

## How it is put together

```
src/
  components/   Header, Footer, Logo, Motif, Button, ServiceCard,
                PhaseStep, StatBlock, CtaBand, PageHero, ReviewNotice
  content/      services/*.md (5), cases/ (empty), insights/ (empty)
  data/site.ts  Contact details, nav, phases, stats, practices — one source
                of truth for everything that appears twice
  layouts/      Base.astro — head, meta, JSON-LD, skip link
  lib/schema.ts Organization, LocalBusiness and BreadcrumbList builders
  pages/        index, services, approach, about, contact,
                privacy, terms, paia, 404
  styles/       tokens.css (given — do not edit), fonts.css, global.css
public/         robots.txt, favicon.svg, og-image.svg, _headers, fonts/
preview/        Static mirror of all nine pages, openable without Node.
                NOT the site and NOT deployable — see preview/README.md.
                Delete it once `npm run dev` works.
```

Colour, type and spacing come from `src/styles/tokens.css`, which is the design
system's output and should not be edited here. `global.css` exposes those tokens
to Tailwind through `@theme inline` and owns the type scale, the buttons and a
few repeating shapes. Nothing in the repo defines a colour that is not a token.

### The rule that breaks this design

Gold `#F0BC20` on white is 1.76:1. Gold is a **shape** colour — rules, bars,
fills, button backgrounds. When gold has to read as words, the token is
`--gold-ink` `#7A5C00` (6.25:1). This is the single easiest way to wreck the
design; there is a comment at every point in the code where the choice comes up.

### JavaScript

Two scripts ship, totalling well under 1 KB:

- **The mobile menu has none.** It is a `<details>` element, which is focusable,
  keyboard-operable and announces its own expanded state.
- **The contact form has one**, about fifteen lines: it stamps how long the form
  was on screen and rejects submissions made in under three seconds. It degrades
  to a normal form submit with JavaScript off.

## Before this can launch

These are blockers, not polish. Each one is marked in the code at the point it
bites.

1. **Fonts.** Five `.woff2` files are missing — see `public/fonts/README.md`.
   The site falls back to Segoe UI / Helvetica and stays usable without them,
   but it is not on brand.
2. **Contact form endpoint.** `FORM_ENDPOINT` in `src/data/site.ts` is empty, so
   the submit button renders disabled and the page tells the visitor to email or
   call instead. Set it and the form goes live.
3. **The three `[__]` figures** in the evidence section. This is the most
   persuasive block on the homepage and it is currently empty. Each needs a
   number, a named client, a sector and a period.
4. **The founder biography** on `/about`. Currently a visible placeholder. On a
   consulting site this is probably worth more than the statistics.
5. **Registration number, VAT number and physical address.** Needed on `/about`,
   in the ECTA disclosure on `/terms`, in the PAIA manual, and for the
   `LocalBusiness` schema. Set `address` in `src/data/site.ts`.
6. **Legal review** of `/privacy`, `/terms` and `/paia`. All three carry a
   visible "draft — awaiting legal review" banner. The PAIA manual is a
   statutory obligation under POPIA and is not compliant as it stands.
7. **The fourth sector** in the proof strip.
8. **`public/og.png`.** Export `public/og-image.svg` to PNG at 1200x630.
9. **LinkedIn URL.** Set `linkedin` in `src/data/site.ts` and the footer link
   appears.
10. **The ™ on the logo.** `trademarkRegistered` is `false`. Confirm the mark is
    actually filed with CIPC — a company registration certificate is not a trade
    mark registration.
11. **Vector logo.** Header and footer both use the Archivo wordmark documented
    as the fallback in `src/assets/logo/LOGO-NOTES.md`. See the comment at the
    top of `src/components/Logo.astro` for why, and for the one-line change that
    swaps it when an SVG master and a reversed version exist.

## Performance budget

Treat as acceptance criteria, per the brief:

- Lighthouse Performance ≥ 95 on mobile
- LCP under 2.0s on simulated Fast 3G
- Under 10 KB of JavaScript
- Images as AVIF with a WebP fallback, sized, lazy below the fold, with explicit
  dimensions

There are currently no raster images on the site at all, which is the cheapest
way to meet the last one. If photography is added later, use Astro's `<Image>`
component so the formats and dimensions are handled at build time. Test against
throttled connections — South African mobile networks are the constraint that
matters.

### Measured at the first build

- **308 bytes** of executable JavaScript across the whole site, inlined on
  `/contact` only. Budget was 10 KB. The mobile menu ships none at all.
- Two CSS files, 20.5 KB and 7.5 KB uncompressed, linked rather than inlined so
  they cache across pages. Both compress hard — `.htaccess` enables Brotli and
  gzip.
- Nine pages, 18–24 KB of HTML each, uncompressed.
- Verified in the browser at 1440 and 375: motif geometry exact to the spec
  (84px bars at 180/268/356/460 with gridlines at 92/214/336, rescaling to 64px
  bars at 137/204/271/350 on mobile), grids collapsing 3→1, the third statistic
  dropping on mobile, no horizontal overflow at 375px, and the `<details>` menu
  opening full-screen with 56px tap targets.

Lighthouse has **not** been run — that needs the site on a real host.

## Things that are deliberate

No hero photograph. No carousel, testimonial slider, animated counter or
"trusted by" logo marquee. One CTA — "Book a discovery call" — repeated in four
places and never joined by a second. Numbered markers only in the approach
section. Whitespace is structural: the sections are tall and the copy is short,
and both should stay that way.
