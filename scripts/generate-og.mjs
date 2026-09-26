/* Rasterise public/og-image.svg to public/og.png at exactly 1200x630.
 *
 * Run with `npm run og:generate`.
 *
 * WHY THIS IS NOT A ONE-LINE CONVERSION
 *
 * Facebook, LinkedIn, X and WhatsApp do not render SVG link previews, so the
 * card has to be a PNG. Three things make the naive conversion produce a wrong
 * image *without reporting an error*:
 *
 * 1. Archivo and Source Sans 3 are not installed as system fonts on a machine
 *    that has just checked out this repo. Rasterisers resolve fonts through
 *    the system font database and silently substitute Arial when they miss.
 *
 * 2. resvg loads fonts through fontdb, which reads TTF and OTF but NOT woff2 —
 *    and woff2 is all we ship, because it is the only format worth sending to
 *    a browser. So each font is decompressed back to TTF in memory first.
 *    Nothing extra is written to the repo.
 *
 * 3. The killer. The @fontsource static files are instances cut from variable
 *    fonts, and their internal name tables say "Archivo SemiBold" and
 *    "Source Sans 3 ExtraLight" — NOT "Archivo" and "Source Sans 3". So the
 *    SVG's own font-family names match nothing, the rasteriser falls back to
 *    whichever font it loaded first, and you get a card where the sub-line is
 *    quietly set in the headline face. It looks plausible. It is wrong.
 *
 *    Rather than hard-coding those names, which would break the next time
 *    fontsource re-cuts the files, this reads the real family name out of each
 *    TTF's name table and rewrites the SVG's font-family attributes to match.
 *    og-image.svg keeps the correct CSS families so it still renders properly
 *    in a browser.
 *
 * Then it verifies the fix held: if dropping the body font does not change the
 * output, that font was never being used and the script fails rather than
 * writing a wrong card.
 */

import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';

import { Resvg } from '@resvg/resvg-js';
import { decompress } from 'wawoff2';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svgPath = join(root, 'public', 'og-image.svg');
const outPath = join(root, 'public', 'og.png');

/* Open Graph's expected size, 1.91:1. 1200x630 is the safe intersection of
 * what the platforms crop to. */
const WIDTH = 1200;
const HEIGHT = 630;

/* The two faces og-image.svg uses, and the font-family name each one is
 * written as in the SVG. */
const fonts = [
  { file: 'archivo-latin-700.woff2', declaredAs: 'Archivo', role: 'display' },
  { file: 'source-sans-3-latin-400.woff2', declaredAs: 'Source Sans 3', role: 'body' },
];

/* ---------------------------------------------------------------------------
 * Read the family name (name ID 1) out of a TTF's name table.
 * Windows platform records are UTF-16BE; Macintosh records are single-byte.
 * ------------------------------------------------------------------------ */
function familyName(buf) {
  const numTables = buf.readUInt16BE(4);

  for (let i = 0; i < numTables; i++) {
    const dir = 12 + i * 16;
    if (buf.toString('ascii', dir, dir + 4) !== 'name') continue;

    const table = buf.readUInt32BE(dir + 8);
    const count = buf.readUInt16BE(table + 2);
    const storage = table + buf.readUInt16BE(table + 4);

    for (let j = 0; j < count; j++) {
      const rec = table + 6 + j * 12;
      if (buf.readUInt16BE(rec + 6) !== 1) continue; // name ID 1 = family

      const platform = buf.readUInt16BE(rec);
      const length = buf.readUInt16BE(rec + 8);
      const offset = storage + buf.readUInt16BE(rec + 10);
      const raw = buf.subarray(offset, offset + length);

      // Platform 3 (Windows) and 0 (Unicode) store UTF-16BE. Node decodes
      // UTF-16LE, so swap byte pairs first.
      if (platform === 3 || platform === 0) {
        return Buffer.from(raw).swap16().toString('utf16le');
      }
      return raw.toString('latin1');
    }
  }
  return null;
}

const render = (svgText, fontFiles) =>
  new Resvg(svgText, {
    fitTo: { mode: 'width', value: WIDTH },
    font: {
      fontFiles,
      /* Never fall back to whatever happens to be installed on this machine.
       * A missing glyph should be visible, not quietly replaced by Arial. */
      loadSystemFonts: false,
    },
  }).render();

const tmp = await mkdtemp(join(tmpdir(), 'tgm-og-'));

try {
  let svg = await readFile(svgPath, 'utf8');
  const paths = {};

  for (const { file, declaredAs, role } of fonts) {
    /* decompress() returns a Uint8Array; the name-table reader below needs
       Buffer's readUInt16BE and swap16. */
    const ttf = Buffer.from(await decompress(await readFile(join(root, 'public', 'fonts', file))));
    const ttfPath = join(tmp, file.replace(/\.woff2$/, '.ttf'));
    await writeFile(ttfPath, ttf);
    paths[role] = ttfPath;

    const actual = familyName(ttf);
    if (!actual) {
      console.error(`  ERROR  could not read a family name out of ${file}`);
      process.exitCode = 1;
      continue;
    }

    /* Point the SVG at the name the file actually carries. */
    const before = svg;
    svg = svg.replaceAll(`'${declaredAs}'`, `'${actual}'`).replaceAll(`"${declaredAs},`, `"${actual},`);

    const note = actual === declaredAs ? '' : `  (SVG says "${declaredAs}")`;
    console.log(`  ${role.padEnd(7)} ${file}`);
    console.log(`          family "${actual}"${note}`);

    if (before === svg) {
      console.error(`  ERROR  nothing in og-image.svg referenced "${declaredAs}"`);
      process.exitCode = 1;
    }
  }

  const all = [paths.display, paths.body];
  const png = render(svg, all);
  const buffer = png.asPng();

  /* Verification. If removing the body font changes nothing, it was never
   * being used — which is exactly the silent failure this script exists to
   * prevent. Same for the display font. */
  const hash = (b) => createHash('sha256').update(b).digest('hex');
  const full = hash(buffer);
  const withoutBody = hash(render(svg, [paths.display]).asPng());
  const withoutDisplay = hash(render(svg, [paths.body]).asPng());

  if (full === withoutBody) {
    console.error('\n  ERROR  dropping the body font changed nothing — it is not being applied.');
    process.exitCode = 1;
  }
  if (full === withoutDisplay) {
    console.error('\n  ERROR  dropping the display font changed nothing — it is not being applied.');
    process.exitCode = 1;
  }

  if (png.width !== WIDTH || png.height !== HEIGHT) {
    console.error(
      `\n  ERROR  rendered ${png.width}x${png.height}, expected ${WIDTH}x${HEIGHT}.` +
        `  Check the viewBox in og-image.svg.`
    );
    process.exitCode = 1;
  }

  if (process.exitCode === 1) {
    console.error('\n  og.png NOT written.\n');
  } else {
    await writeFile(outPath, buffer);
    console.log(
      `\n  both faces confirmed in use` +
        `\n  wrote public/og.png — ${png.width}x${png.height}, ${(buffer.length / 1024).toFixed(1)} KB\n`
    );
  }
} finally {
  await rm(tmp, { recursive: true, force: true });
}
