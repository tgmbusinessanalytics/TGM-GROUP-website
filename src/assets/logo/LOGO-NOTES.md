The TGM Group mark: a navy wordmark, teal ascending bars and a gold arrow forming the M.

Colours are fixed: navy `#27364A` (`navy-800`), teal `#177E6E` (`teal-600`), gold `#F0BC20` (`gold-500`). Never recolour outside the variants below.

## Vector masters

`vector/` holds the SVG masters. These are the files to use. The PNGs in this folder are kept only for anything that cannot take an SVG.

### Stacked lockup, 1.63:1

The primary mark. Decks, proposals, company profiles, advertising, print.

| File | Use |
|---|---|
| `tgm-logo-primary.svg` | Default, on `surface` and light photography |
| `tgm-logo-reversed.svg` | On `surface-inverse`, navy, teal. White wordmark and bars, gold arrow kept |
| `tgm-logo-navy-gold.svg` | Two-colour, where teal will not survive: small sizes, single-colour print |
| `tgm-logo-navy.svg` | Single colour navy, for embroidery, engraving, fax-grade |
| `tgm-logo-white.svg` | Single colour white, for one-colour reversed print |

### Horizontal lockup, 4.7:1

TG, the mark as the M, then GROUP on the same baseline at 1.2× its stacked size. Built for anything wider than it is tall: website headers and footers, email signatures, letterheads, banner ads, exhibition panels.

`tgm-logo-horizontal.svg` · `tgm-logo-horizontal-reversed.svg` · `tgm-logo-horizontal-navy.svg` · `tgm-logo-horizontal-white.svg`

### Mark alone

`tgm-mark-primary.svg` · `tgm-mark-reversed.svg` · `tgm-mark-white.svg`

The bars and arrow with no wordmark. Social avatars, app icons, watermarks, favicon at 48px and above. **Minimum 48px.** Below that the three bars close up and it reads as a smear. Use the simplified four-bar `favicon.svg` instead at 16–32px.

### Raster fallbacks

`tgm-logo-primary-2048.png`, `tgm-logo-reversed-2048.png`, `tgm-logo-horizontal-2048.png`, `tgm-logo-horizontal-reversed-2048.png`, `tgm-mark-1024.png`, `tgm-mark-reversed-1024.png`, all transparent. For tools that will not take SVG. Prefer the SVG everywhere else.

## Clear space and minimum size

Clear space on every side is at least the height of the `G` in GROUP.

Stacked: minimum width 120px on screen, 30mm in print. Below that the GROUP line closes up.
Horizontal: minimum width 150px on screen, 38mm in print.
Mark alone: minimum 48px.

Never set the mark on a busy photograph. Never stretch, rotate, outline, add a drop shadow, or rebuild the lockup by placing the mark next to typed-out "TGM GROUP". The M in the lockup *is* the mark, and doing so states it twice.

## The trade mark

`tgm-logo-primary-tm.svg` and `tgm-logo-reversed-tm.svg` carry a ™ after GROUP.

The ™ in the original artwork was roughly three pixels wide. It was invisible at every real size, and it traced as noise, so it is not in the standard files. The two `-tm` files carry a redrawn one at 34% of the GROUP cap height, which is legible from about 200px wide.

**Do not publish either file until the trade mark is confirmed filed with CIPC.** Claiming a mark that is not registered is the kind of small inaccuracy that costs credibility in a tender response.

## Provenance

The vectors were traced from `2026-08-30_TGM-BRAND_TGM_LOGO_v01.png` at 6× and cleaned per colour layer, then normalised to a 1000-unit viewBox. Registration against the source was checked at 55% overlay with no visible drift. The letterforms are the original artwork's, not a substitute typeface.

Two things the trace inherits and a redraw would not: the source was a raster export, so the straight edges are potrace's reconstruction rather than mathematically true, and the counters of the G carry a fraction of a unit of softness. Neither is visible above 100px. If the mark ever goes to large-format signage or embroidery digitising, redraw it from these vectors as true geometry first.
