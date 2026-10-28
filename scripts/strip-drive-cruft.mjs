/* Move Google Drive's desktop.ini files out of public/ before a build.
 *
 * This repository lives inside a Google Drive folder. Drive writes a
 * desktop.ini into every folder it syncs, and recreates them after they are
 * removed, so this is not a one-off cleanup.
 *
 * Astro copies everything in public/ into dist/ verbatim. Drive marks these
 * files hidden and system, and Node cannot copy them: copyFileSync fails with
 * ENOENT even though the file reads fine. That aborts the public/ copy and
 * takes the build down, and because the failure happens inside libuv the
 * process can still exit 0, so it presents as a slow or silent build rather
 * than an error. They would also be served from the live site if they ever
 * did make it through.
 *
 * They are moved rather than deleted, into the system temp directory, so
 * nothing is destroyed. Drive will write fresh ones into public/ regardless.
 */

import { readdir, rename, mkdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const PUBLIC_DIR = join(ROOT, 'public');

/* Inside the repository, not the system temp directory. The project sits on
   G: and temp is on C:, and rename cannot cross devices: it fails with EXDEV.
   Staying on the same volume keeps this a move rather than a copy and delete,
   so nothing is ever destroyed. Git ignores the folder. */
const QUARANTINE = join(ROOT, '.drive-cruft');

async function walk(dir) {
  const found = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await walk(full)));
    else if (entry.name.toLowerCase() === 'desktop.ini') found.push(full);
  }
  return found;
}

const files = await walk(PUBLIC_DIR);

for (const file of files) {
  const target = join(QUARANTINE, relative(PUBLIC_DIR, file));
  await mkdir(join(target, '..'), { recursive: true });
  // A desktop.ini from an earlier build may already be sitting there. They are
  // interchangeable Drive-generated stubs, so overwriting is fine.
  await rename(file, target);
}

if (files.length > 0) {
  console.log(
    `[TGM] Moved ${files.length} Drive desktop.ini file(s) out of public/ into ${QUARANTINE}`
  );
}
