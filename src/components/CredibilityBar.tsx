import { Award, Zap, Building2 } from 'lucide-react';

export function CredibilityBar() {
  const differentials = [
    {
      icon: Award,
      title: '+18 anos de mercado',
      description: 'Experiência comprovada na fabricação artesanal e industrial em PRFV.',
    },
    {
      icon: Zap,
      title: 'Atendimento ágil',
      description: 'Resposta rápida para orçamentos e consultoria técnica de projeto.',
    },
    {
      icon: Building2,
      title: 'Projetos para grandes empresas',
      description: 'Capacidade fabril preparada para shopping centers, indústrias e eventos.',
    },
  ];

  return (
    <section className="bg-[#F7F8FA] border-y border-[#E5E7EB] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E5E7EB]">
          {differentials.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`flex items-start gap-4 ${
                  index === 0 ? 'pb-6 md:pb-0 md:pr-8' : index === 1 ? 'py-6 md:py-0 md:px-8' : 'pt-6 md:pt-0 md:pl-8'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center shrink-0 text-[#2A5FA5]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-[#0B1220] tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
