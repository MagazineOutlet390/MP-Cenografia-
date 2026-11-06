import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { companyData } from '../data/company';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsDropdownOpen, setIsSolutionsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSolutionsDropdownOpen(false);
  }, [location.pathname]);

  const solutions = [
    { name: 'Esculturas em Fibra de Vidro', path: '/esculturas-em-fibra-de-vidro' },
    { name: 'Cenografia em Fibra de Vidro', path: '/cenografia-em-fibra-de-vidro' },
    { name: 'Peças Sazonais (Páscoa, Carnaval, Natal)', path: '/pecas-sazonais-em-fibra-de-vidro' },
    { name: 'Peças Técnicas em Fibra de Vidro', path: '/pecas-tecnicas-em-fibra-de-vidro' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isSolutionActive = solutions.some((s) => s.path === location.pathname);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#FFFFFF]/95 backdrop-blur-md shadow-xs border-b border-[#E5E7EB]'
          : 'bg-[#FFFFFF] border-b border-[#E5E7EB]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark (MP in serif, CENOGRAFIA complement) */}
          <Link
            to="/"
            className="flex items-baseline gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#2A5FA5] rounded-sm"
          >
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1220] group-hover:text-[#2A5FA5] transition-colors">
              MP
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[#64748B] uppercase">
              CENOGRAFIA
            </span>
          </Link>

          {/* Zone 2: Primary Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#0B1220]">
            <Link
              to="/"
              className={`transition-colors whitespace-nowrap hover:text-[#2A5FA5] ${
                isActive('/') ? 'text-[#2A5FA5] font-semibold' : 'text-[#0B1220]'
              }`}
            >
              Início
            </Link>

            {/* Soluções Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsSolutionsDropdownOpen(true)}
              onMouseLeave={() => setIsSolutionsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap hover:text-[#2A5FA5] cursor-pointer py-2 ${
                  isSolutionActive ? 'text-[#2A5FA5] font-semibold' : 'text-[#0B1220]'
                }`}
                onClick={() => setIsSolutionsDropdownOpen(!isSolutionsDropdownOpen)}
                aria-expanded={isSolutionsDropdownOpen}
              >
                <span>Soluções</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isSolutionsDropdownOpen ? 'rotate-180 text-[#2A5FA5]' : 'text-[#64748B]'
                  }`}
                />
              </button>

              {isSolutionsDropdownOpen && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {solutions.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`block px-4 py-2.5 text-xs sm:text-sm transition-colors hover:bg-[#F7F8FA] hover:text-[#2A5FA5] ${
                        isActive(item.path) ? 'text-[#2A5FA5] font-medium bg-[#F7F8FA]' : 'text-[#0B1220]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              className={`transition-colors whitespace-nowrap hover:text-[#2A5FA5] ${
                isActive('/portfolio') ? 'text-[#2A5FA5] font-semibold' : 'text-[#0B1220]'
              }`}
            >
              Portfólio
            </Link>

            <Link
              to="/blog"
              className={`transition-colors whitespace-nowrap hover:text-[#2A5FA5] ${
                isActive('/blog') ? 'text-[#2A5FA5] font-semibold' : 'text-[#0B1220]'
              }`}
            >
              Blog
            </Link>

            <Link
              to="/sobre"
              className={`transition-colors whitespace-nowrap hover:text-[#2A5FA5] ${
                isActive('/sobre') ? 'text-[#2A5FA5] font-semibold' : 'text-[#0B1220]'
              }`}
            >
              Sobre
            </Link>

            <Link
              to="/contato"
              className={`transition-colors whitespace-nowrap hover:text-[#2A5FA5] ${
                isActive('/contato') ? 'text-[#2A5FA5] font-semibold' : 'text-[#0B1220]'
              }`}
            >
              Contato
            </Link>
          </nav>

          {/* Zone 3: Primary Action CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <Link
              to="/contato#orcamento"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#2A5FA5] hover:bg-[#1E4680] active:scale-[0.99] rounded-lg transition-all shadow-xs whitespace-nowrap"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#0B1220] hover:text-[#2A5FA5] hover:bg-[#F7F8FA] rounded-md transition-colors"
              aria-label={isMobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E5E7EB] bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            className={`block py-2 text-base font-medium ${isActive('/') ? 'text-[#2A5FA5]' : 'text-[#0B1220]'}`}
          >
            Início
          </Link>

          <div className="py-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#64748B] mb-2">
              Soluções Especializadas
            </div>
            <div className="space-y-2 pl-3 border-l-2 border-[#E5E7EB]">
              {solutions.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-1 text-sm ${isActive(item.path) ? 'text-[#2A5FA5] font-medium' : 'text-[#0B1220]'}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            to="/portfolio"
            className={`block py-2 text-base font-medium ${isActive('/portfolio') ? 'text-[#2A5FA5]' : 'text-[#0B1220]'}`}
          >
            Portfólio
          </Link>

          <Link
            to="/blog"
            className={`block py-2 text-base font-medium ${isActive('/blog') ? 'text-[#2A5FA5]' : 'text-[#0B1220]'}`}
          >
            Blog
          </Link>

          <Link
            to="/sobre"
            className={`block py-2 text-base font-medium ${isActive('/sobre') ? 'text-[#2A5FA5]' : 'text-[#0B1220]'}`}
          >
            Sobre
          </Link>

          <Link
            to="/contato"
            className={`block py-2 text-base font-medium ${isActive('/contato') ? 'text-[#2A5FA5]' : 'text-[#0B1220]'}`}
          >
            Contato
          </Link>

          <div className="pt-3">
            <Link
              to="/contato#orcamento"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white bg-[#2A5FA5] rounded-lg shadow-xs"
            >
              <span>Solicitar orçamento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
