import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY } from '../../utils/constants';

export default function SEO({
  title,
  description = COMPANY.tagline,
  canonical,
  ogType = 'website',
  ogImage = '/images/hero/hero-truck.svg',
  article = null,
}) {
  const siteTitle = title ? `${title} | ${COMPANY.name}` : `${COMPANY.name} | Pan-India Road Transport & Logistics`;
  const siteUrl = 'https://abrroadlines.com';
  const fullCanonical = canonical ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical}`) : siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={COMPANY.name} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />

      {/* Article Specific Meta */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedAt} />
          <meta property="article:author" content={article.author} />
          {article.tags?.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
}

