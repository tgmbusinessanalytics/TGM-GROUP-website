import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../../data/site';

/* RSS feed for the notes.
 *
 * Written by hand rather than with @astrojs/rss. The whole feed is forty lines
 * of string building, and a monthly blog on a static site does not justify
 * another dependency in a project whose stated budget is "ships almost
 * nothing". Nothing here needs maintaining unless the schema changes.
 *
 * A feed matters for this section specifically: the point of the notes is
 * people following the business over months, and a feed is the one way to
 * follow something that does not depend on an algorithm deciding to show it.
 */

/* Escape the five characters that are not legal as raw text in XML. Titles and
   descriptions are author-written, so an ampersand in "attendance & payroll"
   would otherwise produce a feed that no reader can parse. */
const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const GET: APIRoute = async () => {
  const notes = (await getCollection('notes', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  const items = notes
    .map((note) => {
      const url = `${site.url}/notes/${note.id}/`;
      return `    <item>
      <title>${esc(note.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(note.data.description)}</description>
      <category>${esc(note.data.topic)}</category>
      <dc:creator>${esc(note.data.author)}</dc:creator>
      <pubDate>${note.data.publishDate.toUTCString()}</pubDate>
    </item>`;
    })
    .join('\n');

  /* lastBuildDate uses the newest note rather than the build time, so
     rebuilding the site for an unrelated change does not tell every reader
     there is something new. Before the first note exists there is nothing to
     date from, and the build time is the one honest answer: the epoch would
     otherwise publish a feed stamped 1970. */
  const lastBuild = notes[0]?.data.publishDate ?? new Date();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>TGM Group: Notes</title>
    <link>${site.url}/notes/</link>
    <atom:link href="${site.url}/notes/rss.xml" rel="self" type="application/rss+xml" />
    <description>Notes on building TGM Group from zero, and on how site-based contractors actually run their operations and reporting.</description>
    <language>en-ZA</language>
    <lastBuildDate>${lastBuild.toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' },
  });
};
