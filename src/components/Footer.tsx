import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ExternalLink, ArrowUpRight } from 'lucide-react';
import { companyData } from '../data/company';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FFFFFF] border-t border-[#E5E7EB] text-[#0B1220] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5E7EB]">
          {/* Brand info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-baseline gap-2 inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight text-[#0B1220]">
                MP
              </span>
              <span className="text-xs font-semibold tracking-widest text-[#64748B] uppercase">
                CENOGRAFIA
              </span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-sm">
              Fabricação personalizada e consultoria técnica especializada em peças de fibra de vidro,
              esculturas de alto impacto, cenografia para eventos e peças técnicas industriais.
            </p>
            <div className="pt-2 text-xs text-[#64748B] space-y-1">
              <p className="font-medium text-[#0B1220]">Atendimento B2B & Corporativo</p>
              <p>Projetos sob medida para indústrias, agências, produtoras e shoppings.</p>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#0B1220] uppercase font-sans">
              Soluções
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <Link
                  to="/esculturas-em-fibra-de-vidro"
                  className="hover:text-[#2A5FA5] transition-colors"
                >
                  Esculturas em Fibra
                </Link>
              </li>
              <li>
                <Link
                  to="/cenografia-em-fibra-de-vidro"
                  className="hover:text-[#2A5FA5] transition-colors"
                >
                  Cenografia em Fibra
                </Link>
              </li>
              <li>
                <Link
                  to="/pecas-sazonais-em-fibra-de-vidro"
                  className="hover:text-[#2A5FA5] transition-colors"
                >
                  Peças Sazonais (Páscoa, Natal, Carnaval)
                </Link>
              </li>
              <li>
                <Link
                  to="/pecas-tecnicas-em-fibra-de-vidro"
                  className="hover:text-[#2A5FA5] transition-colors"
                >
                  Peças Técnicas Industriais
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#0B1220] uppercase font-sans">
              Institucional
            </h4>
            <ul className="space-y-2 text-sm text-[#64748B]">
              <li>
                <Link to="/" className="hover:text-[#2A5FA5] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-[#2A5FA5] transition-colors">
                  Portfólio de Projetos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#2A5FA5] transition-colors">
                  Blog e Conhecimento Técnico
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-[#2A5FA5] transition-colors">
                  Sobre a Empresa
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-[#2A5FA5] transition-colors">
                  Contato e Localização
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-[#0B1220] uppercase font-sans">
              Fale Conosco
            </h4>
            <div className="space-y-2 text-sm text-[#64748B]">
              <a
                href={companyData.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#2A5FA5] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#2A5FA5] shrink-0" />
                <span>{companyData.whatsappFormatted}</span>
              </a>
              <a
                href={`mailto:${companyData.email}`}
                className="flex items-center gap-2 hover:text-[#2A5FA5] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#2A5FA5] shrink-0" />
                <span className="truncate">{companyData.email}</span>
              </a>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-[#2A5FA5] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="text-[#0B1220] font-medium">{companyData.address.street}</p>
                  <p>{companyData.address.neighborhood}, {companyData.address.city} - {companyData.address.state}</p>
                  <p className="text-[11px] text-[#94A3B8]">CEP {companyData.address.zipCode}</p>
                </div>
              </div>
              <a
                href={companyData.googleMapsDirectionsUrl || companyData.googleMapsProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#2A5FA5] hover:underline pt-1"
              >
                <span>Ver no Google Maps (Como chegar)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© {currentYear} MP Cenografia. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <Link to="/contato" className="hover:text-[#0B1220] transition-colors">
              Solicitar Orçamento
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-[#94A3B8]">Fabricação sob medida em PRFV</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
