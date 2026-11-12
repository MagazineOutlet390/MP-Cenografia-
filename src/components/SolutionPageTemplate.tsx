import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, MessageCircle, ArrowUpRight } from 'lucide-react';
import { SolutionData, PortfolioProject } from '../types';
import { Breadcrumbs } from './Breadcrumbs';
import { FAQSection } from './FAQSection';
import { WhereWeAreSection } from './WhereWeAreSection';
import { BudgetFormSection } from './BudgetFormSection';
import { SEO } from './SEO';
import { companyData } from '../data/company';
import { trackWhatsAppClick } from '../lib/gtm';

interface SolutionPageTemplateProps {
  solution: SolutionData;
  relatedProjects: PortfolioProject[];
}

export function SolutionPageTemplate({ solution, relatedProjects }: SolutionPageTemplateProps) {
  return (
    <>
      <SEO
        title={solution.title}
        description={solution.metaDescription}
        canonicalPath={solution.path}
        ogImage={solution.heroImage}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: solution.h1,
          description: solution.metaDescription,
          provider: {
            '@type': 'LocalBusiness',
            name: companyData.name,
            telephone: companyData.telephone,
            url: companyData.websiteUrl,
          },
          areaServed: 'Brasil',
          serviceType: solution.h1,
        }}
      />

      <div className="pt-24 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Soluções', path: '/#solucoes' },
              { label: solution.h1 },
            ]}
          />

          {/* 2 & 3 & 4. Hero Split: H1, Introduction, Hero Image */}
          <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                Solução Especializada em PRFV
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
                {solution.h1}
              </h1>

              <p className="text-base sm:text-lg text-[#2A5FA5] font-medium leading-relaxed">
                {solution.subtitle}
              </p>

              <div className="space-y-4 text-sm sm:text-base text-[#64748B] leading-relaxed">
                {solution.overview.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`https://wa.me/${companyData.whatsapp}?text=${encodeURIComponent(
                    `Olá, tenho interesse na solução de: ${solution.h1}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('conteudo')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#2A5FA5] hover:bg-[#1E4680] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Consultar Viabilidade Técnica</span>
                </a>

                <a
                  href="#orcamento"
                  className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#0B1220] text-sm font-semibold rounded-lg transition-colors"
                >
                  <span>Solicitar Orçamento</span>
                  <ArrowRight className="w-4 h-4 text-[#64748B]" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F7F8FA] shadow-md">
                <img
                  src={solution.heroImage}
                  alt={solution.heroImageAlt}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>

          </div>

          {/* 5. Aplicações e Possibilidades */}
          <section className="py-16 border-t border-[#E5E7EB]">
            <div className="max-w-3xl space-y-3 mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                Versatilidade & Formatos
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220] tracking-tight">
                Aplicações e possibilidades de fabricação.
              </h2>
              <p className="text-sm text-[#64748B]">
                Peças configuradas exatamente para a necessidade arquitetônica, artística ou de engenharia do seu projeto.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {solution.applications.map((app) => (
                <div
                  key={app.title}
                  className="p-6 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-2 hover:border-[#2A5FA5] transition-colors"
                >
                  <h3 className="font-serif text-lg font-bold text-[#0B1220]">
                    {app.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {app.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 6. Perfil de Clientes Atendidos */}
          <section className="py-16 border-t border-[#E5E7EB]">
            <div className="bg-[#0B1220] text-white rounded-2xl p-8 sm:p-12">
              <div className="max-w-2xl space-y-3 mb-8">
                <div className="text-xs font-semibold tracking-wider text-[#60A5FA] uppercase">
                  Segmentos Atendidos
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Para quem desenvolvemos esta solução.
                </h2>
                <p className="text-sm text-slate-300">
                  Estrutura especializada para atender demandas de alta exigência com conformidade técnica.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {solution.clientProfiles.map((client) => (
                  <div key={client} className="flex items-center gap-3 p-3.5 rounded-lg bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-[#60A5FA] shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-100">
                      {client}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. Processo de Desenvolvimento */}
          <section className="py-16 border-t border-[#E5E7EB]">
            <div className="max-w-3xl space-y-3 mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                Etapas Construtivas
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220] tracking-tight">
                Processo de desenvolvimento desta solução.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {solution.processSteps.map((step) => (
                <div key={step.step} className="p-6 rounded-xl border border-[#E5E7EB] bg-white space-y-3">
                  <span className="font-mono text-xs font-bold text-[#2A5FA5] bg-[#EBF3FB] px-2 py-0.5 rounded-sm">
                    {step.step}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#0B1220]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 8. Galeria de Projetos Relacionados */}
          {relatedProjects.length > 0 && (
            <section className="py-16 border-t border-[#E5E7EB]">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                    Casos & Aplicações
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220] tracking-tight">
                    Projetos relacionados nesta categoria.
                  </h2>
                </div>
                <Link
                  to="/portfolio"
                  className="text-xs font-semibold text-[#2A5FA5] hover:underline flex items-center gap-1"
                >
                  <span>Ver todo o portfólio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.slice(0, 3).map((proj) => (
                  <Link
                    key={proj.id}
                    to={`/portfolio/${proj.slug}`}
                    className="group rounded-xl border border-[#E5E7EB] overflow-hidden bg-white hover:border-[#2A5FA5] transition-all hover:shadow-xs"
                  >
                    <div className="aspect-16/10 bg-[#F7F8FA] overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.alt}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-serif text-sm font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors line-clamp-1">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#64748B] line-clamp-2">
                        {proj.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* 9. Perguntas Frequentes Específicas */}
      <FAQSection
        customItems={solution.faq}
        title={`Perguntas sobre ${solution.h1}`}
        subtitle="Dúvidas comuns sobre fabricação, materiais e especificações técnicas."
      />

      {/* 10. Seção Onde Estamos */}
      <WhereWeAreSection />

      {/* 11. CTA de Orçamento */}
      <BudgetFormSection defaultService={solution.h1} />
    </>
  );
}
