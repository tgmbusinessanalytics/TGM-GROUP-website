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
    practice: z.enum(['TGM Business Services', 'TGM Business Analytics']),
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

/* Scaffolding only. Insights is explicitly out of scope for v1: there is no
   /insights route and the sitemap filters the path. The schema is here so the
   section can be switched on later without a restructure. */
const insights = defineCollection({
  loader: glob({ base: './src/content/insights', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    author: z.string().default('Trevor G. Menyatso'),
    draft: z.boolean().default(true),
  }),
});

export const collections = { services, cases, insights };
