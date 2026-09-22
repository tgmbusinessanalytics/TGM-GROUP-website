# Fonts — five files to add before launch

`src/styles/fonts.css` expects exactly these five files in this directory:

```
archivo-latin-600.woff2
archivo-latin-700.woff2
source-sans-3-latin-400.woff2
source-sans-3-latin-600.woff2
ibm-plex-mono-latin-600.woff2
```

They are not committed because they had not been produced when the site was
built. Without them the site falls back to Helvetica Neue / Segoe UI and stays
readable — the layout does not break — but it is not on brand and the type
metrics shift slightly. Add them before launch.

## Getting them

The quickest correct route is [google-webfonts-helper](https://gwfh.mranftl.com/fonts):

1. Search for **Archivo**. Select charset **latin** only, styles **600** and
   **700**, and copy the woff2 files out of the download.
2. Repeat for **Source Sans 3**, styles **400** and **600**.
3. Repeat for **IBM Plex Mono**, style **600**.
4. Rename each file to match the list above and drop it in this directory.

All three families are open licensed — Archivo and IBM Plex Mono under the SIL
Open Font License, Source Sans 3 under the SIL OFL as well. Redistribution as
part of a website is permitted. Keep a copy of each licence in this directory.

## If you want them smaller

The `unicode-range` in `fonts.css` already tells the browser to skip the
download entirely for pages with no Latin text, but it does not shrink the
file. To actually subset, use `pyftsubset` from `fonttools`:

```bash
pyftsubset Archivo-Bold.ttf --output-file=archivo-latin-700.woff2 --flavor=woff2 --layout-features=kern,liga --unicodes=U+0000-00FF,U+0131,U+0152-0153,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215
```

A latin subset of each face should land around 15–25 KB. If any file comes out
over 40 KB, something was not subset — check before shipping it.

## After they land

`src/layouts/Base.astro` preloads the two faces that block first paint —
`archivo-latin-700.woff2` and `source-sans-3-latin-400.woff2`. Those preload
tags are already in place and will start working the moment the files exist.
Do not preload the other three: they are used below the fold and preloading
them competes with the two that matter.
