import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { getGoogleReviews } from '../lib/reviews';
import { GoogleReview } from '../types';
import { companyData } from '../data/company';

export function GoogleReviews() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getGoogleReviews().then((data) => setReviews(data));
  }, []);

  const nextReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }
  };

  const prevReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    }
  };

  return (
    <section className="py-20 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-3">
            <div className="inline-flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span className="text-xs font-semibold tracking-wider text-[#64748B] uppercase">
                Avaliações no Google
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1220] title-shimmer tracking-tight">
              A confiança de quem produz conosco.
            </h2>
            <p className="text-xs text-[#94A3B8]">
              [Seção configurada para sincronização com o Perfil da Empresa no Google Meu Negócio]
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={companyData.googleMapsProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#2A5FA5] hover:text-[#1E4680] border border-[#E5E7EB] hover:border-[#2A5FA5] rounded-lg transition-colors bg-white shadow-2xs"
            >
              <span>Ver todas as avaliações no Google</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Carousel navigation buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevReview}
                aria-label="Avaliação anterior"
                className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#0B1220] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextReview}
                aria-label="Próxima avaliação"
                className="p-2 rounded-lg border border-[#E5E7EB] hover:bg-[#F7F8FA] text-[#0B1220] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review, idx) => (
            <div
              key={review.id}
              className={`p-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] flex flex-col justify-between space-y-4 transition-all duration-200 hover:shadow-sm ${
                idx === currentIndex ? 'ring-1 ring-[#2A5FA5]' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#94A3B8]">
                    {review.relativeTime}
                  </span>
                </div>

                <p className="text-sm text-[#0B1220] italic leading-relaxed">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0B1220]">
                    {review.authorName}
                  </h4>
                  <span className="text-[10px] text-[#64748B]">
                    Cliente Verificado
                  </span>
                </div>
                <span className="text-[10px] font-mono font-medium text-[#2A5FA5]">Google</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
