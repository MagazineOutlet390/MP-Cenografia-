import { MapPin, Phone, Mail, Clock, ArrowUpRight, Navigation } from 'lucide-react';
import { companyData } from '../data/company';

interface WhereWeAreSectionProps {
  className?: string;
}

export function WhereWeAreSection({ className = '' }: WhereWeAreSectionProps) {
  return (
    <section className={`py-20 lg:py-28 bg-[#FFFFFF] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Official Contact & Company Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              Localização & Atendimento
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
              Onde estamos.
            </h2>

            <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
              Estrutura fabril com logística integrada para atendimento corporativo em todo o Brasil.
              Venha tomar um café ou alinhe sua demanda com nossos técnicos.
            </p>

            <div className="space-y-4 pt-2 border-t border-[#E5E7EB]">
              {/* Company Name & Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-[#0B1220]">
                    {companyData.name}
                  </h3>
                  <p className="text-xs font-medium text-[#0B1220] mt-0.5">
                    {companyData.address.street} - {companyData.address.neighborhood}
                  </p>
                  <p className="text-xs text-[#64748B]">
                    {companyData.address.city} - {companyData.address.state}, CEP {companyData.address.zipCode}
                  </p>
                  <p className="text-[11px] text-[#94A3B8] mt-1">
                    {companyData.address.note}
                  </p>
                </div>
              </div>

              {/* Telephone & WhatsApp */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#0B1220]">Telefone e WhatsApp</p>
                  <a
                    href={companyData.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#2A5FA5] hover:underline"
                  >
                    {companyData.whatsappFormatted}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#0B1220]">E-mail Corporativo</p>
                  <a
                    href={`mailto:${companyData.email}`}
                    className="text-xs text-[#2A5FA5] hover:underline"
                  >
                    {companyData.email}
                  </a>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#0B1220]">Horário de Atendimento</p>
                  <p className="text-xs text-[#64748B]">{companyData.openingHours}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={companyData.googleMapsDirectionsUrl || companyData.googleMapsProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2A5FA5] hover:bg-[#1E4680] rounded-lg transition-colors shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Como chegar</span>
              </a>

              <a
                href={companyData.googleMapsProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-[#0B1220] bg-white border border-[#E5E7EB] hover:bg-[#F7F8FA] rounded-lg transition-colors shadow-2xs"
              >
                <span>Ver avaliações no Google</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
              </a>
            </div>
          </div>

          {/* Right Column: Embedded Responsive Google Maps iframe */}
          <div className="lg:col-span-7">
            <div className="relative w-full h-[380px] sm:h-[440px] rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs bg-[#F7F8FA]">
              <iframe
                title="Mapa de Localização da MP Cenografia no Google Maps"
                src={companyData.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full filter saturate-90 contrast-95"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
