import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Filter } from 'lucide-react';
import { getProjects } from '../lib/content';
import { PortfolioProject } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';
import { BudgetFormSection } from '../components/BudgetFormSection';

export function PortfolioListPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const categories = [
    { id: 'todos', label: 'Todos os Projetos' },
    { id: 'esculturas', label: 'Esculturas' },
    { id: 'cenografia', label: 'Cenografia' },
    { id: 'sazonais', label: 'Peças Sazonais' },
    { id: 'tecnicas', label: 'Peças Técnicas' },
  ];

  const filteredProjects = activeCategory === 'todos'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <>
      <SEO
        title="Portfólio de Peças em Fibra de Vidro | MP Cenografia"
        description="Galeria de projetos, esculturas, cenografia e peças técnicas em fibra de vidro executadas pela MP Cenografia."
        canonicalPath="/portfolio"
      />

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ label: 'Portfólio' }]} />

          <div className="py-8 space-y-4">
            <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              Galeria de Trabalhos
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight">
              Portfólio de projetos em fibra de vidro.
            </h1>
            <p className="text-base text-[#64748B] max-w-2xl leading-relaxed">
              Conheça peças e esculturas fabricadas sob medida para shoppings, agências, indústrias e eventos de grande impacto.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 py-6 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B] mr-2">
              <Filter className="w-4 h-4 text-[#2A5FA5]" />
              <span>Filtrar:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#2A5FA5] text-white shadow-2xs'
                    : 'bg-[#F7F8FA] text-[#0B1220] hover:bg-[#E5E7EB]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/portfolio/${project.slug}`}
                className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white overflow-hidden hover:border-[#2A5FA5] hover:shadow-md transition-all duration-300"
              >
                <div className="relative aspect-16/10 w-full bg-[#F7F8FA] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    width={500}
                    height={312}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0B1220] text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-xs">
                    {project.categoryLabel}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h2 className="font-serif text-lg font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors leading-snug">
                        {project.title}
                      </h2>
                      <ArrowUpRight className="w-4 h-4 text-[#64748B] group-hover:text-[#2A5FA5] shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  <div className="pt-2 text-xs text-[#64748B] border-t border-[#F1F5F9] flex items-center justify-between">
                    <span>{project.dimensions || 'Sob medida'}</span>
                    <span className="font-medium text-[#2A5FA5]">Ver projeto</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>

      <BudgetFormSection />
    </>
  );
}
