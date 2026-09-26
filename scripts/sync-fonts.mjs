/* Copy the five webfonts this site uses out of node_modules into public/fonts/.
 *
 * Run with `npm run fonts:sync`.
 *
 * WHY THIS EXISTS
 * The brief rules out loading fonts from fonts.googleapis.com: a consulting
 * site on a South African mobile connection cannot afford the extra DNS
 * lookup, TLS handshake and round trip before text can paint. So the files
 * are self-hosted and committed.
 *
 * They come from the @fontsource packages rather than being scraped from
 * Google's CSS API, because those packages are versioned, carry their
 * licences, and are already subset by unicode-range — the `latin` slice is
 * exactly what the site needs.
 *
 * All three families are SIL Open Font License 1.1. Redistribution as part of
 * a website is permitted. The licences are copied alongside the fonts.
 *
 * The output filenames must match the @font-face rules in
 * src/styles/fonts.css. If you change one, change the other.
 */

import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const modules = join(root, 'node_modules', '@fontsource');
const out = join(root, 'public', 'fonts');

/* [package, source file, destination name]
 *
 * Only the five weights the design actually uses. Do not add more "just in
 * case" — each one is a separate download on a metered connection. */
const fonts = [
  ['archivo', 'archivo-latin-600-normal.woff2', 'archivo-latin-600.woff2'],
  ['archivo', 'archivo-latin-700-normal.woff2', 'archivo-latin-700.woff2'],
  ['source-sans-3', 'source-sans-3-latin-400-normal.woff2', 'source-sans-3-latin-400.woff2'],
  ['source-sans-3', 'source-sans-3-latin-600-normal.woff2', 'source-sans-3-latin-600.woff2'],
  ['ibm-plex-mono', 'ibm-plex-mono-latin-600-normal.woff2', 'ibm-plex-mono-latin-600.woff2'],
];

const licences = [
  ['archivo', 'LICENSE', 'LICENSE-Archivo.txt'],
  ['source-sans-3', 'LICENSE', 'LICENSE-SourceSans3.txt'],
  ['ibm-plex-mono', 'LICENSE', 'LICENSE-IBMPlexMono.txt'],
];

/* A latin subset of any of these should land well under 40 KB. Anything
 * bigger means an unsubset file slipped through and should not ship. */
const MAX_BYTES = 40 * 1024;

await mkdir(out, { recursive: true });

let total = 0;
let failed = false;

for (const [pkg, src, dest] of fonts) {
  const from = join(modules, pkg, 'files', src);

  try {
    await copyFile(from, join(out, dest));
  } catch {
    console.error(`  MISSING  ${pkg}/files/${src}`);
    console.error('           Run `npm install` first.');
    failed = true;
    continue;
  }

  const { size } = await stat(join(out, dest));
  total += size;

  const kb = (size / 1024).toFixed(1);
  if (size > MAX_BYTES) {
    console.error(`  TOO BIG  ${dest} — ${kb} KB, expected under 40 KB`);
    failed = true;
  } else {
    console.log(`  ok       ${dest}  ${kb} KB`);
  }
}

for (const [pkg, src, dest] of licences) {
  try {
    await copyFile(join(modules, pkg, src), join(out, dest));
    console.log(`  ok       ${dest}`);
  } catch {
    console.error(`  MISSING  ${pkg}/${src}`);
    failed = true;
  }
}

console.log(`\n  ${fonts.length} fonts, ${(total / 1024).toFixed(1)} KB total`);

/* Sanity check: every @font-face url() in fonts.css must now resolve. */
const css = join(root, 'src', 'styles', 'fonts.css');
const { readFile } = await import('node:fs/promises');
const declared = [...(await readFile(css, 'utf8')).matchAll(/url\("\/fonts\/([^"]+)"\)/g)].map((m) => m[1]);
const present = new Set(await readdir(out));

for (const file of declared) {
  if (!present.has(file)) {
    console.error(`  UNRESOLVED  fonts.css references /fonts/${file}, which is not here`);
    failed = true;
  }
}

if (failed) {
  process.exitCode = 1;
} else {
  console.log('  every @font-face in fonts.css resolves\n');
}
