# TGM Group homepage — section spec

The visual design is the "TGM Group — Website Design" artifact: desktop 1440 and
mobile 390, both full-length. This file is the written version, so the build does
not depend on reading pixels.

Order on the page, top to bottom. Desktop heights are the designed heights; in the
build let content determine height and use the padding tokens.

---

## 1. Header — 96px desktop / 72px mobile

Logo left at 150x56 (mobile 112x42). Nav right: Services, Approach, Evidence,
About — `--text-nav`, weight 600, `--ink`. Then a navy button, "Book a discovery
call", `--radius-sm`.

1px `--hairline` bottom border. Sticky on scroll with a solid `--surface`
background — no blur, no transparency, no shrink-on-scroll animation.

Mobile: logo plus a 44x44 menu button with an inline stroke SVG, opening a
full-screen panel. Not a slide-in drawer.

## 2. Hero — 700px desktop

Two columns, text left (flexible), motif right (420px fixed).

- 72x6 `--gold` rule above the headline.
- H1 `--text-hero`, `--ink`, max-width 740px:
  **"Build the structure your growth is standing on"**
- Lead `--text-lead`, `--ink-muted`, max-width 620px:
  "TGM Group is a South African business transformation partner. We fix the
  operations, systems and data underneath the strategy — then stay to make sure
  it holds."
- Two buttons: gold "Book a discovery call" (primary), outlined
  "See how we work" (`--border-strong`, transparent).

**The motif** is the brand's own mark abstracted: four ascending bars —
`--navy` 84x180, `--teal` 84x268, `--teal` 84x356, `--gold` 84x460 — on a 108px
pitch, cut by three 2px `--surface` horizontal rules at 92px, 214px and 336px
from the bottom. Those rules read as chart gridlines through data. This is the
one decorative element on the site and it recurs at smaller scale on mobile.

Mobile: single column, motif below the buttons at half scale, bars 64px wide on
an 80px pitch.

## 3. Proof strip — 148px

`--surface-sunken`. Left: "Working with organisations across" in
`--text-nav`/`--ink-muted`. Right: four sector words in `--font-display` 600,
19px, `--navy`. Currently Education, Professional services, Logistics, `[Sector]`.

Replace with real client logos once there is permission to use them. Until then
sector words are the honest version — do not substitute generic logo placeholders.

## 4. Statement — 520px, `--surface-deep`

Two columns. Left: H2 `--text-h2-dark`, `--ink-inverse`, max-width 620px:
**"You do not have a growth problem. You have an operations problem."**

Right: gold rule, then two paragraphs at `--text-lead` in
`--ink-inverse-muted`.

This is the section that does the persuading. It stays dark, it stays short, and
nothing else gets added to it.

## 5. Services — `#services`

Header row: teal rule, H2 "What we do", and an intro paragraph right-aligned at
max-width 460px.

Six cells in a 3-column grid, 24px gap, `--surface-sunken`, `--radius-md`,
40px padding, min-height 280px. Each: a 48x5 accent rule, H3 `--text-h3`, body
`--text-body-sm` in `--ink-muted`.

| Cell | Accent |
|---|---|
| Business growth | `--gold` |
| Operational excellence | `--gold` |
| AI & automation | `--teal` |
| Strategic execution | `--teal` |
| Leadership & capability | `--gold` |
| "Not sure which one you need?" | `--navy` background, white text, gold button |

The sixth cell is a CTA in the grid rather than a seventh service. Gold and teal
alternate by practice: gold cells belong to Business Services, teal to Business
Analytics.

Mobile: single column, cards stacked, 28px padding.

## 6. Approach — `#approach`, `--surface-sunken`

Gold rule, H2 "How an engagement runs", intro "Four phases, in order. You can
stop after any one of them."

Four columns, 32px gap. Each has a 3px `--navy` top border (the fourth is
`--gold`), then:

- Phase label in `--font-data` 600, `--text-mono`, `--gold-ink` — "01 — Diagnose"
- H3 24px
- Body `--text-body-sm`, `--ink-muted`

Phases: 01 Diagnose / Find the real constraint · 02 Design / Build the target
state · 03 Implement / Do it with your team · 04 Embed / Make it stick.

Numbered markers are used **here and nowhere else on the site**, because this is
the only content that is genuinely a sequence. Do not add 01/02/03 to the
services grid.

## 7. Evidence — `#evidence`

Left column (max 420px): teal rule, H2 "Evidence, not adjectives", body, and a
text link "Read the case studies →" in `--teal-ink`.

Right: three stat blocks in a 3-column grid. Each is a 56x5 gold rule, the figure
in `--font-display` 700 at `--text-bignum` with its unit at 32px in `--ink-muted`,
a description at 18px, and a source line at `--text-caption` in `--ink-muted`.

**All three figures are `[__]` placeholders.** They stay placeholders until Trevor
supplies measured results with a named client and period. An unsourced number on
a consulting site is worse than no number.

Mobile: two stat blocks, stacked. Drop the third.

## 8. Practices — `#about`

H2 "Two practices, one group". Two cards, 1px `--hairline` border with a 5px
coloured top border — gold for TGM Business Services, teal for TGM Business
Analytics — `--radius-md`, 40px padding.

This is the only place a coloured top border is used. It is carrying real
information (which practice), not decoration.

## 9. CTA band — `#contact`, 380px, `--surface-inverse`

H2 `--ink-inverse` max-width 720px: "Ninety minutes. A straight answer about what
is actually holding you back." Sub: "No charge, no deck, no obligation to engage
us afterwards." Gold button right, 22px/44px padding.

## 10. Footer — `--surface-deep`

TGM GROUP wordmark in `--font-display` 700, 22px, +0.03em tracking, white — this
is the logo fallback, replace with the reversed SVG when it exists.

Three groups: description (max 320px), Company links, Contact. Contact carries
**one** email — `info@trevorgmenyatsogroup.co.za` — the phone number, and
LinkedIn. `--hairline-dark` rule above the bottom row: copyright left, Privacy /
Terms / PAIA manual right.

---

## Things that are deliberate

**No hero photograph.** There is no client or team photography yet, and a stock
image of a boardroom would undo everything the rest of the page is doing. The
geometric motif is the substitute and it is on brand. Add real photography when
it exists; do not add stock.

**One CTA, repeated.** "Book a discovery call" appears in the header, hero,
services grid and CTA band. It is the same action every time. Do not introduce a
second conversion path in v1.

**Whitespace is structural.** Sections are tall and copy is short. Resist the urge
to fill.

**No carousel, no testimonial slider, no animated counter, no "trusted by"
logo marquee.** These are the tells of a templated consulting site.
