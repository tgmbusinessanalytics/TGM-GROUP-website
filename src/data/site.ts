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
  tagline: 'Operational systems and analytics for site-based service contractors',

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
  founderRole: 'Founder and director',

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

/* Where the contact form posts.
 *
 * A PHP file on our own hosting, public/enquiry.php, which Astro copies into
 * the build like any other static file. It replaced Formspree on 28 October
 * 2026, because Formspree required an account, a dashboard and a verified
 * recipient address before it would deliver anything, and until that was done
 * it accepted submissions and dropped them.
 *
 * What this buys, beyond there being nothing to set up:
 *
 *  - Nothing a visitor types leaves our server. Formspree stored submissions
 *    in the United States, which was a cross-border transfer under POPIA
 *    section 72 that had to be disclosed at the point of collection. There is
 *    no transfer now, so that disclosure is gone from /contact and /privacy.
 *  - Delivery is local: the mail goes from the host to a mailbox on the same
 *    domain and never crosses the public internet.
 *  - Every enquiry is written to a log above the web root before the mail is
 *    attempted, so a mail failure cannot lose one.
 *
 * Relative, not absolute, so a local preview posts to the local server. The
 * handler validates name, email, organisation, problem and the POPIA consent
 * again on the server, because a bot posting straight at the URL never ran the
 * browser's checks.
 *
 * Only ever change this together with form-action in public/.htaccess and
 * public/_headers, or the browser will block the submission. */
export const FORM_ENDPOINT: string = '/enquiry.php';

/* Evidence was removed when the stats block went: with zero paying clients
   there was nothing to put in it, and three empty slots on the most persuasive
   part of the page was worse than no section. The nav entry pointed at
   /#evidence, an anchor that no longer exists anywhere, so it is gone too.
   Put it back the day there is a measured result to show. */
export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Approach', href: '/approach/' },
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
/* The one CTA, repeated in the header, hero, services grid and CTA band.

   It sells the paid diagnostic, not a free call. POSITIONING section 5 is
   explicit about why: "the diagnostic is the qualifying gate. Anyone who will
   not pay R12,500 will not pay for a build." A free ninety-minute consultation
   gives away most of the diagnostic's interview time and attracts exactly the
   prospects the gate exists to filter out. */
export const cta = {
  label: 'Book the diagnostic',
  href: '/contact/',
} as const;

/* Published price. POSITIONING is the single source; this restates the
   diagnostic only, which is the one rung a prospect can buy without a
   conversation. Build tiers and the retainer are quoted after the diagnostic,
   so they are described on the site but not priced.

   The figure is quoted bare, with nothing after it. TGM Group is not
   registered for VAT, confirmed on SARS eFiling on 7 November 2026, so
   R12,500 is the whole price and there is nothing to add. This block
   previously carried a vatNote reading "excl. VAT", on the mistaken basis
   that the company was registered. Do not reintroduce any VAT wording unless
   and until a registration actually exists, and then change POSITIONING
   first: that file is the single source for every price. */
export const diagnosticPrice = {
  amount: 'R12,500',
  duration: '3 weeks',
} as const;

/* Who the work is built for. These are the segments TGM sells to, not a list
   of clients. TGM has no clients to name yet, so the homepage strip says
   "Built for", never "Working with". */
export const sectors = [
  'Security',
  'Cleaning',
  'Facilities management',
  'Industrial and specialist contractors',
] as const;

export const practices = [
  {
    name: 'TGM Business Systems',
    accent: 'gold' as const,
    description:
      'Working systems that fix a named operational failure. Registers, trackers and multi-user tools rebuilt on the tools you already run, so the work is captured once and the proof is there when someone asks for it.',
    focus: [
      'Attendance and timesheet capture across sites',
      'Compliance and certificate tracking',
      'Job and project status tracking',
      'Integration between the tools you already run',
    ],
  },
  {
    name: 'TGM Business Analytics',
    accent: 'teal' as const,
    description:
      'Data cleaning, dashboards and automated reporting. The work of making the numbers correct at source, so a report is a by-product rather than a monthly project.',
    focus: [
      'Data cleaning and consolidation',
      'Dashboards on your own tools',
      'Automated monthly client reports',
      'A single source of truth for the data you report on',
    ],
  },
] as const;

/* Numbered markers are used here and nowhere else on the site, because this is
   the only content that is genuinely a sequence. */
export const phases = [
  {
    number: '01',
    name: 'Diagnose',
    headline: 'Name the real failure',
    body: 'Three weeks, fixed fee. We review the files and registers you use now, interview the person who keeps them and the person who uses the reports, and examine the real data. You receive every defect found in your own numbers, and a scoped build specification that is yours to keep.',
    accent: 'navy' as const,
  },
  {
    number: '02',
    name: 'Build',
    headline: 'Fixed scope, fixed price',
    body: 'A working system on your own tools, running on your real data rather than a sample. Scope, price and acceptance criteria are agreed in writing before work begins, and overruns inside the scope are ours.',
    accent: 'navy' as const,
  },
  {
    number: '03',
    name: 'Support',
    headline: 'Keep it working',
    body: 'A monthly retainer after you have accepted the build: up to five hours of fixes, changes and support on the delivered system. Offered only after acceptance, and never bundled into the build price.',
    accent: 'gold' as const,
  },
] as const;
