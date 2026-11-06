import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowUpRight, Search, Sparkles, BookOpen } from 'lucide-react';
import { getPosts } from '../lib/content';
import { BlogPost } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';
import { BudgetFormSection } from '../components/BudgetFormSection';

export function BlogListPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  // Distinct categories
  const categories = useMemo(() => {
    const list = ['Todos'];
    posts.forEach((p) => {
      if (!list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return list;
  }, [posts]);

  // Pillar post (Article 01)
  const pillarPost = useMemo(() => {
    return posts.find((p) => p.isPillarPost) || posts[0];
  }, [posts]);

  // Filtered remaining posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
      const matchesSearch =
        searchTerm.trim() === '' ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchTerm]);

  return (
    <>
      <SEO
        title="Blog e Conhecimento Técnico em Fibra de Vidro | MP Cenografia"
        description="Hub de engenharia e fabricação de peças sob medida em fibra de vidro (PRFV). Esculturas realistas, cenografia monumental e peças técnicas para todo o Brasil."
        canonicalPath="/blog"
      />

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ label: 'Blog' }]} />

          {/* Section Header */}
          <div className="py-8 space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Silo Semântico & Engenharia de Compósitos</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight">
              Blog institucional MP Cenografia
            </h1>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-3xl">
              Publicações técnicas especializadas sobre processos de laminação em PRFV, modelagem tridimensional de esculturas, cenografia monumental e peças técnicas industriais sob medida com alcance em todo o território nacional.
            </p>
          </div>

          {/* Featured Pillar Post Showcase (Artigo 01) */}
          {pillarPost && (
            <div className="my-8">
              <div className="relative overflow-hidden rounded-3xl border border-[#E5E7EB] bg-[#0B1220] text-white shadow-lg transition-all duration-300 hover:border-[#2A5FA5]">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  
                  {/* Left / Content */}
                  <div className="p-8 sm:p-10 lg:p-12 lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#2A5FA5] text-white">
                          <Sparkles className="w-3.5 h-3.5" />
                          Artigo Pilar · Guia Definitivo
                        </span>
                        <span className="text-xs text-slate-300">
                          {pillarPost.category}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                        <Link to={`/blog/${pillarPost.slug}`} className="hover:text-[#93C5FD] transition-colors">
                          {pillarPost.title}
                        </Link>
                      </h2>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
                        {pillarPost.excerpt}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 text-xs text-slate-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#93C5FD]" />
                          <span>{pillarPost.formattedDate}</span>
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#93C5FD]" />
                          <span>{pillarPost.readingTime} de leitura</span>
                        </span>
                      </div>

                      <Link
                        to={`/blog/${pillarPost.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#0B1220] font-semibold text-xs hover:bg-[#93C5FD] transition-colors shadow-xs"
                      >
                        <span>Acessar Guia Completo</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Right / Image */}
                  <div className="lg:col-span-5 h-72 sm:h-96 lg:h-full min-h-[320px] relative overflow-hidden bg-slate-900">
                    <img
                      src={pillarPost.image}
                      alt={pillarPost.alt}
                      className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-700"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0B1220] via-transparent to-transparent pointer-events-none" />
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Search and Category Filter Toolbar */}
          <div className="pt-8 pb-6 border-b border-[#E5E7EB] space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#2A5FA5] text-white shadow-xs'
                        : 'bg-[#F7F8FA] text-[#64748B] hover:text-[#0B1220] hover:bg-[#E5E7EB] border border-[#E5E7EB]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar artigos e tópicos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-[#E5E7EB] bg-white text-[#0B1220] placeholder-[#94A3B8] focus:outline-none focus:border-[#2A5FA5] focus:ring-1 focus:ring-[#2A5FA5]"
                />
              </div>

            </div>
          </div>

          {/* Blog Cards Grid */}
          <div className="pt-8 pb-12">
            {filteredPosts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <p className="text-base text-[#64748B]">Nenhum artigo encontrado para o filtro selecionado.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('Todos');
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-[#2A5FA5] hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden hover:border-[#2A5FA5] hover:shadow-md transition-all duration-300"
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="relative aspect-16/10 w-full bg-[#F7F8FA] overflow-hidden block"
                    >
                      <img
                        src={post.image}
                        alt={post.alt}
                        width={600}
                        height={375}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0B1220] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                        {post.category}
                      </div>
                      {post.isPillarPost && (
                        <div className="absolute top-3 right-3 bg-[#2A5FA5] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider">
                          Pilar
                        </div>
                      )}
                    </Link>

                    <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{post.formattedDate}</span>
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.readingTime}</span>
                          </span>
                        </div>

                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors leading-snug line-clamp-2">
                          <Link to={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {post.tags.slice(0, 2).map((t) => (
                            <span key={t} className="text-[10px] text-[#64748B] bg-[#F7F8FA] px-2 py-0.5 rounded-sm">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A5FA5] group-hover:text-[#1E4680] transition-colors"
                        >
                          <span>Ler artigo</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* National B2B Callout */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#F7F8FA] border border-[#E5E7EB] text-center max-w-4xl mx-auto space-y-4 my-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2A5FA5]">
              Fabricação Sob Demanda no Brasil
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220]">
              Precisa de uma estrutura ou peça personalizada em fibra de vidro?
            </h3>
            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
              Nossa equipe de engenharia e modelagem técnica analisa plantas arquitetônicas, sketches e modelos 3D para produzir com precisão industrial, alta durabilidade e entrega garantida para sua empresa ou agência.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#orcamento"
                className="px-6 py-3 rounded-xl bg-[#2A5FA5] hover:bg-[#1E4680] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors"
              >
                Solicitar Cotação de Projeto
              </a>
              <Link
                to="/portfolio"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-[#0B1220] border border-[#E5E7EB] text-xs font-semibold transition-colors"
              >
                Conhecer Projetos Realizados
              </Link>
            </div>
          </div>

        </div>
      </div>

      <BudgetFormSection />
    </>
  );
}
