import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export function CorporateSection() {
  const highlights = [
    'Desenvolvimento personalizado conforme especificação e CAD',
    'Acompanhamento técnico e suporte de engenharia na fabricação',
    'Planejamento de fabricação para cumprimento estrito de cronogramas',
    'Atendimento focado em agências, shoppings, prefeituras e indústrias',
    'Comunicação contínua com relatórios de status em cada etapa',
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F8FA] border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
              B2B & Grandes Contas
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
              Estrutura e experiência para projetos de maior escala.
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Desenvolvemos peças personalizadas em fibra de vidro para empresas, indústrias,
              agências de cenografia e produtores de eventos que precisam de soluções sob medida,
              acompanhamento técnico e atenção aos prazos de execução.
            </p>

            <div className="space-y-3 pt-2">
              {highlights.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-[#0B1220] leading-snug">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/contato#orcamento"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2A5FA5] hover:bg-[#1E4680] rounded-lg shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[#2A5FA5]"
              >
                <span>Solicitar proposta corporativa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 border border-[#E5E7EB] shadow-xs space-y-6">
              <div className="border-b border-[#E5E7EB] pb-4">
                <h3 className="font-serif text-xl font-bold text-[#0B1220]">
                  Capacidade Produtiva & Entrega
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Atendimento corporativo para projetos em todo o território nacional
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                  <p className="text-xs font-semibold text-[#2A5FA5] uppercase tracking-wider">
                    Processo Integrado
                  </p>
                  <p className="text-sm font-medium text-[#0B1220] mt-1">
                    Da matriz digital à peça física pronta para instalação cênica ou industrial.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F7F8FA] border border-[#E5E7EB]">
                  <p className="text-xs font-semibold text-[#2A5FA5] uppercase tracking-wider">
                    Logística & Embalagem
                  </p>
                  <p className="text-sm font-medium text-[#0B1220] mt-1">
                    Engradamento protetor sob medida e peças modulares para transporte seguro.
                  </p>
                </div>
              </div>

              {/* Reserved placeholder space for verified client logos */}
              <div className="pt-2 border-t border-[#E5E7EB]">
                <p className="text-[11px] font-medium text-[#64748B] text-center">
                  Espaço reservado para inserção de logotipos e clientes corporativos oficiais
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
