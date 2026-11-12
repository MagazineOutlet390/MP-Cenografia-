import { MessageCircle } from 'lucide-react';
import { companyData } from '../data/company';
import { trackWhatsAppClick } from '../lib/gtm';

export function WhatsAppFloatingButton() {
  return (
    <a
      href={companyData.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppClick('flutuante')}
      aria-label="Falar com a MP Cenografia pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-medium text-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] group"
    >
      <MessageCircle className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline font-sans text-xs tracking-wide font-semibold">
        Falar no WhatsApp
      </span>
    </a>
  );
}
