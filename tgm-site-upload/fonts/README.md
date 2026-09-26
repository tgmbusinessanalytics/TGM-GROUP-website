# Fonts — self-hosted, committed, done

The five `.woff2` files here are the webfonts the site uses. They are committed
deliberately: the brief rules out loading from fonts.googleapis.com, because a
consulting site on a South African mobile connection cannot afford the extra
DNS lookup, TLS handshake and round trip before text can paint.

| File | Weight | Size |
|---|---|---|
| `archivo-latin-600.woff2` | Archivo 600 | 13.5 KB |
| `archivo-latin-700.woff2` | Archivo 700 | 14.2 KB |
| `source-sans-3-latin-400.woff2` | Source Sans 3 400 | 15.3 KB |
| `source-sans-3-latin-600.woff2` | Source Sans 3 600 | 15.3 KB |
| `ibm-plex-mono-latin-600.woff2` | IBM Plex Mono 600 | 15.3 KB |

73.5 KB for all five, but no visitor downloads all five on first paint. Only
`archivo-latin-700` and `source-sans-3-latin-400` are preloaded in
`src/layouts/Base.astro` — about 30 KB — because those are the two faces that
block first paint. The other three load as the page needs them. The
`unicode-range` on each `@font-face` means a browser skips the download
entirely for content outside the latin range.

`.htaccess` caches them `immutable` for a year.

## Where they came from

The `@fontsource` npm packages, not scraped from Google's CSS API — those
packages are versioned, carry their licences, and ship files already subset by
`unicode-range`, so the `latin` slice is exactly what is needed.

To re-copy them after a fresh `npm install`:

```bash
npm run fonts:sync
```

That runs `scripts/sync-fonts.mjs`, which copies the five files and the three
licences out of `node_modules/@fontsource`, checks none exceeds 40 KB, and
verifies every `url()` in `src/styles/fonts.css` resolves. It exits non-zero if
anything is wrong, so it is safe to put in CI.

The `@fontsource/*` packages are `devDependencies`. They are not shipped — they
only exist so this is reproducible.

## Licensing

All three families are under the **SIL Open Font License 1.1**, which permits
redistribution as part of a website. The full licences are alongside the fonts:

- `LICENSE-Archivo.txt`
- `LICENSE-SourceSans3.txt`
- `LICENSE-IBMPlexMono.txt`

Keep them here. The OFL requires the copyright notice and licence to travel
with the font files.

## If you add a weight

Add it in three places or it will not work: the `@font-face` block in
`src/styles/fonts.css`, the `fonts` array in `scripts/sync-fonts.mjs`, and then
re-run `npm run fonts:sync`. Do not add weights speculatively — each one is a
separate download on a metered connection, and the design uses exactly these
five.
