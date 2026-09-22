# TGM Group website — build brief

You are building the TGM Group marketing website. Read this file, `design-spec.md`
and `tokens.css` before writing code. Do not deviate from the design decisions
below without saying why.

## What TGM Group is

A South African business transformation and growth partner. It helps organisations
improve operations, solve business problems, adopt AI and automation, and achieve
measurable growth. Two practices: TGM Business Services (consulting, operations,
strategic execution) and TGM Business Analytics (data, reporting, dashboards, AI).

Founder and lead consultant: Trevor G. Menyatso.
Contact: info@trevorgmenyatsogroup.co.za, 081 517 1016.

## Stack — decided, do not re-litigate

- **Astro 5** with **Tailwind CSS 4**. Static output, no client framework.
- **No CMS** in v1. Content lives in Markdown/MDX under `src/content/`.
- **Deploy to Cloudflare Pages** (or Netlify). Static, so hosting is near-zero cost.
- **Fonts self-hosted**, not loaded from Google. Download Archivo, Source Sans 3
  and IBM Plex Mono as woff2, subset to latin, and `@font-face` them with
  `font-display: swap`. A consulting site in South Africa cannot afford the
  round-trip to fonts.googleapis.com on a mobile connection.
- **No JavaScript** except the mobile menu toggle and, later, the contact form.
  Write the menu with a `<details>` element or ~15 lines of vanilla JS. Do not
  install a component framework to open a menu.

Why not Next.js: this is a five-page content site with no authentication, no
dashboard and no server state. Astro ships less and builds faster. If TGM later
needs a client portal, that is a separate application, not this repo.

## Performance budget — treat as acceptance criteria

- Lighthouse Performance ≥ 95 on mobile.
- Largest Contentful Paint < 2.0s on a simulated Fast 3G connection.
- Total JS shipped to the browser < 10 KB.
- Every image served as AVIF with a WebP fallback, correctly sized, `loading="lazy"`
  below the fold, explicit `width` and `height` to prevent layout shift.

South African mobile networks are the constraint that matters here. Test against
throttled connections, not your laptop.

## Accessibility — non-negotiable

- WCAG 2.1 AA. Text at 4.5:1, or 3:1 at 24px+ and for any border, icon or focus
  ring that carries meaning.
- **Gold `#F0BC20` on white is 1.76:1.** Gold is a shape colour: rules, bars,
  fills, the CTA button background. It is never text on a light ground. When gold
  must read as text, use `--gold-ink` `#7A5C00` (6.25:1). This is the single
  easiest way to wreck this design — do not let it happen.
- Focus ring: 2px solid `--focus-ring` with 2px offset, visible on every
  interactive element. Do not remove outlines.
- Real semantic elements. `<a>` for navigation, `<button>` for actions,
  `<label>` bound to every input. No `role` or click handlers on a `<div>`.
- Touch targets ≥ 44px.
- One `<h1>` per page, heading levels in order.
- `prefers-reduced-motion` respected on anything that moves.

## Content rules

- South African English: organisation, optimise, programme, centre.
- Currency `R1.2m` / `R450 000`. Dates `14 March 2026`.
- Sentence case everywhere except the TGM GROUP wordmark.
- **No invented facts.** Every `[__]`, `[Client]`, `[period]` and `[Sector]` in the
  design is a real placeholder awaiting a number Trevor must supply. Leave them
  visible as placeholders in the build. Do not fill them with plausible-looking
  figures, do not write fake testimonials, do not invent client logos.
- No emoji anywhere.

## Pages in scope for v1

1. `/` — homepage. Designed in full; see `design-spec.md`.
2. `/services` — the five practices, one section each.
3. `/approach` — the four-phase engagement model expanded.
4. `/about` — Trevor, the group, the two practices, registration details.
5. `/contact` — form plus direct details.
6. `/privacy`, `/terms`, `/paia` — required in South Africa; PAIA manual is a
   POPIA obligation. Stub them and flag for legal review.

Insights/blog is explicitly out of scope for v1. Build the content collection
scaffolding so it can be added without restructuring, but ship nothing under it.

## SEO and technical

- One `<title>` and `<meta name="description">` per page, hand-written.
- `Organization` and `LocalBusiness` JSON-LD on the homepage, `BreadcrumbList`
  on inner pages.
- Open Graph and Twitter card images at 1200x630, generated from the brand.
- `sitemap.xml` and `robots.txt`.
- Canonical URLs. Target domain `trevorgmenyatsogroup.co.za`.
- Geographic targeting: South Africa. Include the physical address once it is
  confirmed — ask, do not invent one.

## The contact form

v1: a static form posting to a form service (Formspree, Netlify Forms, or a
Cloudflare Worker). Fields: name, work email, company, one select for "what is
the problem", and a message. Honeypot field plus a time-trap for spam, no CAPTCHA.
POPIA: an explicit consent checkbox with a link to the privacy policy, and a
plain-language statement of what the data is used for and how long it is kept.

## Repo structure

```
src/
  components/   Header, Footer, Hero, ServiceCard, PhaseStep, StatBlock, CtaBand, Button
  layouts/      Base.astro (head, JSON-LD, skip link)
  pages/        index, services, approach, about, contact, legal stubs
  content/      services/*.md, cases/*.md (empty until Trevor supplies real ones)
  styles/       tokens.css (given), global.css
  assets/       fonts/, images/, logo/
public/
```

## Open items — ask Trevor, do not decide these yourself

1. **Vector logo.** There is currently only a raster PNG on opaque white. The
   footer and dark CTA band therefore use the Archivo wordmark as a documented
   fallback. When an SVG and a reversed version exist, swap both and delete
   the fallback.
2. **The `[__]` figures in the evidence section.** This is the most persuasive
   block on the homepage and it is empty. The site is materially weaker until
   these are real.
3. **Sector list** in the proof strip — three are stated, the fourth is `[Sector]`.
4. **Physical address** for LocalBusiness schema and the footer.
5. **Which email** is the public one. The existing banners show both `info@` and
   `business@`; the design uses `info@` only, on purpose.
6. **The ™ on the logo.** Confirm a trade mark is actually registered with CIPC.
   A company registration certificate is not a trade mark registration. If it is
   not filed, remove the symbol before launch.
