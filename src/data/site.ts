/* Single source of truth for anything that appears in more than one place.

   The `null` values below are open items from CLAUDE.md. They are null rather
   than guessed. Components check for null and render a visible placeholder or
   omit the element — nothing here invents a fact. */

/* SOURCE OF THE STATUTORY DETAILS BELOW

   Every registration fact here is taken from the company's own documents, not
   inferred:

   - CoR15.1A / COR14.3 registration certificate, CIPC, issued 13 August 2025
     (tracking 9441298770): registered name, registration number, registered
     office, postal address, location of records, directors.
   - Information Officer Registration Certificate, Information Regulator,
     issued 14 August 2025: information officer and regulator registration
     number.

   WHAT IS DELIBERATELY NOT HERE. Those documents also contain both directors'
   ID numbers, their residential addresses, dates of birth and personal mobile
   numbers. None of that is on this website. Director names and the registered
   office are public record and are required by ECTA section 43 and PAIA
   section 51; the rest is personal information, and publishing it would be a
   POPIA contravention by the very company whose PAIA manual this is. */

export const site = {
  /* Trading name, used everywhere the brand speaks. */
  name: 'TGM Group',

  /* Registered name. Required verbatim on the PAIA manual and in the ECTA
     disclosure — those are about the legal entity, not the brand. */
  legalName: 'Trevor Goitsemodimo Menyatso Group (Pty) Ltd',
  registrationNumber: '2025/628427/07',
  registrationDate: '13 August 2025',
  companyType: 'Private company',
  financialYearEnd: 'February',

  url: 'https://trevorgmenyatsogroup.co.za',
  tagline: 'South African business transformation and growth partner',

  /* OPEN ITEM 5 in CLAUDE.md is settled: info@ is the single public address.
     The business@ address in the old banners is not used on this site. */
  email: 'info@trevorgmenyatsogroup.co.za',

  phoneDisplay: '081 517 1016',
  phoneHref: 'tel:+27815171016',

  /* Registered office per CIPC. The same address is the company's postal
     address and its recorded location of records. */
  address: {
    street: '260 Surrey Avenue',
    locality: 'Ferndale, Randburg',
    region: 'Gauteng',
    postalCode: '2194',
    country: 'South Africa',
  } as null | {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  },

  /* Registered with the Information Regulator on 13 August 2025, certificate
     issued 14 August 2025. PAIA requires the manual to name this person. The
     contact route given on the site is the company's business email, not his
     personal details. */
  informationOfficer: {
    name: 'Siyabonga Dube',
    appointed: '13 August 2025',
    regulatorRegistrationNumber: '2025-060527',
    regulatorRegistrationDate: '13 August 2025',
  },

  /* Both active directors per CIPC, appointed 13 August 2025. Names only —
     ECTA section 43 requires the names, nothing more. */
  directors: ['Trevor Goitsemodimo Menyatso', 'Siyabonga Dube'],

  /* Company page. The ?viewAsMember=true parameter on the URL as supplied is
     LinkedIn's own preview flag, not part of the address, so it is stripped.

     Feeds two things: the footer link, and sameAs in the Organization schema,
     which is how search engines tie the site and the LinkedIn page to the same
     entity.

     NOT VERIFIED as publicly visible. LinkedIn serves an authwall to anything
     automated, so whether a logged-out visitor can actually see this page has
     to be checked by hand in a private window. If they cannot, set this back
     to null and the footer link disappears again. */
  linkedin: 'https://www.linkedin.com/company/trevorgmenyatsogroup/' as null | string,

  /* OPEN ITEM 6 is now answered, and the answer is no. The CIPC cover letter
     accompanying the registration states it directly: "registering your
     company does not automatically result in a registration of a Trade Mark -
     this is a separate legal process." Nothing in the supplied documents shows
     a trade mark application, so the mark is unregistered and the site must
     not carry a ™. Flip this only against an actual CIPC trade mark
     certificate. */
  trademarkRegistered: false,

  founder: 'Trevor G. Menyatso',
  founderRole: 'Founder and lead consultant',

  /* The second named person on the site. He is also one of the two directors
     and the registered information officer, both recorded above, so /about
     names him three times in three different capacities. That is correct, not
     a duplication. */
  clientRelationships: {
    name: 'Siyabonga Dube',
    /* Sentence case, per the content rules. The brief supplied it as Client
       Relationship Manager. */
    role: 'Client relationship manager',
  },

  areaServed: 'ZA',
} as const;

/* Formspree endpoint for the contact form.

   Not a secret: it is visible in the page source of /contact by design, which
   is how a static form service works. Abuse is handled by the honeypot and
   the time trap in contact.astro, plus Formspree's own server-side validation
   (name, email, company, problem and consent are all required there, so a bot
   posting straight at this URL cannot skip the POPIA consent).

   Notifications go to info@trevorgmenyatsogroup.co.za.

   Formspree stores submissions in the United States. That is a cross-border
   transfer under POPIA section 72 and is disclosed on /privacy and at the
   point of collection on /contact. If this endpoint ever moves to a different
   provider, both of those need updating too. */
export const FORM_ENDPOINT: string = 'https://formspree.io/f/xdekwbyr';

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
/* OPEN ITEM 3 closed. Plural to sit alongside 'Professional services', and
   'centres' because the content rules call for South African English. */
export const sectors = [
  'Education',
  'Professional services',
  'Logistics',
  'Call centres',
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
    source: 'Client, sector and period to be supplied',
  },
  {
    figure: null as null | string,
    unit: 'hrs',
    description: 'of manual reporting removed each month',
    source: 'Client, sector and period to be supplied',
  },
  {
    figure: null as null | string,
    unit: 'x',
    description: 'return on the engagement fee within the first year',
    source: 'Client, sector and period to be supplied',
  },
] as const;
