const BASE_URL = 'https://snowtech.asia';

/**
 * LocalBusiness / ProfessionalService schema.
 * This is the most important schema for local SEO in Google — it enables
 * rich results with business info, rating, hours, area served and gets the
 * site eligible for the "local pack" and knowledge panel.
 */
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'ProfessionalService', 'LocalBusiness'],
  '@id': `${BASE_URL}/#organization`,
  name: 'SnowTech',
  alternateName: ['SnowTEch', 'Сноутех', 'СноуТех'],
  url: BASE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${BASE_URL}/og-image.png`,
  description:
    'IT-компания SnowTech в Казахстане. Разработка сайтов под ключ, мобильные приложения, AI-боты, ML-решения и таргетированная реклама в Instagram и TikTok.',
  slogan: 'Digital products that drive business',
  priceRange: '₸₸',
  foundingDate: '2023',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KZ',
    addressRegion: 'Astana',
    addressLocality: 'Astana',
    streetAddress: 'Astana, Kazakhstan',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.1694,
    longitude: 71.4491,
  },
  areaServed: [
    { '@type': 'Country', name: 'Kazakhstan' },
    { '@type': 'City', name: 'Astana' },
    { '@type': 'City', name: 'Almaty' },
    { '@type': 'City', name: 'Shymkent' },
    { '@type': 'City', name: 'Karaganda' },
  ],
  telephone: '+7-706-700-70-52',
  email: 'Weking128@icloud.com',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+7-706-700-70-52',
      contactType: 'customer service',
      availableLanguage: ['Russian', 'English', 'Kazakh'],
      areaServed: 'KZ',
    },
    {
      '@type': 'ContactPoint',
      telephone: '+7-706-700-70-52',
      contactType: 'sales',
      availableLanguage: ['Russian', 'English', 'Kazakh'],
      areaServed: 'KZ',
    },
  ],
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
  ],
  sameAs: [
    'https://www.instagram.com/snowtech',
    'https://t.me/snowtech',
    'https://wa.me/77067007052',
  ],
  knowsAbout: [
    'Web development',
    'Mobile app development',
    'AI chatbots',
    'Machine learning',
    'Computer vision',
    'RAG chatbots',
    'Targeted advertising',
    'Instagram ads',
    'TikTok ads',
  ],
});

export const generateWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  name: 'SnowTech',
  alternateName: 'SnowTEch',
  url: BASE_URL,
  description: 'IT-решения для бизнеса в Казахстане — сайты, AI-боты, ML-решения, таргет.',
  inLanguage: ['ru', 'en', 'kk'],
  publisher: { '@id': `${BASE_URL}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const generateServiceSchema = (serviceName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description,
  provider: { '@id': `${BASE_URL}/#organization` },
  areaServed: {
    '@type': 'Country',
    name: 'Kazakhstan',
  },
});

export const generateOfferCatalogSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'OfferCatalog',
  name: 'Услуги SnowTech',
  itemListElement: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Разработка сайтов',
        description:
          'Лендинги, корпоративные сайты, интернет-магазины, веб-платформы под ключ',
      },
      priceCurrency: 'KZT',
      price: '30000',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'KZT',
        price: '30000',
        minPrice: '30000',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Мобильные приложения',
        description: 'iOS и Android приложения, React Native, Flutter',
      },
      priceCurrency: 'KZT',
      price: '1000000',
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Таргетированная реклама',
        description: 'Instagram Ads, TikTok Ads, настройка и ведение',
      },
      priceCurrency: 'KZT',
      price: '100000',
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'AI чат-боты',
        description: 'Боты для WhatsApp, Telegram, веб-сайтов',
      },
      priceCurrency: 'KZT',
      price: '60000',
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'RAG чат-боты',
        description: 'AI-боты с базой знаний на GPT / Claude',
      },
      priceCurrency: 'KZT',
      price: '70000',
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Machine Learning',
        description: 'ML-модели, предиктивная аналитика, автоматизация',
      },
      priceCurrency: 'KZT',
      price: '900000',
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Computer Vision',
        description: 'Распознавание объектов, OCR, контроль качества',
      },
      priceCurrency: 'KZT',
      price: '1050000',
    },
  ],
});

export const generateFaqSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Сколько стоит разработка сайта в Казахстане?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Стоимость зависит от типа сайта. Лендинг — от 30 000 ₸, корпоративный сайт — от 150 000 ₸, интернет-магазин — от 400 000 ₸, сложная веб-платформа — по индивидуальному расчёту. Все цены указаны на странице Pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Сколько занимает разработка сайта?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Лендинг — 7–14 дней, корпоративный сайт — 3–4 недели, интернет-магазин — 1.5–2 месяца, веб-платформа — от 3 месяцев. Сроки фиксируются в договоре.',
      },
    },
    {
      '@type': 'Question',
      name: 'Какие услуги оказывает SnowTech?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Разработка сайтов и мобильных приложений, AI-чат-боты и RAG-боты, Machine Learning и Computer Vision, таргетированная реклама в Instagram и TikTok, автоматизация бизнес-процессов.',
      },
    },
    {
      '@type': 'Question',
      name: 'Работаете ли вы с клиентами за пределами Казахстана?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Да, работаем удалённо с клиентами из СНГ и других стран. Общаемся на русском, английском и казахском языках.',
      },
    },
    {
      '@type': 'Question',
      name: 'Даёте ли вы гарантию на сайт?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Да, все проекты закрываются договором с гарантией от 3 до 12 месяцев в зависимости от типа продукта. В течение этого срока мы бесплатно устраняем баги, возникшие по нашей вине.',
      },
    },
    {
      '@type': 'Question',
      name: 'Помогаете ли с SEO-продвижением после запуска сайта?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Да, мы делаем технический SEO-аудит, базовую оптимизацию и настраиваем Google Search Console / Яндекс.Вебмастер при запуске. Для регулярного продвижения предлагаем пакет ежемесячного сопровождения.',
      },
    },
  ],
});

export const generateArticleSchema = (
  title: string,
  description: string,
  image: string,
  publishedTime: string,
  modifiedTime?: string,
  author?: string,
  url?: string,
) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description,
  image: image.startsWith('http') ? image : `${BASE_URL}${image}`,
  datePublished: publishedTime,
  dateModified: modifiedTime || publishedTime,
  author: {
    '@type': 'Person',
    name: author || 'SnowTech',
  },
  publisher: { '@id': `${BASE_URL}/#organization` },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': url ? `${BASE_URL}${url}` : BASE_URL,
  },
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});
