import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowUpRight,
  ChevronDown,
  MessageCircle,
  HelpCircle,
  List,
  CheckCircle2,
  Share2,
  Check
} from 'lucide-react';
import { getPostBySlug, getPosts } from '../lib/content';
import { BlogPost } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';
import { BudgetFormSection } from '../components/BudgetFormSection';
import { companyData } from '../data/company';
import { trackWhatsAppClick } from '../lib/gtm';

// Helper to slugify heading text for anchor links
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

// Inline formatting parser for links and bold/italic text
function renderInline(text: string): React.ReactNode {
  const regex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const linkText = match[2];
      const linkUrl = match[3];
      if (linkUrl.startsWith('/')) {
        const targetPath = linkUrl.length > 1 && linkUrl.endsWith('/') ? linkUrl.slice(0, -1) : linkUrl;
        parts.push(
          <Link
            key={match.index}
            to={targetPath}
            className="text-[#2A5FA5] font-semibold underline decoration-[#2A5FA5]/30 hover:decoration-[#2A5FA5] hover:text-[#1E4680] transition-colors"
          >
            {linkText}
          </Link>
        );
      } else {
        const isWhatsApp = linkUrl.includes('wa.me') || linkUrl.includes('whatsapp');
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={isWhatsApp ? () => trackWhatsAppClick('conteudo') : undefined}
            className="text-[#2A5FA5] font-semibold underline decoration-[#2A5FA5]/30 hover:decoration-[#2A5FA5] hover:text-[#1E4680] transition-colors"
          >
            {linkText}
          </a>
        );
      }
    } else if (match[4]) {
      parts.push(
        <strong key={match.index} className="font-semibold text-[#0B1220]">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      parts.push(
        <em key={match.index} className="italic text-[#334155]">
          {match[5]}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Structured Article Body parser
function ArticleContentRenderer({ content, toc }: { content: string; toc?: Array<{ id: string; label: string }> }) {
  const tocMap = new Map<string, string>();
  if (toc) {
    toc.forEach((item) => {
      tocMap.set(slugify(item.label), item.id);
      tocMap.set(item.label.toLowerCase().trim(), item.id);
    });
  }

  // Split into block sections
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-6 text-[#334155] leading-relaxed text-base sm:text-lg">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading 2
        if (trimmed.startsWith('## ')) {
          const rawTitle = trimmed.replace(/^##\s+/, '').trim();
          const autoId = slugify(rawTitle);
          const matchedId = tocMap.get(autoId) || tocMap.get(rawTitle.toLowerCase()) || autoId;

          return (
            <h2
              key={index}
              id={matchedId}
              className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220] pt-8 pb-3 border-b border-[#E5E7EB] scroll-mt-28 tracking-tight"
            >
              {renderInline(rawTitle)}
            </h2>
          );
        }

        // Heading 3
        if (trimmed.startsWith('### ')) {
          const rawTitle = trimmed.replace(/^###\s+/, '').trim();
          const autoId = slugify(rawTitle);
          const matchedId = tocMap.get(autoId) || tocMap.get(rawTitle.toLowerCase()) || autoId;

          return (
            <h3
              key={index}
              id={matchedId}
              className="font-serif text-xl sm:text-2xl font-bold text-[#0B1220] pt-6 pb-2 scroll-mt-28 tracking-tight"
            >
              {renderInline(rawTitle)}
            </h3>
          );
        }

        // Blockquote / Callout
        if (trimmed.startsWith('> ')) {
          const quoteText = trimmed.replace(/^>\s+/gm, '').trim();
          return (
            <div
              key={index}
              className="border-l-4 border-[#2A5FA5] bg-[#F7F8FA] p-5 rounded-r-xl text-base italic text-[#0B1220] my-6"
            >
              {renderInline(quoteText)}
            </div>
          );
        }

        // Bullet List
        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
          return (
            <ul key={index} className="space-y-2.5 my-4 pl-2">
              {lines.map((line, liIdx) => {
                const itemText = line.replace(/^[-*]\s+/, '').trim();
                return (
                  <li key={liIdx} className="flex items-start gap-3 text-base text-[#334155] leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-[#2A5FA5] mt-2.5 shrink-0" />
                    <div className="flex-1">{renderInline(itemText)}</div>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Numbered List
        if (/^\d+\.\s/.test(trimmed)) {
          const lines = trimmed.split('\n').filter((l) => l.trim().length > 0);
          return (
            <ol key={index} className="space-y-3 my-4 pl-1">
              {lines.map((line, olIdx) => {
                const match = line.match(/^(\d+)\.\s+(.*)/);
                const num = match ? match[1] : `${olIdx + 1}`;
                const itemText = match ? match[2] : line;
                return (
                  <li key={olIdx} className="flex items-start gap-3.5 text-base text-[#334155] leading-relaxed">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#2A5FA5]/10 text-[#2A5FA5] text-xs font-bold shrink-0 mt-0.5">
                      {num}
                    </span>
                    <div className="flex-1">{renderInline(itemText)}</div>
                  </li>
                );
              })}
            </ol>
          );
        }

        // Standard Paragraph
        return (
          <p key={index} className="text-base sm:text-lg text-[#334155] leading-relaxed">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getPostBySlug(slug).then((p) => {
      setPost(p);
      getPosts().then((all) => {
        setAllPosts(all);
      });
      setLoading(false);
    });
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex items-center justify-center">
        <div className="space-y-3">
          <div className="w-8 h-8 border-3 border-[#2A5FA5] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-[#64748B]">Carregando artigo técnico...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4">
        <h1 className="font-serif text-3xl font-bold text-[#0B1220]">Artigo não encontrado</h1>
        <p className="text-sm text-[#64748B]">O conteúdo solicitado não foi encontrado no blog da MP Cenografia.</p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2A5FA5] rounded-lg shadow-sm hover:bg-[#1E4680] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Blog</span>
        </Link>
      </div>
    );
  }

  // Silo articles to recommend
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Schema: BlogPosting + FAQPage (if faq exists)
  const schemas: Array<Record<string, unknown>> = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      image: post.image,
      author: {
        '@type': 'Organization',
        name: post.author.name,
      },
      publisher: {
        '@type': 'Organization',
        name: companyData.name,
        url: companyData.websiteUrl,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://mpcenografia.com.br/blog/${post.slug}`,
      },
    },
  ];

  if (post.faq && post.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
  }

  return (
    <>
      <SEO
        title={`${post.title} | Blog MP Cenografia`}
        description={post.metaDescription || post.excerpt}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.image}
        schema={schemas}
      />

      <article className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs
            items={[
              { label: 'Blog', path: '/blog' },
              { label: post.title },
            ]}
          />

          {/* Article Header */}
          <header className="py-8 space-y-6 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-[#2A5FA5] bg-[#2A5FA5]/10 uppercase">
                {post.category}
              </span>
              {post.isPillarPost && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-[#0B1220] bg-[#F7F8FA] border border-[#E5E7EB]">
                  ⭐ Artigo Pilar do Cluster
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-lg sm:text-xl text-[#475569] leading-relaxed font-normal">
              {post.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#64748B] pt-4 border-y border-[#E5E7EB] py-3.5">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5 text-[#0B1220] font-medium">
                  <User className="w-3.5 h-3.5 text-[#2A5FA5]" />
                  <span>{post.author.name}</span>
                </span>
                <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.formattedDate}</span>
                </span>
                <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime} de leitura</span>
                </span>
              </div>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E5E7EB] text-xs font-semibold text-[#334155] hover:border-[#2A5FA5] hover:text-[#2A5FA5] transition-colors"
                title="Compartilhar ou copiar link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Link copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartilhar</span>
                  </>
                )}
              </button>
            </div>
          </header>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            
            {/* Left / Article Body */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Featured Image */}
              <figure className="rounded-2xl overflow-hidden border border-[#E5E7EB] bg-[#F7F8FA] aspect-16/9 shadow-xs">
                <img
                  src={post.image}
                  alt={post.alt}
                  width={1200}
                  height={675}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </figure>

              {/* Table of Contents (Mobile & Tablet inline card) */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] lg:hidden">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1220] mb-3">
                    <List className="w-4 h-4 text-[#2A5FA5]" />
                    <span>Sumário do Conteúdo</span>
                  </div>
                  <nav aria-label="Sumário móvel">
                    <ol className="space-y-2 text-sm">
                      {post.tableOfContents.map((item, idx) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="text-[#2A5FA5] hover:text-[#1E4680] hover:underline transition-colors flex items-center gap-2"
                          >
                            <span className="text-xs text-[#94A3B8] font-mono">{idx + 1}.</span>
                            <span>{item.label}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                </div>
              )}

              {/* Rendered Markdown Content */}
              <div className="pt-2">
                <ArticleContentRenderer content={post.content} toc={post.tableOfContents} />
              </div>

              {/* FAQ Accordion Section (Rich Snippet Ready) */}
              {post.faq && post.faq.length > 0 && (
                <section className="pt-10 border-t border-[#E5E7EB] space-y-6">
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                    <HelpCircle className="w-4 h-4" />
                    <span>Perguntas Frequentes (FAQ)</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220]">
                    Dúvidas técnicas comuns sobre o tema
                  </h3>
                  <p className="text-sm text-[#64748B]">
                    Respostas diretas de nossa equipe de engenharia e modelagem volumétrica para auxiliar seu projeto.
                  </p>

                  <div className="space-y-3 pt-2">
                    {post.faq.map((item, qIdx) => {
                      const isOpen = openFaqIndex === qIdx;
                      return (
                        <div
                          key={qIdx}
                          className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden transition-all duration-200"
                        >
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : qIdx)}
                            className="w-full flex items-center justify-between gap-4 p-5 text-left font-serif text-base font-bold text-[#0B1220] hover:text-[#2A5FA5] transition-colors"
                            aria-expanded={isOpen}
                          >
                            <span>{item.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 text-[#2A5FA5] shrink-0 transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#475569] leading-relaxed border-t border-[#F1F5F9] bg-[#FAFAFA]">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* E-E-A-T Technical Author Box */}
              <div className="p-6 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-10">
                <div className="w-14 h-14 rounded-full bg-[#2A5FA5] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
                  MP
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base font-bold text-[#0B1220]">
                      {post.author.name}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Revisão Técnica E-E-A-T
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B]">{post.author.role}</p>
                  <p className="text-xs text-[#334155] leading-relaxed pt-1">
                    Conteúdo redigido com base nas rotinas fabris de laminação, laminação manual, corte CNC, acabamento automotivo e montagem estrutural executadas na sede da MP Cenografia em Embu das Artes - SP.
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="pt-6 flex flex-wrap items-center gap-2 border-t border-[#E5E7EB]">
                <span className="text-xs text-[#64748B] font-semibold">Tópicos:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-[#2A5FA5] bg-[#F7F8FA] px-3 py-1 rounded-full border border-[#E5E7EB] font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

            </div>

            {/* Right / Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              
              {/* Desktop Sticky Table of Contents */}
              {post.tableOfContents && post.tableOfContents.length > 0 && (
                <div className="hidden lg:block sticky top-28 p-6 rounded-2xl bg-[#F7F8FA] border border-[#E5E7EB] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1220]">
                    <List className="w-4 h-4 text-[#2A5FA5]" />
                    <span>Neste Artigo</span>
                  </div>
                  <nav aria-label="Sumário na barra lateral">
                    <ol className="space-y-2.5 text-xs text-[#475569]">
                      {post.tableOfContents.map((item, idx) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="hover:text-[#2A5FA5] hover:underline transition-colors block py-1 border-l-2 border-transparent hover:border-[#2A5FA5] pl-2.5"
                          >
                            <span className="text-[#94A3B8] font-mono mr-1.5">{idx + 1}.</span>
                            <span>{item.label}</span>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>

                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <a
                      href={companyData.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick('conteudo')}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Falar com Engenharia</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Commercial B2B Silo CTA Card */}
              <div className="p-6 rounded-2xl bg-[#0B1220] text-white space-y-4 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#93C5FD]">
                  Atendimento Nacional
                </span>
                <h4 className="font-serif text-xl font-bold leading-snug">
                  Tem um projeto sob medida em fibra de vidro?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  A MP Cenografia fabrica esculturas gigantes, cenografia para eventos e peças técnicas com entrega e logística especializada em todo o Brasil.
                </p>
                <div className="pt-2 space-y-2.5">
                  <a
                    href={companyData.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('conteudo')}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Direto</span>
                  </a>
                  <a
                    href="#orcamento"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <span>Solicitar Cotação B2B</span>
                  </a>
                </div>
              </div>

              {/* Categorias & Soluções */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5E7EB] space-y-4">
                <h4 className="font-serif text-base font-bold text-[#0B1220]">
                  Soluções Fabricadas em PRFV
                </h4>
                <ul className="space-y-2 text-xs">
                  <li>
                    <Link
                      to="/esculturas-em-fibra-de-vidro"
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F7F8FA] text-[#334155] hover:text-[#2A5FA5] transition-colors"
                    >
                      <span className="font-medium">Esculturas e Animais Realistas</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cenografia-em-fibra-de-vidro"
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F7F8FA] text-[#334155] hover:text-[#2A5FA5] transition-colors"
                    >
                      <span className="font-medium">Cenografia para Eventos & Shoppings</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pecas-sazonais-em-fibra-de-vidro"
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F7F8FA] text-[#334155] hover:text-[#2A5FA5] transition-colors"
                    >
                      <span className="font-medium">Peças Sazonais (Páscoa e Natal)</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/pecas-tecnicas-em-fibra-de-vidro"
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#F7F8FA] text-[#334155] hover:text-[#2A5FA5] transition-colors"
                    >
                      <span className="font-medium">Peças Técnicas e Carenagens Industriais</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                </ul>
              </div>

            </aside>

          </div>

          {/* Silo Interlink Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="py-16 mt-16 border-t border-[#E5E7EB]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                    Cluster de Conhecimento em Fibra de Vidro
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220] mt-1">
                    Continue explorando nosso Silo Técnico
                  </h3>
                </div>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#2A5FA5] hover:text-[#1E4680]"
                >
                  <span>Ver todos os artigos</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((r) => (
                  <Link
                    key={r.id}
                    to={`/blog/${r.slug}`}
                    className="p-5 rounded-2xl border border-[#E5E7EB] bg-white hover:border-[#2A5FA5] hover:shadow-md transition-all block group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="aspect-16/10 rounded-xl overflow-hidden bg-[#F7F8FA]">
                        <img
                          src={r.image}
                          alt={r.alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#2A5FA5] uppercase">
                        {r.category}
                      </span>
                      <h4 className="font-serif text-base font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors line-clamp-2">
                        {r.title}
                      </h4>
                      <p className="text-xs text-[#64748B] line-clamp-2">
                        {r.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-[#2A5FA5] font-semibold mt-4 pt-3 border-t border-[#F1F5F9]">
                      <span>Ler artigo completo</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>

      <BudgetFormSection defaultService={`Artigo: ${post.title}`} />
    </>
  );
}
