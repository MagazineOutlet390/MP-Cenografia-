import { Link } from 'react-router-dom';
import { MessageCircle, ArrowRight, Star } from 'lucide-react';
import { HeroTypewriter } from './HeroTypewriter';
import { companyData } from '../data/company';

export function Hero() {
  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Identifier */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#64748B] uppercase">
              <span className="text-[#2A5FA5]">01</span>
              <span className="text-[#CBD5E1]">/</span>
              <span>MP CENOGRAFIA</span>
            </div>

            {/* Static H1 for immediate SEO and zero layout shift with subtle metallic Shimmer */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#0B1220] title-shimmer tracking-tight leading-[1.15] text-balance">
              Peças em fibra de vidro que ganham vida e alta performance.
            </h1>

            {/* Typewriter rotating keywords */}
            <HeroTypewriter />

            {/* Institutional Paragraph */}
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-2xl">
              Fabricação personalizada e consultoria técnica para transformar conceitos complexos
              em soluções industriais versáteis e de alta performance.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href={companyData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#2A5FA5] hover:bg-[#1E4680] rounded-lg shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A5FA5]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Falar no WhatsApp</span>
              </a>

              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#0B1220] bg-[#FFFFFF] hover:bg-[#F7F8FA] border border-[#E5E7EB] hover:border-[#CBD5E1] rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-[#2A5FA5]"
              >
                <span>Ver portfólio</span>
                <ArrowRight className="w-4 h-4 text-[#64748B]" />
              </Link>
            </div>
          </div>

          {/* Right Column (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary Card */}
              <div className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] shadow-md transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/4.5] sm:aspect-[4/4.5] w-full bg-[#F1F5F9] overflow-hidden">
                  <img
                    src="/assets/aistudio/1793993010240_34b5d8e0.jpg"
                    alt="Escultura de cavalo em fibra de vidro em escala real com pintura artística contemporânea fabricada pela MP Cenografia"
                    width={896}
                    height={1195}
                    className="w-full h-full object-cover object-[center_20%] transition-transform duration-500 hover:scale-105"
                    loading="eager"
                  />
                  {/* Subtle caption bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                    <p className="text-xs font-semibold tracking-wide">Escultura em Escala Real</p>
                    <p className="text-[11px] text-slate-200">Laminação anatômica em fibra de vidro PRFV</p>
                  </div>
                </div>
              </div>

              {/* Floating Google Reviews Element */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white rounded-xl border border-[#E5E7EB] p-3.5 shadow-lg flex items-center gap-3 z-10 animate-in fade-in duration-300">
                <div className="w-9 h-9 rounded-full bg-[#F7F8FA] flex items-center justify-center border border-[#E5E7EB] shrink-0">
                  {/* Google 'G' stylized representation */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-[#0B1220] mt-0.5">
                    Avaliações no Google
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
