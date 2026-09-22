import { site } from '../data/site';

/* Structured data builders.

   Everything here is assembled from src/data/site.ts. Nothing is hard-coded a
   second time, and anything unconfirmed is omitted rather than guessed —
   structured data that contradicts reality is worse for search than structured
   data that is merely incomplete. */

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneHref.replace('tel:', ''),
    description:
      'TGM Group is a South African business transformation partner. We fix the operations, systems and data underneath the strategy, then stay to make sure it holds.',
    founder: {
      '@type': 'Person',
      name: site.founder,
      jobTitle: site.founderRole,
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    /* Two practices, one group. */
    department: [
      { '@type': 'Organization', name: 'TGM Business Services' },
      { '@type': 'Organization', name: 'TGM Business Analytics' },
    ],
    /* sameAs is omitted entirely until a LinkedIn URL is confirmed. */
    ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#localbusiness`,
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phoneHref.replace('tel:', ''),
    priceRange: 'On application',
    areaServed: {
      '@type': 'Country',
      name: 'South Africa',
    },
    /* OPEN ITEM 4. Google will accept a ProfessionalService without a
       postalAddress; it will not forgive a wrong one. Confirm the address,
       set it in src/data/site.ts, and this block appears. */
    ...(site.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: site.address.street,
            addressLocality: site.address.locality,
            addressRegion: site.address.region,
            postalCode: site.address.postalCode,
            addressCountry: 'ZA',
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(trail: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${site.url}/`,
      },
      ...trail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${site.url}${crumb.href}`,
      })),
    ],
  };
}
