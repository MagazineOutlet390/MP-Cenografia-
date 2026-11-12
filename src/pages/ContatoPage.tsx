import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';
import { GoogleReviews } from '../components/GoogleReviews';
import { WhereWeAreSection } from '../components/WhereWeAreSection';
import { BudgetFormSection } from '../components/BudgetFormSection';
import { companyData } from '../data/company';
import { trackWhatsAppClick } from '../lib/gtm';

export function ContatoPage() {
  return (
    <>
      <SEO
        title="Contato e Orçamentos | MP Cenografia"
        description="Fale diretamente com os especialistas da MP Cenografia. Solicite propostas comerciais para esculturas, cenografia e peças técnicas em fibra de vidro."
        canonicalPath="/contato"
      />

      <div className="pt-24 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ label: 'Contato' }]} />

          <div className="py-8 max-w-3xl space-y-4">
            <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              Canais Oficiais de Atendimento
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight">
              Fale com a MP Cenografia.
            </h1>
            <p className="text-base text-[#64748B] leading-relaxed">
              Estamos preparados para orientar tecnicamente sua demanda de produção em fibra de vidro.
              Envie uma mensagem pelo WhatsApp ou preencha o formulário abaixo para receber uma análise preliminar.
            </p>
          </div>

          {/* Quick Contact Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            {/* WhatsApp */}
            <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#25D366] text-white flex items-center justify-center">
                <MessageCircle className="w-5 h-5 fill-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#0B1220]">
                  WhatsApp Direto
                </h3>
                <p className="text-xs text-[#64748B]">
                  Atendimento ágil para dúvidas técnicas e envio de arquivos de referência.
                </p>
              </div>
              <a
                href={companyData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('contato')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A5FA5] hover:underline"
              >
                <span>{companyData.whatsappFormatted}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email */}
            <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#2A5FA5] text-white flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#0B1220]">
                  E-mail Comercial
                </h3>
                <p className="text-xs text-[#64748B]">
                  Para envio de memoriais descritivos, editais e desenhos técnicos CAD.
                </p>
              </div>
              <a
                href={`mailto:${companyData.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2A5FA5] hover:underline"
              >
                <span>{companyData.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hours & Location */}
            <div className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-4">
              <div className="w-10 h-10 rounded-lg bg-[#0B1220] text-white flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#0B1220]">
                  Atendimento Fabril & Sede
                </h3>
                <p className="text-xs text-[#64748B]">
                  {companyData.openingHours}
                </p>
              </div>
              <div className="text-xs text-[#0B1220]">
                <p className="font-medium">{companyData.address.street} - {companyData.address.neighborhood}</p>
                <p className="text-[#64748B]">{companyData.address.city} - {companyData.address.state}, CEP {companyData.address.zipCode}</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Budget Form Section */}
      <BudgetFormSection />

      {/* Google Reviews */}
      <GoogleReviews />

      {/* Where We Are Section with Map */}
      <WhereWeAreSection />
    </>
  );
}
