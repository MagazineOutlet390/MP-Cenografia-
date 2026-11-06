import { ClipboardCheck, Layers, Cog, Truck } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      step: '01',
      title: 'Briefing',
      icon: ClipboardCheck,
      description: 'Entendimento detalhado das necessidades, aplicação, dimensões, local de exposição e objetivos estéticos ou funcionais do projeto.',
    },
    {
      step: '02',
      title: 'Projeto e molde',
      icon: Layers,
      description: 'Planejamento técnico, desenho 3D, engenharia de laminação e desenvolvimento das matrizes e moldes específicos.',
    },
    {
      step: '03',
      title: 'Fabricação',
      icon: Cog,
      description: 'Produção personalizada da peça em compósito PRFV com controle de peso, resistência mecânica, acabamento e cura controlada.',
    },
    {
      step: '04',
      title: 'Entrega e instalação',
      icon: Truck,
      description: 'Finalização estética com pintura automotiva e entrega técnica, com possibilidade de acompanhamento de montagem conforme o escopo contratado.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#F7F8FA] border-y border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
            Metodologia & Precisão
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
            Como desenvolvemos seu projeto.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Processo fabril estruturado para assegurar fidelidade dimensional, acabamento impecável
            e previsibilidade de entrega.
          </p>
        </div>

        {/* 4 Connected Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="relative flex flex-col space-y-4">
                {/* Horizontal connector line on desktop */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-[calc(100%-1rem)] w-[calc(2rem+1rem)] h-[1px] bg-[#CBD5E1] z-0"
                    aria-hidden="true"
                  />
                )}

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center text-[#2A5FA5] shadow-2xs font-mono font-bold text-sm shrink-0">
                    <Icon className="w-5 h-5 text-[#2A5FA5]" />
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2A5FA5] bg-[#EBF3FB] px-2 py-0.5 rounded-sm">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#0B1220]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E7EB] text-xs text-[#64748B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p>
            * Observação: O suporte presencial de instalação e ancoragem é disponibilizado sob consulta de acordo com as exigências técnicas de cada projeto.
          </p>
          <span className="shrink-0 text-[#2A5FA5] font-medium">Controle de Qualidade em PRFV</span>
        </div>

      </div>
    </section>
  );
}
