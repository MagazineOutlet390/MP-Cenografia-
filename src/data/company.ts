import { CompanyData } from '../types';
import { SITE_URL } from '../constants/site';

/**
 * Dados institucionais oficiais da MP Cenografia.
 * Todos os dados comerciais e de contato estão centralizados aqui.
 * Campos não confirmados estão marcados explicitamente com [Placeholder]
 * para substituição direta pelos dados oficiais do Perfil da Empresa no Google.
 */
export const companyData: CompanyData = {
  name: 'MP Cenografia',
  tradeName: 'MP Cenografia',
  tagline: 'Peças em fibra de vidro que ganham vida e alta performance',
  foundedYear: 2008,
  yearsOfExperience: '+18 anos de mercado',
  telephone: '+55 11 96649-9640',
  whatsapp: '5511966499640',
  whatsappFormatted: '+55 (11) 96649-9640',
  whatsappLink: 'https://wa.me/5511966499640',
  email: 'vendas@mpcenografia.com',
  address: {
    street: 'Estr. Moinho Velho, 1356',
    neighborhood: 'Jardim Tomé',
    city: 'Embu das Artes',
    state: 'SP',
    zipCode: '06805-170',
    fullFormatted: 'Estr. Moinho Velho, 1356 - Jardim Tomé, Embu das Artes - SP, 06805-170',
    country: 'Brasil',
    note: 'Fábrica e atendimento técnico em Embu das Artes - SP com entrega para projetos em todo o Brasil',
  },
  openingHours: 'Segunda a Sexta-feira: 08h00 às 18h00 (Atendimento técnico sob consulta)',
  googleMapsProfileUrl: 'https://share.google/ctSHRnPDuwmNu0ZvX',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Estr.+Moinho+Velho,+1356+-+Jardim+Tom%C3%A9,+Embu+das+Artes+-+SP,+06805-170',
  googleMapsEmbedUrl: 'https://maps.google.com/maps?q=Estr.+Moinho+Velho,+1356+-+Jardim+Tom%C3%A9,+Embu+das+Artes+-+SP,+06805-170&t=&z=16&ie=UTF8&iwloc=&output=embed',
  websiteUrl: SITE_URL,
  socialLinks: {
    instagram: 'https://instagram.com/mpcenografia',
    linkedin: 'https://linkedin.com/company/mpcenografia',
  },
};
