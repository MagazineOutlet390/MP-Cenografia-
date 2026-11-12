import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/data/blog';
import { portfolioProjects } from '../src/data/portfolio';
import { solutionsData } from '../src/data/solutions';
import { companyData } from '../src/data/company';
import { SITE_URL, formatCanonicalUrl, formatAbsoluteImageUrl } from '../src/constants/site';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  image: string;
  ogType?: 'website' | 'article';
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const siteUrl = SITE_URL;

const routes: RouteMeta[] = [
  // 1. Homepage
  {
    path: '/',
    title: 'MP Cenografia | Fabricação de Peças em Fibra de Vidro',
    description: 'Fábrica especializada na fabricação personalizada de peças em fibra de vidro, esculturas em tamanho real, cenografia e peças técnicas. Atendimento em todo o Brasil.',
    image: '/og-image.jpg',
    ogType: 'website',
    schema: {
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
        addressCountry: 'BR',
      },
      hasMap: companyData.googleMapsProfileUrl,
    },
  },

  // 2. Sobre
  {
    path: '/sobre',
    title: 'Sobre a MP Cenografia | Fábrica de Peças em Fibra de Vidro',
    description: 'Conheça a história, infraestrutura e capacidade fabril da MP Cenografia. Mais de 18 anos desenvolvendo projetos sob medida em compósitos de fibra de vidro (PRFV).',
    image: '/og-image.jpg',
  },

  // 3. Contato
  {
    path: '/contato',
    title: 'Contato e Orçamentos | Fábrica de Fibra de Vidro MP Cenografia',
    description: 'Solicite seu orçamento técnico diretamente com a MP Cenografia. Esculturas, cenografia monumental e peças industriais em fibra de vidro com atendimento nacional.',
    image: '/og-image.jpg',
  },

  // 4. Portfólio Lista
  {
    path: '/portfolio',
    title: 'Portfólio de Peças em Fibra de Vidro | MP Cenografia',
    description: 'Galeria oficial de esculturas em escala real, estruturas cenográficas e peças sob medida fabricadas em PRFV pela MP Cenografia com acabamento automotivo.',
    image: '/og-image.jpg',
  },

  // 5. Blog Lista
  {
    path: '/blog',
    title: 'Blog e Conhecimento Técnico em Fibra de Vidro | MP Cenografia',
    description: 'Hub de engenharia e fabricação de peças sob medida em fibra de vidro (PRFV). Esculturas realistas, cenografia monumental e peças técnicas para todo o Brasil.',
    image: '/og-image.jpg',
  },

  // 6. Soluções Especializadas
  ...Object.values(solutionsData).map((s) => ({
    path: s.path,
    title: `${s.title} | MP Cenografia`,
    description: s.metaDescription,
    image: s.heroImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.h1,
      description: s.metaDescription,
      provider: {
        '@type': 'Organization',
        name: companyData.name,
        url: formatCanonicalUrl('/'),
      },
      areaServed: 'BR',
    },
  })),

  // 7. Projetos do Portfólio
  ...portfolioProjects.map((p) => ({
    path: `/portfolio/${p.slug}`,
    title: `${p.title} | MP Cenografia`,
    description: p.summary,
    image: p.image,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: p.title,
      description: p.description,
      image: formatAbsoluteImageUrl(p.image),
      creator: {
        '@type': 'Organization',
        name: companyData.name,
        url: formatCanonicalUrl('/'),
      },
    },
  })),

  // 8. Cinco Artigos do Silo Semântico
  ...blogPosts.map((post) => {
    const schemas: Array<Record<string, unknown>> = [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription || post.excerpt,
        datePublished: post.date,
        image: formatAbsoluteImageUrl(post.image),
        author: {
          '@type': 'Organization',
          name: post.author.name,
        },
        publisher: {
          '@type': 'Organization',
          name: companyData.name,
          url: formatCanonicalUrl('/'),
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': formatCanonicalUrl(`/blog/${post.slug}/`),
        },
      },
    ];

    if (post.faq && post.faq.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    return {
      path: `/blog/${post.slug}`,
      title: `${post.title} | Blog MP Cenografia`,
      description: post.metaDescription || post.excerpt,
      image: post.image,
      ogType: 'article' as const,
      schema: schemas,
    };
  }),
];

function injectMetadata(htmlTemplate: string, meta: RouteMeta): string {
  let html = htmlTemplate;

  const canonicalUrl = formatCanonicalUrl(meta.path);
  const absoluteImage = formatAbsoluteImageUrl(meta.image);
  const ogType = meta.ogType || 'website';

  // 1. Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // 2. Meta description
  html = html.replace(
    /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
    `<meta name="description" content="${meta.description}" />`
  );

  // 3. Canonical
  if (html.includes('rel="canonical"')) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }

  // 4. OpenGraph
  html = html.replace(
    /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image" content="${absoluteImage}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:secure_url"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${absoluteImage}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image:alt"\s+content=".*?"\s*\/?>/i,
    `<meta property="og:image:alt" content="${meta.title}" />`
  );

  // 5. Twitter Card
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:image" content="${absoluteImage}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:image:alt"\s+content=".*?"\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${meta.title}" />`
  );

  // 6. Schema.org JSON-LD injection
  if (meta.schema) {
    const jsonLd = `\n    <script id="seo-schema-json" type="application/ld+json">${JSON.stringify(
      meta.schema
    )}</script>`;
    if (html.includes('id="seo-schema-json"')) {
      html = html.replace(/<script id="seo-schema-json".*?<\/script>/s, jsonLd.trim());
    } else {
      html = html.replace('</head>', `${jsonLd}\n  </head>`);
    }
  }

  return html;
}

function run() {
  const indexHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('dist/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  console.log(`Starting pre-rendering metadata injection for ${routes.length} routes...`);

  let count = 0;
  for (const route of routes) {
    const pageHtml = injectMetadata(baseHtml, route);

    let targetFile: string;
    if (route.path === '/') {
      targetFile = indexHtmlPath;
    } else {
      const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
      if (!fs.existsSync(routeDir)) {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      targetFile = path.join(routeDir, 'index.html');
    }

    fs.writeFileSync(targetFile, pageHtml, 'utf-8');
    count++;
  }

  // Cloudflare Pages Native SPA routing support:
  // Cloudflare Pages natively uses 200.html as the 200 OK fallback for any unmatched routes.
  // This eliminates the need for `/* /index.html 200` in _redirects which triggers Cloudflare's
  // infinite loop detection (Error 10021).
  const spaFallbackPath = path.join(distDir, '200.html');
  const errorFallbackPath = path.join(distDir, '404.html');
  fs.copyFileSync(indexHtmlPath, spaFallbackPath);
  fs.copyFileSync(indexHtmlPath, errorFallbackPath);
  console.log('Generated dist/200.html (Cloudflare Pages native SPA fallback) and dist/404.html.');

  // Ensure no conflicting _redirects file exists in dist
  const distRedirects = path.join(distDir, '_redirects');
  if (fs.existsSync(distRedirects)) {
    fs.unlinkSync(distRedirects);
    console.log('Removed obsolete dist/_redirects to prevent Cloudflare Pages loop detection.');
  }

  console.log(`Successfully generated static initial HTML for ${count} routes.`);
}

run();
