import { GoogleReview } from '../types';

/**
 * Fonte de dados para o componente GoogleReviews.
 * 
 * NOTA DE DESENVOLVIMENTO:
 * Conforme orientações do projeto, as avaliações abaixo são placeholders técnicos
 * estritamente estruturais para testar a interface do carrossel antes da importação
 * dos depoimentos oficiais da conta Google Meu Negócio / Google Places API da MP Cenografia.
 * O campo 'isProvisionalPlaceholder: true' identifica explicitamente essa condição.
 */
export const provisionalGoogleReviews: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'Produtor Técnico Cenográfico [Exemplo]',
    rating: 5,
    text: 'Trabalho de laminação impecável. A precisão dimensional da peça e a pontualidade na entrega foram decisivas para o sucesso da nossa montagem de fim de ano.',
    relativeTime: 'Há 2 meses',
    isProvisionalPlaceholder: true,
  },
  {
    id: 'rev-2',
    authorName: 'Gerência de Marketing e Eventos [Exemplo]',
    rating: 5,
    text: 'As esculturas para a praça do shopping superaram as expectativas de acabamento e resistência. O público adorou tirar fotos com as peças de Páscoa.',
    relativeTime: 'Há 4 meses',
    isProvisionalPlaceholder: true,
  },
  {
    id: 'rev-3',
    authorName: 'Engenharia de Produto Industrial [Exemplo]',
    rating: 5,
    text: 'Carenagens técnicas sob medida com excelente rigor nas medidas e furações. Atendimento ágil e consultoria prestativa.',
    relativeTime: 'Há 6 meses',
    isProvisionalPlaceholder: true,
  },
  {
    id: 'rev-4',
    authorName: 'Cenógrafo de Grandes Festivais [Exemplo]',
    rating: 5,
    text: 'A facilidade de montagem das peças bipartidas em fibra fez toda a diferença no cronograma apertado do evento.',
    relativeTime: 'Há 8 meses',
    isProvisionalPlaceholder: true,
  }
];

/**
 * Função de acesso às avaliações, preparada para futura integração
 * com Cloudflare Workers / Google Places API proxy de forma segura e server-side.
 */
export async function getGoogleReviews(): Promise<GoogleReview[]> {
  // Nesta primeira fase, retorna as referências provisórias locais
  return Promise.resolve(provisionalGoogleReviews);
}
