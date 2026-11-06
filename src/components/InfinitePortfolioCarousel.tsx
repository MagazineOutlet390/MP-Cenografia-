import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { portfolioProjects } from '../data/portfolio';

export function InfinitePortfolioCarousel() {
  // Split projects into 2 sets for two opposite moving rows
  const row1 = portfolioProjects.slice(0, 4);
  const row2 = portfolioProjects.slice(4);

  // Duplicate items for continuous seamless loop
  const duplicatedRow1 = [...row1, ...row1, ...row1];
  const duplicatedRow2 = [...row2, ...row2, ...row2];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              Acervo de Peças & Esculturas
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
              Portfólio em fibra de vidro.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Trabalhos executados com rigor técnico, volumetria precisa e acabamento de alto padrão.
              Passe o mouse para pausar ou clique em um projeto para ver detalhes técnicos.
            </p>
          </div>

          <div>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0B1220] hover:text-[#2A5FA5] border border-[#E5E7EB] hover:border-[#2A5FA5] rounded-lg transition-colors bg-white shadow-2xs whitespace-nowrap"
            >
              <span>Ver galeria completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Infinite Carousels Container */}
      <div className="space-y-6">
        
        {/* Row 1: Leftward infinite motion */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-6 animate-infinite-scroll pause-hover py-2">
            {duplicatedRow1.map((project, idx) => (
              <Link
                key={`row1-${project.id}-${idx}`}
                to={`/portfolio/${project.slug}`}
                className="group relative w-72 sm:w-88 md:w-96 shrink-0 rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-[#2A5FA5] transition-all"
              >
                <div className="relative aspect-16/10 w-full bg-[#F7F8FA] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0B1220] text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-xs">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-serif font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2A5FA5] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-xs text-[#64748B] line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2: Rightward / reverse infinite motion */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-6 animate-infinite-scroll-reverse pause-hover py-2">
            {duplicatedRow2.map((project, idx) => (
              <Link
                key={`row2-${project.id}-${idx}`}
                to={`/portfolio/${project.slug}`}
                className="group relative w-72 sm:w-88 md:w-96 shrink-0 rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-xs hover:shadow-md hover:border-[#2A5FA5] transition-all"
              >
                <div className="relative aspect-16/10 w-full bg-[#F7F8FA] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0B1220] text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-xs">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-serif font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2A5FA5] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="text-xs text-[#64748B] line-clamp-2">
                    {project.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
