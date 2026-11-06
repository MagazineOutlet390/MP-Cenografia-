import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomePage } from './pages/HomePage';
import { EsculturasPage } from './pages/EsculturasPage';
import { CenografiaPage } from './pages/CenografiaPage';
import { PecasSazonaisPage } from './pages/PecasSazonaisPage';
import { PecasTecnicasPage } from './pages/PecasTecnicasPage';
import { PortfolioListPage } from './pages/PortfolioListPage';
import { PortfolioDetailPage } from './pages/PortfolioDetailPage';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { SobrePage } from './pages/SobrePage';
import { ContatoPage } from './pages/ContatoPage';
import { ArrowLeft } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="pt-36 pb-24 text-center min-h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 bg-white">
      <span className="font-mono text-xs font-bold text-[#2A5FA5] uppercase tracking-wider">
        Erro 404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1220]">
        Página não encontrada
      </h1>
      <p className="text-sm text-[#64748B] max-w-md">
        O endereço solicitado não existe ou foi remanejado. Navegue pelas opções do menu principal ou retorne ao início.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-[#2A5FA5] hover:bg-[#1E4680] rounded-lg transition-colors shadow-xs"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Ir para a Página Inicial</span>
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-[#0B1220]">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/esculturas-em-fibra-de-vidro" element={<EsculturasPage />} />
            <Route path="/cenografia-em-fibra-de-vidro" element={<CenografiaPage />} />
            <Route path="/pecas-sazonais-em-fibra-de-vidro" element={<PecasSazonaisPage />} />
            <Route path="/pecas-tecnicas-em-fibra-de-vidro" element={<PecasTecnicasPage />} />
            <Route path="/portfolio" element={<PortfolioListPage />} />
            <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/sobre" element={<SobrePage />} />
            <Route path="/contato" element={<ContatoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </BrowserRouter>
  );
}
