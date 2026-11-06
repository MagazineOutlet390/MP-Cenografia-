import { Award, ShieldCheck, Factory, Users, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEO } from '../components/SEO';
import { ProcessSection } from '../components/ProcessSection';
import { WhereWeAreSection } from '../components/WhereWeAreSection';
import { BudgetFormSection } from '../components/BudgetFormSection';
import { companyData } from '../data/company';

export function SobrePage() {
  const pillars = [
    {
      icon: Award,
      title: '+18 Anos de Tradição Fabril',
      description: 'Mais de uma década e meia aperfeiçoando processos de laminação manual e sob vácuo em compósitos de fibra de vidro.',
    },
    {
      icon: Factory,
      title: 'Infraestrutura Produtiva',
      description: 'Galpão estruturado para modelagem 3D, matrizaria, laminação, estufas de cura e cabine de pintura automotiva.',
    },
    {
      icon: ShieldCheck,
      title: 'Rigor Técnico e Segurança',
      description: 'Uso de matérias-primas de procedência, resinas antichamas e ferragens estruturais sob cálculo estático.',
    },
    {
      icon: Users,
      title: 'Equipe Multidisciplinar',
      description: 'União entre artistas escultores, modeladores digitais, laminadores experientes e suporte de engenharia.',
    },
  ];

  return (
    <>
      <SEO
        title="Sobre a MP Cenografia | Fabricante de Fibra de Vidro e Cenografia"
        description="Conheça a história, infraestrutura e capacidade fabril da MP Cenografia. Mais de 18 anos produzindo peças sob encomenda com rigor técnico e acabamento premium."
        canonicalPath="/sobre"
      />

      <div className="pt-24 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Breadcrumbs items={[{ label: 'Sobre' }]} />

          {/* Institutional Hero */}
          <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                Institucional & História
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
                Engenharia de compósitos aliada à arte escultural.
              </h1>
              <p className="text-base sm:text-lg text-[#2A5FA5] font-medium leading-relaxed">
                A MP Cenografia nasceu com o propósito de viabilizar peças tridimensionais que desafiam o convencional em dimensões, resistência e acabamento.
              </p>
              <div className="space-y-4 text-sm sm:text-base text-[#64748B] leading-relaxed">
                <p>
                  Com mais de 18 anos de atuação consolidada, construímos uma trajetória pautada pela confiança de grandes empresas, centros comerciais, agências de live marketing e indústrias. Fabricamos desde carenagens industriais de alta precisão até esculturas anatômicas em escala 1:1 e cenografias monumentais para festivais.
                </p>
                <p>
                  Nossa filosofia de produção não trata a fibra de vidro como mero material sintético, mas como um compósito nobre capaz de proporcionar extrema durabilidade, imunidade a intempéries e leveza estrutural única.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#E5E7EB] bg-[#F7F8FA] p-8 shadow-xs space-y-6">
                <div className="border-b border-[#E5E7EB] pb-4">
                  <span className="font-mono text-3xl font-bold text-[#2A5FA5]">{companyData.yearsOfExperience}</span>
                  <p className="text-xs text-[#64748B] mt-1 font-medium">De dedicação contínua à fabricação de peças sob encomenda</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#0B1220]">Atendimento consultivo e dimensionamento técnico</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#0B1220]">Modelos sob medida a partir de 3D, fotos ou croquis</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#0B1220]">Acabamentos especiais com pintura automotiva e proteção UV</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#2A5FA5] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#0B1220]">Logística com peças modulares bipartidas para acesso restrito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars */}
          <div className="py-16 border-t border-[#E5E7EB]">
            <div className="max-w-3xl space-y-3 mb-12">
              <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
                Pilares Institucionais
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220] tracking-tight">
                Nossos diferenciais de fabricação.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.title} className="p-6 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#E5E7EB] flex items-center justify-center text-[#2A5FA5]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#0B1220]">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Process */}
      <ProcessSection />

      {/* Where We Are */}
      <WhereWeAreSection />

      {/* Budget Form */}
      <BudgetFormSection />
    </>
  );
}
