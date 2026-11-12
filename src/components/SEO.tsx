import { useEffect } from 'react';
import { companyData } from '../data/company';
import { SITE_URL, formatCanonicalUrl, formatAbsoluteImageUrl } from '../constants/site';

interface SEOProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function SEO({
  title,
  description,
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/portfolio/escultura-boi-fibra-de-vidro.svg',
  schema,
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title.includes('MP Cenografia') ? title : `${title} | MP Cenografia`;
    document.title = formattedTitle;

    // Helper for meta tags
    const updateMeta = (attr: string, key: string, content: string) => {
      let element = document.querySelector(`meta[${attr}="${key}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard Meta
    updateMeta('name', 'description', description);

    // 3. Canonical Link (sempre com https://mpcenografia.com e barra no final)
    const activePath = canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
    const fullUrl = formatCanonicalUrl(activePath);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Resolve absolute image URL for OpenGraph and Twitter
    const absoluteImageUrl = formatAbsoluteImageUrl(ogImage);

    // 4. OpenGraph
    updateMeta('property', 'og:title', formattedTitle);
    updateMeta('property', 'og:description', description);
    updateMeta('property', 'og:url', fullUrl);
    updateMeta('property', 'og:type', ogType);
    updateMeta('property', 'og:site_name', 'MP Cenografia');
    updateMeta('property', 'og:locale', 'pt_BR');
    updateMeta('property', 'og:image', absoluteImageUrl);
    updateMeta('property', 'og:image:secure_url', absoluteImageUrl);
    updateMeta('property', 'og:image:width', '1200');
    updateMeta('property', 'og:image:height', '630');
    updateMeta('property', 'og:image:alt', formattedTitle);

    // 5. Twitter Card
    updateMeta('name', 'twitter:card', 'summary_large_image');
    updateMeta('name', 'twitter:title', formattedTitle);
    updateMeta('name', 'twitter:description', description);
    updateMeta('name', 'twitter:image', absoluteImageUrl);
    updateMeta('name', 'twitter:image:alt', formattedTitle);

    // 6. JSON-LD Structured Data
    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: companyData.name,
      legalName: companyData.name,
      url: formatCanonicalUrl('/'),
      telephone: companyData.telephone,
      email: companyData.email,
      description: companyData.tagline,
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyData.address.street,
        addressLocality: companyData.address.city,
        addressRegion: companyData.address.state,
        postalCode: companyData.address.zipCode,
        addressCountry: companyData.address.country,
      },
      openingHours: 'Mo-Fr 08:00-18:00',
      hasMap: companyData.googleMapsProfileUrl,
    };

    const targetSchema = schema || defaultSchema;
    let schemaScript = document.getElementById('seo-schema-json') as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.id = 'seo-schema-json';
      schemaScript.type = 'application/ld+json';
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(targetSchema);

    // Scroll to top upon page navigation
    window.scrollTo(0, 0);
  }, [title, description, canonicalPath, ogType, ogImage, schema]);

  return null;
}
