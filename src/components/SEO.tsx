import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  nofollow?: boolean;
  alternateLanguages?: {
    lang: string;
    url: string;
  }[];
  structuredData?: object;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = 'https://snowtech.asia/og-image.png',
  ogType = 'website',
  article,
  noindex = false,
  nofollow = false,
  alternateLanguages,
  structuredData,
}: SEOProps) => {
  const baseUrl = 'https://snowtech.asia';
  const fullCanonical = canonical ? `${baseUrl}${canonical}` : baseUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="author" content="SnowTEch" />
        <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
        <link rel="canonical" href={fullCanonical} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={fullCanonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={fullOgImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="SnowTEch" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:locale:alternate" content="kk_KZ" />

        {/* Article specific */}
        {article && (
          <>
            {article.publishedTime && (
              <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article.modifiedTime && (
              <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {article.author && <meta property="article:author" content={article.author} />}
            {article.section && <meta property="article:section" content={article.section} />}
            {article.tags?.map((tag, index) => (
              <meta key={index} property="article:tag" content={tag} />
            ))}
          </>
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={fullCanonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={fullOgImage} />
        <meta name="twitter:site" content="@SnowTEch" />
        <meta name="twitter:creator" content="@SnowTEch" />

        {/* Alternate Languages */}
        {alternateLanguages?.map((alt) => (
          <link
            key={alt.lang}
            rel="alternate"
            hrefLang={alt.lang}
            href={`${baseUrl}${alt.url}`}
          />
        ))}

        {/* Structured Data (JSON-LD) */}
        {structuredData && (
          Array.isArray(structuredData) ? (
            structuredData.map((data, index) => (
              <script key={index} type="application/ld+json">
                {JSON.stringify(data)}
              </script>
            ))
          ) : (
            <script type="application/ld+json">
              {JSON.stringify(structuredData)}
            </script>
          )
        )}
      </Helmet>
    </>
  );
};

export default SEO;

