import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blog';

export function BlogPreviewSection() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF] border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              Artigos & Engenharia
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
              Ideias, projetos e conhecimento técnico.
            </h2>
            <p className="text-base text-[#64748B] leading-relaxed">
              Conteúdos práticos sobre processos de fabricação em PRFV, especificações para cenografia e planejamento de esculturas.
            </p>
          </div>

          <div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0B1220] hover:text-[#2A5FA5] border border-[#E5E7EB] hover:border-[#2A5FA5] rounded-lg transition-colors bg-white shadow-2xs whitespace-nowrap"
            >
              <span>Ver todos os artigos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white overflow-hidden hover:border-[#2A5FA5] hover:shadow-md transition-all duration-300"
            >
              <Link to={`/blog/${post.slug}`} className="relative aspect-16/10 w-full bg-[#F7F8FA] overflow-hidden block">
                <img
                  src={post.image}
                  alt={post.alt}
                  width={400}
                  height={250}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0B1220] text-[11px] font-medium px-2 py-0.5 rounded-sm shadow-xs">
                  {post.category}
                </div>
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

                  <h3 className="font-serif text-lg font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors leading-snug line-clamp-2">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A5FA5] hover:text-[#1E4680]"
                  >
                    <span>Ler artigo completo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
