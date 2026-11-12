/**
 * Domínio oficial único e canônico da MP Cenografia
 * Todas as tags canônicas, OpenGraph, Twitter Cards, sitemap e schemas JSON-LD
 * devem derivar exclusivamente desta constante.
 */
export const SITE_URL = 'https://mpcenografia.com';

/**
 * Padroniza URLs canônicas garantindo protocolo, domínio oficial e barra final (trailing slash).
 * Exemplos:
 * formatCanonicalUrl('/') -> 'https://mpcenografia.com/'
 * formatCanonicalUrl('/sobre') -> 'https://mpcenografia.com/sobre/'
 * formatCanonicalUrl('/blog/slug/') -> 'https://mpcenografia.com/blog/slug/'
 */
export function formatCanonicalUrl(path: string = '/'): string {
  if (!path || path === '/') {
    return `${SITE_URL}/`;
  }
  const cleanPath = path.replace(/^\/+/, '').replace(/\/+$/, '');
  return `${SITE_URL}/${cleanPath}/`;
}

/**
 * Converte um caminho relativo de imagem em URL absoluta baseada em SITE_URL.
 * Exemplo:
 * formatAbsoluteImageUrl('/og-image.jpg') -> 'https://mpcenografia.com/og-image.jpg'
 */
export function formatAbsoluteImageUrl(imagePath: string = '/og-image.jpg'): string {
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanPath = imagePath.replace(/^\/+/, '');
  return `${SITE_URL}/${cleanPath}`;
}
