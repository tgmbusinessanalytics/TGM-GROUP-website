import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* Services drive both the homepage grid (title + summary + accent) and the
   /services page (full body). One file per practice, ordered by `order`. */
const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    /* Accent colour of the 48x5 rule on the card. Gold and teal alternate by
       practice. This is set per service in the design spec's table — do not
       derive it from `practice`, the two do not agree in every row. */
    accent: z.enum(['gold', 'teal']),
    practice: z.enum(['TGM Business Systems', 'TGM Business Analytics']),
    /* Homepage card copy. Kept short on purpose — the cards are 280px tall and
       whitespace is structural. */
    summary: z.string(),
    /* What an engagement in this area typically produces. */
    outcomes: z.array(z.string()).min(2),
  }),
});

/* Empty until Trevor supplies real, cleared case studies. The collection and
   its schema exist so cases can be added without restructuring — but nothing
   is routed and nothing is rendered while it is empty. Do not seed this with
   illustrative examples. */
const cases = defineCollection({
  loader: glob({ base: './src/content/cases', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    sector: z.string(),
    period: z.string(),
    /* The measured result. Required — a case study without one is a story. */
    result: z.string(),
    summary: z.string(),
    /* Written permission to name this client must exist before publishing. */
    clientApproved: z.boolean().default(false),
    publishDate: z.date(),
  }),
});

/* The monthly notes. This is the scaffolding CLAUDE.md told us to build and
   leave switched off, now switched on.

   RENAMED FROM `insights`. The word is the same consulting register the
   content rules already ban alongside "leading", "innovative" and "solutions",
   and it describes the wrong thing: these are notes on building a business in
   public, including the parts that go wrong. There were zero posts, so the
   rename cost nothing.

   `draft` defaults to TRUE on purpose. A post has to be switched on
   deliberately, so a half-written file can sit in the repo for a fortnight
   without any risk of it appearing on the live site. */
const notes = defineCollection({
  loader: glob({ base: './src/content/notes', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    /* Doubles as the meta description and the card copy on the index, so it
       has to stand alone. One or two sentences. */
    description: z.string(),
    publishDate: z.date(),
    /* Set this when a post is materially revised after publication. The index
       and the post itself both show it, because quietly editing a published
       claim is the thing that costs trust. */
    updated: z.date().optional(),
    author: z.string().default('Trevor G. Menyatso'),
    /* The strand a post belongs to. "Building TGM" is the running account of
       the business from zero, failures included; the other two are the
       research pieces. */
    topic: z.enum(['Building TGM', 'Operations', 'Reporting and data']),
    draft: z.boolean().default(true),
  }),
});

export const collections = { services, cases, notes };
