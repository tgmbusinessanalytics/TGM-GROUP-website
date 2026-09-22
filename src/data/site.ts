/* Single source of truth for anything that appears in more than one place.

   The `null` values below are open items from CLAUDE.md. They are null rather
   than guessed. Components check for null and render a visible placeholder or
   omit the element — nothing here invents a fact. */

export const site = {
  name: 'TGM Group',
  legalName: 'TGM Group',
  url: 'https://trevorgmenyatsogroup.co.za',
  tagline: 'South African business transformation and growth partner',

  /* OPEN ITEM 5 in CLAUDE.md is settled: info@ is the single public address.
     The business@ address in the old banners is not used on this site. */
  email: 'info@trevorgmenyatsogroup.co.za',

  phoneDisplay: '081 517 1016',
  phoneHref: 'tel:+27815171016',

  /* OPEN ITEM 4: physical address. Needed for the LocalBusiness schema and the
     footer. Do not fill this in with a suburb or a PO box that has not been
     confirmed — an incorrect address in structured data is worse than none. */
  address: null as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
  },

  /* Not yet supplied. The footer omits the link entirely while this is null
     rather than pointing at a guessed profile URL. */
  linkedin: null as null | string,

  /* OPEN ITEM 6: only render the ™ once CIPC registration of the mark is
     confirmed. A company registration certificate is not a trade mark. */
  trademarkRegistered: false,

  founder: 'Trevor G. Menyatso',
  founderRole: 'Founder and lead consultant',

  areaServed: 'ZA',
} as const;

/* CLAUDE.md, contact form section. Replace with the real endpoint before
   launch — Formspree form ID, Netlify Forms, or the Cloudflare Worker URL.
   The form markup is complete and correct; only the destination is missing. */
export const FORM_ENDPOINT: string = '';

export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Approach', href: '/approach/' },
  /* Evidence is a homepage section, not a page. Absolute so the link works
     from inner pages too. */
  { label: 'Evidence', href: '/#evidence' },
  { label: 'About', href: '/about/' },
] as const;

export const footerLinks = [
  { label: 'Services', href: '/services/' },
  { label: 'Approach', href: '/approach/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const legalLinks = [
  { label: 'Privacy', href: '/privacy/' },
  { label: 'Terms', href: '/terms/' },
  { label: 'PAIA manual', href: '/paia/' },
] as const;

/* The one CTA. It appears in the header, the hero, the services grid and the
   CTA band, and it is the same action every time. Do not add a second
   conversion path in v1. */
export const cta = {
  label: 'Book a discovery call',
  href: '/contact/',
} as const;

/* Proof strip. Three sectors are real; the fourth is an open item and stays a
   visible placeholder until Trevor names it. */
export const sectors = [
  'Education',
  'Professional services',
  'Logistics',
  null, // OPEN ITEM 3
] as const;

export const practices = [
  {
    name: 'TGM Business Services',
    accent: 'gold' as const,
    description:
      'Consulting, operations and strategic execution. The work of finding the constraint in how an organisation runs, designing the fix, and being there while it is implemented.',
    focus: [
      'Operating model and process design',
      'Business growth and go-to-market',
      'Programme and strategic execution',
      'Leadership and team capability',
    ],
  },
  {
    name: 'TGM Business Analytics',
    accent: 'teal' as const,
    description:
      'Data, reporting, dashboards and AI. The work of making an organisation able to see itself clearly enough to decide, and automating what should never have been manual.',
    focus: [
      'Reporting and dashboard design',
      'Data quality and single source of truth',
      'AI and automation opportunity assessment',
      'Measurement that survives scrutiny',
    ],
  },
] as const;

/* Numbered markers are used here and nowhere else on the site, because this is
   the only content that is genuinely a sequence. */
export const phases = [
  {
    number: '01',
    name: 'Diagnose',
    headline: 'Find the real constraint',
    body: 'We look at how the organisation actually runs, not how the org chart says it does. Interviews, process walkthroughs and whatever data exists. The output is a written diagnosis of what is limiting growth, which is usually not what you were told it was.',
    accent: 'navy' as const,
  },
  {
    number: '02',
    name: 'Design',
    headline: 'Build the target state',
    body: 'A specific description of how the process, the team or the reporting should work instead, costed and sequenced. Concrete enough that someone else could implement it. You can take this and run it yourself.',
    accent: 'navy' as const,
  },
  {
    number: '03',
    name: 'Implement',
    headline: 'Do it with your team',
    body: 'We work alongside the people who will own it afterwards, rather than delivering to them. Slower in week one and considerably faster by week six, because nothing has to be handed over at the end.',
    accent: 'navy' as const,
  },
  {
    number: '04',
    name: 'Embed',
    headline: 'Make it stick',
    body: 'Measurement, documentation and the handful of habits that decide whether a change survives contact with a busy quarter. Most transformation work fails here, which is why it is a phase and not a closing email.',
    accent: 'gold' as const,
  },
] as const;

/* Evidence section. All three figures are placeholders and stay that way until
   Trevor supplies a measured result with a named client and a period. An
   unsourced number on a consulting site is worse than no number. */
export const stats = [
  {
    figure: null as null | string,
    unit: '%',
    description: 'reduction in order-to-delivery cycle time',
    source: 'Client, sector, period — to be supplied',
  },
  {
    figure: null as null | string,
    unit: 'hrs',
    description: 'of manual reporting removed each month',
    source: 'Client, sector, period — to be supplied',
  },
  {
    figure: null as null | string,
    unit: 'x',
    description: 'return on the engagement fee within the first year',
    source: 'Client, sector, period — to be supplied',
  },
] as const;
