export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SnowTEch',
  url: 'https://snowtech.asia',
  logo: 'https://snowtech.asia/snowTech.ico',
  description: 'IT-компания в Казахстане. Разработка сайтов, мобильных приложений, AI-решений и таргетированной рекламы.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KZ',
    addressLocality: 'Казахстан',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Russian', 'English', 'Kazakh'],
  },
  sameAs: [
    'https://www.instagram.com/snowtech',
    'https://www.facebook.com/snowtech',
  ],
});

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SnowTEch',
  url: 'https://snowtech.asia',
  description: 'IT-решения для бизнеса в Казахстане',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://snowtech.asia/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
});

export const generateServiceSchema = (serviceName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description,
  provider: {
    '@type': 'Organization',
    name: 'SnowTEch',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Kazakhstan',
  },
});

export const generateArticleSchema = (
  title: string,
  description: string,
  image: string,
  publishedTime: string,
  modifiedTime?: string,
  author?: string
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image: image.startsWith('http') ? image : `https://snowtech.asia${image}`,
  datePublished: publishedTime,
  dateModified: modifiedTime || publishedTime,
  author: {
    '@type': 'Person',
    name: author || 'SnowTEch',
  },
  publisher: {
    '@type': 'Organization',
    name: 'SnowTEch',
    logo: {
      '@type': 'ImageObject',
      url: 'https://snowtech.asia/snowTech.ico',
    },
  },
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://snowtech.asia${item.url}`,
  })),
});


