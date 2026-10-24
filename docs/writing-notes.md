# Notes: writing one, and getting it online

One note a month, mid-month. Research it, write it, publish it, share the link.
This file is the whole routine.

The section lives at `/notes/`. It does not appear in the site's navigation
until at least one note is published, so nobody can click through to an empty
page before the first one is ready.

---

## 1. Write the file

One Markdown file per note, in `src/content/notes/`.

**The filename becomes the URL.** `attendance-is-a-capture-problem.md` becomes
`trevorgmenyatsogroup.co.za/notes/attendance-is-a-capture-problem/`. Use
lowercase words separated by hyphens, keep it short, and do not put the date in
it. A URL is permanent; changing it later breaks every link anyone shared.

Copy this to start:

```markdown
---
title: What three weeks of looking at one contractor's files actually found
description: One or two sentences. This is the meta description, the card on the
  index, and the text that appears when the link is shared. It has to stand on
  its own.
publishDate: 2026-11-14
topic: Building TGM
draft: true
---

Open with the thing that happened, not with context. The reader decides in two
sentences whether this is about them.

## A heading if the note is long enough to need one

Short paragraphs. Specific numbers where you have them, and nothing where you
do not. South African English: organisation, optimise, programme, centre.

No em dashes anywhere, in this or any other TGM copy.
```

### The frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Sentence case. |
| `description` | yes | One or two sentences, standing alone. |
| `publishDate` | yes | `YYYY-MM-DD`. Shown on the site as "14 November 2026". |
| `topic` | yes | Exactly one of `Building TGM`, `Operations`, `Reporting and data`. |
| `draft` | yes while writing | `true` keeps it off the site entirely. |
| `updated` | no | Add `YYYY-MM-DD` if you materially change a note after it is live. |
| `author` | no | Defaults to Trevor G. Menyatso. Set it for anything Siyabonga writes. |

**`draft: true` is the default.** A note is invisible until you set it to
`false`. No page is generated for a draft, so an unfinished file is safe to keep
in the folder for as long as you like.

**If you change a published note in a way that changes its meaning, set
`updated`.** Both the index and the note show it. Quietly editing a claim you
have already published is the thing that costs trust, and this section is
supposed to be the honest one.

---

## 2. The three topics

`Building TGM` is the running account of this business from zero. What was
tried, what it cost, what did not work and what happened next. This is the
strand that makes the section worth following, and it is the one that is hardest
to write honestly, because it means publishing the months where nothing sold.

`Operations` and `Reporting and data` are the research pieces: how contractors
actually run attendance, compliance, job status and client reporting, and what
goes wrong.

A note that names a real client, a real number or a real failure is worth ten
that do not. The same rule as the rest of the site applies here: no invented
figures, and no client named without their written agreement.

---

## 3. Publish it

From `07_DESIGN/02_Website`:

```bash
npm run build
```

Check it before it goes anywhere. Serve the build locally:

```bash
npm run preview
```

Then open `http://localhost:4321/notes/` and read the note as a stranger would.

### Package it

```bash
cd dist && tar -czf ../tgm-site.tar.gz . && cd ..
```

`tar.gz` rather than a zip, deliberately. A zip built on Windows carries no
Unix permission bits, and the host has extracted those at `0700` before, which
returns 403 on every URL. A tar.gz stores the modes, so files arrive at 644 and
directories at 755 and the site works without a chmod step.

### Upload it

1. Log in fresh at `cp78.domains.co.za:2083`. Do not enter cPanel from a saved
   link: those carry a dead session token and fail with a 401.
2. File Manager, then `public_html`.
3. Settings, top right, and tick **Show Hidden Files** so you can see
   `.htaccess`.
4. Upload `tgm-site.tar.gz`, then right-click it and **Extract** into
   `/public_html`.
5. Delete the archive afterwards. While it sits there it is downloadable by
   anyone at `/tgm-site.tar.gz`.
6. Hard refresh with Ctrl+F5.

If the session drops mid-upload, that is the IP rotation problem: the
connection presents different addresses on different connections and cPanel
ties a session to one. A VPN gives a stable address and fixes it. FTP avoids
cPanel sessions entirely.

### Commit it

```bash
git add -A && git commit -m "Note: <title>" && git push origin main
```

---

## 4. Share it

The URL is `trevorgmenyatsogroup.co.za/notes/<filename>/`.

There is also a feed at `/notes/rss.xml`, which is how anyone can follow the
section without depending on a social platform deciding to show it to them.

When posting the link anywhere, the headline, description and preview image come
from the note's own `title` and `description`, so those two fields are doing the
work of the social post as well as the page.

---

## 5. The monthly cadence

Mid-month, when the diary is quietest:

1. Pick the thing that actually happened or the question you actually hit.
2. Research it. Sources, not recollection.
3. Write it with `draft: true`.
4. Leave it a day. Read it again as a contractor who has never heard of TGM.
5. Set `draft: false`, build, check locally, upload, commit, share.

One note a month that is true and specific beats four that are filler. If a
month produces nothing worth publishing, publish nothing. An empty month is
better than a note that reads like content.
