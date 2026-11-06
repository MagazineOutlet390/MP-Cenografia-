import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  customItems?: FAQItem[];
  title?: string;
  subtitle?: string;
}

export function FAQSection({
  customItems,
  title = 'Dúvidas frequentes sobre fabricação em fibra de vidro.',
  subtitle = 'Respostas diretas sobre processos sob encomenda, materiais, prazos e atendimento corporativo.',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const defaultQuestions: FAQItem[] = [
    {
      question: 'Quais tipos de peças podem ser fabricados em fibra de vidro?',
      answer: 'Fabricamos uma ampla variedade de produtos: esculturas figurativas e anatômicas de qualquer tamanho (como animais em escala 1:1 e mascotes), portais e cenografia modular para feiras e shopping centers, peças sazonais (para Páscoa, Carnaval e Natal) e peças técnicas industriais como carenagens de máquinas e dutos.',
    },
    {
      question: 'A MP Cenografia desenvolve peças personalizadas sob encomenda?',
      answer: 'Sim. Todo o nosso modelo de trabalho é baseado em desenvolvimento sob encomenda. A partir de um desenho, foto de referência, modelo 3D digital ou desenho técnico de engenharia, construímos a matriz e o molde específico para o seu projeto.',
    },
    {
      question: 'A empresa atende grandes empresas, indústrias e agências de eventos?',
      answer: 'Sim, possuímos estrutura fabril e equipe técnica experiente no atendimento a clientes corporativos de grande porte, agências de live marketing, produtoras de eventos, administradoras de shopping centers, indústrias e órgãos públicos.',
    },
    {
      question: 'Como funciona o processo para solicitar um orçamento?',
      answer: 'O primeiro contato pode ser feito diretamente pelo nosso formulário no site ou via WhatsApp oficial (+55 11 96649-9640). Nossa equipe técnica analisa os detalhes do projeto, orienta sobre a viabilidade em PRFV e apresenta uma proposta técnica e comercial clara.',
    },
    {
      question: 'Quais informações são necessárias para avaliar um projeto?',
      answer: 'Para fornecer uma estimativa precisa, é recomendável informar: dimensões aproximadas (altura, largura, profundidade), se a peça ficará em área interna ou externa, se haverá interação direta do público (como subir ou sentar) e se já existem arquivos 3D ou referências visuais.',
    },
  ];

  const items = customItems || defaultQuestions;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#F7F8FA] border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
            Esclarecimentos Técnicos
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            {subtitle}
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className="rounded-xl border border-[#E5E7EB] bg-white overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#0B1220] hover:text-[#2A5FA5] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#2A5FA5]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9] pt-4 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
