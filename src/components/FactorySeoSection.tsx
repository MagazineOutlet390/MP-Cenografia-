import { Link } from 'react-router-dom';
import { ArrowRight, Factory, Sparkles, Shield, Wrench } from 'lucide-react';

export function FactorySeoSection() {
  const pillars = [
    {
      icon: Factory,
      title: 'Fábrica Estruturada',
      description: 'Estrutura fabril capacitada para grandes tiragens e peças de grande porte em PRFV.',
    },
    {
      icon: Sparkles,
      title: 'Esculturas Personalizadas',
      description: 'Modelagem anatômica e artística com riqueza de detalhes e fidelidade volumétrica.',
    },
    {
      icon: Shield,
      title: 'Alta Resistência e Performance',
      description: 'Peças imunes à corrosão e intempéries, preparadas para ambientes externos severos.',
    },
    {
      icon: Wrench,
      title: 'Peças Técnicas e Carenagens',
      description: 'Precisão milimétrica e atendimento rigoroso a desenhos técnicos industriais.',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FFFFFF] border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Editorial SEO Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              Fábrica de Fibra de Vidro & Cenografia
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#0B1220] title-shimmer tracking-tight leading-[1.2]">
              Fabricação de peças em fibra de vidro e projetos cenográficos personalizados.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#64748B] leading-relaxed">
              <p>
                A <strong className="text-[#0B1220] font-semibold">MP Cenografia</strong> atua como <strong className="text-[#0B1220] font-semibold">fábrica de fibra de vidro</strong> especializada no desenvolvimento sob medida de peças personalizadas, esculturas de alto impacto visual e elementos cenográficos para projetos comerciais, corporativos e industriais.
              </p>
              <p>
                Da concepção e modelagem tridimensional à laminação estrutural em compósito PRFV (Plástico Reforçado com Fibra de Vidro), cada projeto é executado considerando suas características técnicas particulares, dimensões, rigidez mecânica, acabamento superficial com pintura automotiva e finalidade de utilização — seja para áreas internas de shopping centers e estandes, seja para exposição permanente ao sol e chuva.
              </p>
              <p>
                Com processos fabris rigorosos, atendemos agências de live marketing, produtoras de eventos, administradoras de shopping centers, indústrias e prefeituras em todo o território nacional que demandam precisão de cronograma e excelência estética.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/contato#orcamento"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#2A5FA5] hover:bg-[#1E4680] rounded-lg transition-colors shadow-xs"
              >
                <span>Solicitar orçamento com a fábrica</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/sobre"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B1220] hover:text-[#2A5FA5] transition-colors py-2"
              >
                <span>Conhecer nossa infraestrutura</span>
                <ArrowRight className="w-4 h-4 text-[#64748B]" />
              </Link>
            </div>
          </div>

          {/* Pillars & Technical Specs */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-6 sm:p-8 space-y-6">
              <div className="border-b border-[#E5E7EB] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#0B1220]">
                  Por que escolher a nossa fábrica?
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Engenharia e arte integradas para projetos corporativos e cenográficos
                </p>
              </div>

              <div className="space-y-4">
                {pillars.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#2A5FA5] shrink-0 mt-0.5 shadow-2xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#0B1220]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#64748B] leading-relaxed mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] text-xs text-[#2A5FA5] font-medium flex items-center justify-between">
                <span>Atendimento B2B & Sob Encomenda</span>
                <span className="font-mono text-[11px] text-[#64748B]">São Paulo · Brasil</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
