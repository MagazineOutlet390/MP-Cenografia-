import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, MessageCircle, Layers, CheckCircle2 } from 'lucide-react';
import { getProjectBySlug, getProjects } from '../lib/content';
import { PortfolioProject } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';
import { BudgetFormSection } from '../components/BudgetFormSection';
import { companyData } from '../data/company';

export function PortfolioDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getProjectBySlug(slug).then((proj) => {
      setProject(proj);
      if (proj) {
        getProjects().then((all) => {
          const related = all.filter((p) => p.category === proj.category && p.slug !== proj.slug);
          setRelatedProjects(related.slice(0, 3));
        });
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex items-center justify-center">
        <p className="text-sm text-[#64748B]">Carregando projeto...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-[#0B1220]">Projeto não encontrado</h1>
        <p className="text-sm text-[#64748B]">O projeto solicitado não foi localizado em nossa base.</p>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2A5FA5] rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Portfólio</span>
        </Link>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} | MP Cenografia`}
        description={project.summary}
        canonicalPath={`/portfolio/${project.slug}`}
        ogImage={project.image}
      />

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs
            items={[
              { label: 'Portfólio', path: '/portfolio' },
              { label: project.title },
            ]}
          />

          {/* Project Header */}
          <div className="py-8 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              {project.categoryLabel}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              {project.summary}
            </p>
          </div>

          {/* Main Visual Showcase */}
          <div className="my-8 rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F7F8FA] shadow-md">
            <div className="relative aspect-16/9 w-full bg-[#E2E8F0]">
              <img
                src={project.image}
                alt={project.alt}
                width={1200}
                height={675}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Description & Application */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl font-bold text-[#0B1220]">
                  Sobre a Peça e Desenvolvimento
                </h2>
                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#0B1220]">
                  Aplicação e Ambiente de Exposição
                </h3>
                <p className="text-sm text-[#64748B] leading-relaxed">
                  {project.application}
                </p>
              </div>

              {/* Direct WhatsApp Quote Button */}
              <div className="pt-4">
                <a
                  href={`https://wa.me/${companyData.whatsapp}?text=${encodeURIComponent(
                    `Olá, tenho interesse em um projeto similar a: ${project.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Orçar Projeto Semelhante no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Technical Specifications Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#F7F8FA] rounded-2xl p-6 sm:p-8 border border-[#E5E7EB] space-y-6">
                <div className="flex items-center gap-2 border-b border-[#E5E7EB] pb-4">
                  <Layers className="w-5 h-5 text-[#2A5FA5]" />
                  <h3 className="font-serif text-lg font-bold text-[#0B1220]">
                    Especificações Técnicas
                  </h3>
                </div>

                <dl className="space-y-4 text-xs sm:text-sm">
                  {project.dimensions && (
                    <div>
                      <dt className="text-[#64748B] font-medium">Dimensões / Escala:</dt>
                      <dd className="text-[#0B1220] font-semibold mt-0.5">{project.dimensions}</dd>
                    </div>
                  )}

                  {project.material && (
                    <div>
                      <dt className="text-[#64748B] font-medium">Composição do Material:</dt>
                      <dd className="text-[#0B1220] font-semibold mt-0.5">{project.material}</dd>
                    </div>
                  )}

                  {project.finish && (
                    <div>
                      <dt className="text-[#64748B] font-medium">Acabamento e Proteção:</dt>
                      <dd className="text-[#0B1220] font-semibold mt-0.5">{project.finish}</dd>
                    </div>
                  )}

                  {project.clientType && (
                    <div>
                      <dt className="text-[#64748B] font-medium">Segmento Atendido:</dt>
                      <dd className="text-[#0B1220] font-semibold mt-0.5">{project.clientType}</dd>
                    </div>
                  )}
                </dl>

                <div className="pt-4 border-t border-[#E5E7EB] text-[11px] text-[#64748B] space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Fabricação Sob Medida Conforme Demanda</span>
                  </div>
                  <p>Consulte adaptações dimensionais e de pintura para a sua necessidade.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="py-16 border-t border-[#E5E7EB]">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                    Mais Trabalhos
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220]">
                    Projetos Relacionados
                  </h2>
                </div>
                <Link
                  to="/portfolio"
                  className="text-xs font-semibold text-[#2A5FA5] hover:underline flex items-center gap-1"
                >
                  <span>Ver galeria</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProjects.map((p) => (
                  <Link
                    key={p.id}
                    to={`/portfolio/${p.slug}`}
                    className="group rounded-xl border border-[#E5E7EB] overflow-hidden bg-white hover:border-[#2A5FA5] transition-all hover:shadow-xs"
                  >
                    <div className="aspect-16/10 bg-[#F7F8FA] overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.alt}
                        width={400}
                        height={250}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-serif text-sm font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-xs text-[#64748B] line-clamp-2">
                        {p.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <BudgetFormSection defaultService={project.title} />
    </>
  );
}
