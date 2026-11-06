import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { CredibilityBar } from '../components/CredibilityBar';
import { SolutionsSection } from '../components/SolutionsSection';
import { FactorySeoSection } from '../components/FactorySeoSection';
import { CorporateSection } from '../components/CorporateSection';
import { InfinitePortfolioCarousel } from '../components/InfinitePortfolioCarousel';
import { ProcessSection } from '../components/ProcessSection';
import { GoogleReviews } from '../components/GoogleReviews';
import { BlogPreviewSection } from '../components/BlogPreviewSection';
import { FAQSection } from '../components/FAQSection';
import { WhereWeAreSection } from '../components/WhereWeAreSection';
import { BudgetFormSection } from '../components/BudgetFormSection';
import { companyData } from '../data/company';

export function HomePage() {
  return (
    <>
      <SEO
        title="MP Cenografia | Fabricação de Peças em Fibra de Vidro"
        description="Fábrica especializada na fabricação personalizada de peças em fibra de vidro, esculturas em tamanho real, cenografia e peças técnicas. Atendimento em todo o Brasil."
        canonicalPath="/"
        ogImage="/og-image.jpg"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: companyData.name,
          legalName: companyData.name,
          url: companyData.websiteUrl,
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
        }}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Faixa de Credibilidade */}
      <CredibilityBar />

      {/* 3. Soluções */}
      <SolutionsSection />

      {/* 3.1 Seção Estratégica SEO: Fábrica de Fibra de Vidro */}
      <FactorySeoSection />

      {/* 4. Grandes Empresas e Projetos Corporativos */}
      <CorporateSection />

      {/* 5. Portfólio em Carrossel Infinito */}
      <InfinitePortfolioCarousel />

      {/* 6. Processo de Trabalho */}
      <ProcessSection />

      {/* 7. Avaliações do Google */}
      <GoogleReviews />

      {/* 8. Últimos Artigos do Blog */}
      <BlogPreviewSection />

      {/* 9. Perguntas Frequentes */}
      <FAQSection />

      {/* 10. Onde Estamos */}
      <WhereWeAreSection />

      {/* 11. CTA Final e Formulário de Orçamento */}
      <BudgetFormSection />
    </>
  );
}
