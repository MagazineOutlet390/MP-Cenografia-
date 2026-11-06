import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function SolutionsSection() {
  const solutions = [
    {
      number: '01',
      title: 'Esculturas em Fibra de Vidro',
      description: 'Modelagem anatômica, réplicas em escala real de animais, mascotes 3D e esculturas artísticas para ativação de marcas e feiras.',
      path: '/esculturas-em-fibra-de-vidro',
      image: '/portfolio/IMG-20261030-WA0006_5a986442.jpg',
      alt: 'Escultura de boi em fibra de vidro em escala real com acabamento preto e branco',
    },
    {
      number: '02',
      title: 'Cenografia em Fibra de Vidro',
      description: 'Grandes estruturas cênicas, portais para festivais, fachadas temáticas e elementos suspensos modulares para shopping centers.',
      path: '/cenografia-em-fibra-de-vidro',
      image: '/portfolio/IMG-20261104-WA0037_49bdc396.jpg',
      alt: 'Estrutura cenográfica em fibra de vidro com escultura monumental de marlim azul em ondas',
    },
    {
      number: '03',
      title: 'Peças Sazonais em Fibra de Vidro',
      description: 'Peças monumentais para Páscoa (ovos gigantes e coelhos), Carnaval (carros alegóricos) e Natal (figuras iluminadas e Papai Noel).',
      path: '/pecas-sazonais-em-fibra-de-vidro',
      image: '/portfolio/IMG-20261104-WA0035_6752792b.jpg',
      alt: 'Esculturas temáticas lúdicas em fibra de vidro para áreas abertas e eventos',
    },
    {
      number: '04',
      title: 'Peças Técnicas em Fibra de Vidro',
      description: 'Carenagens de máquinas, painéis de isolamento térmico e acústico, cones de exaustão e componentes industriais resistentes à corrosão.',
      path: '/pecas-tecnicas-em-fibra-de-vidro',
      image: '/portfolio/IMG-20261104-WA0034_6750e301.jpg',
      alt: 'Peça técnica em compósito de fibra de vidro resistente a ambientes aquáticos e intempéries',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
            Capacidades Industriais & Artísticas
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
            Soluções em fibra de vidro para projetos que exigem mais.
          </h2>
          <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
            Da concepção à fabricação, desenvolvemos peças personalizadas para aplicações cenográficas,
            comerciais, sazonais e técnicas.
          </p>
        </div>

        {/* 4 Numbered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions.map((item) => (
            <Link
              key={item.number}
              to={item.path}
              className="group flex flex-col rounded-xl border border-[#E5E7EB] bg-white overflow-hidden hover:border-[#2A5FA5] transition-all duration-300 hover:shadow-md"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 w-full bg-[#F7F8FA] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#0B1220] font-mono text-xs font-bold px-2 py-0.5 rounded-sm shadow-xs">
                  {item.number}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#2A5FA5]">
                  <span>Conhecer solução</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
