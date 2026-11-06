import React from 'react';
import { Helmet } from 'react-helmet-async';
import { COMPANY } from '../../utils/constants';

export default function SchemaOrg({ type = 'LocalBusiness', data = {} }) {
  let schema = null;

  if (type === 'LocalBusiness') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://abrroadlines.com/#organization',
      name: COMPANY.name,
      legalName: COMPANY.name,
      alternateName: COMPANY.shortName,
      url: 'https://abrroadlines.com',
      logo: 'https://abrroadlines.com/logo.svg',
      image: 'https://abrroadlines.com/images/hero/hero-truck.svg',
      telephone: COMPANY.phoneRaw,
      email: COMPANY.email,
      description: COMPANY.tagline,
      address: {
        '@type': 'PostalAddress',
        streetAddress: COMPANY.address.line1 + ', ' + COMPANY.address.line2,
        addressLocality: 'Ambala Cantt',
        addressRegion: COMPANY.address.state,
        postalCode: COMPANY.address.pincode,
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 30.37,
        longitude: 76.75,
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      sameAs: [
        COMPANY.socials.facebook,
        COMPANY.socials.twitter,
        COMPANY.socials.instagram,
        COMPANY.socials.linkedin,
      ],
      priceRange: '₹₹₹',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '20:00',
        },
      ],
    };
  } else if (type === 'Service') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: data.title || 'Logistics and Road Freight Service',
      provider: {
        '@type': 'LocalBusiness',
        name: COMPANY.name,
        url: 'https://abrroadlines.com',
      },
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      description: data.excerpt || data.overview || COMPANY.tagline,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    };
  } else if (type === 'Article') {
    schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.title,
      description: data.excerpt,
      datePublished: data.publishedAt,
      author: {
        '@type': 'Person',
        name: data.author,
      },
      publisher: {
        '@type': 'Organization',
        name: COMPANY.name,
        logo: {
          '@type': 'ImageObject',
          url: 'https://abrroadlines.com/logo.svg',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://abrroadlines.com/blogs/${data.slug}`,
      },
    };
  }

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}

