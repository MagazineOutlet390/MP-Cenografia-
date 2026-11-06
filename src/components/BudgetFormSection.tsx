import { useState } from 'react';
import {
  Send,
  MessageCircle,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Edit3,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';
import { companyData } from '../data/company';

interface BudgetFormSectionProps {
  id?: string;
  defaultService?: string;
}

// Ergonomic Brazilian Phone / WhatsApp Mask
function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length > 0 ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function BudgetFormSection({ id = 'orcamento', defaultService = '' }: BudgetFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    email: '',
    description: defaultService ? `Gostaria de solicitar orçamento para: ${defaultService}` : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [preparedUrl, setPreparedUrl] = useState('');
  const [rawMessage, setRawMessage] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // 1. Nome ou Razão Social
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Por favor, informe seu nome ou a razão social da sua empresa.';
    }

    // 2. WhatsApp com DDD
    const phoneDigits = formData.whatsapp.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 10) {
      newErrors.whatsapp = 'Por favor, informe um WhatsApp válido com DDD (mínimo de 10 dígitos).';
    }

    // 3. E-mail de Contato
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Por favor, insira um endereço de e-mail válido (ex: contato@empresa.com.br).';
    }

    // 4. Descrição da Peça ou Projeto
    if (!formData.description.trim() || formData.description.trim().length < 10) {
      newErrors.description = 'Descreva a peça, dimensões estimadas ou objetivo do projeto (mínimo de 10 caracteres).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.whatsapp;
        return copy;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    // Template oficial solicitado
    const message = `NOVA SOLICITAÇÃO DE ORÇAMENTO — MP CENOGRAFIA

Nome / Razão Social:
${formData.name.trim()}

WhatsApp do interessado:
${formData.whatsapp.trim()}

E-mail de contato:
${formData.email.trim()}

Descrição do projeto:
${formData.description.trim()}

Solicitação recebida pelo formulário de orçamento do site.`;

    const encoded = encodeURIComponent(message);
    const targetUrl = `https://wa.me/5511966499640?text=${encoded}`;

    setRawMessage(message);
    setPreparedUrl(targetUrl);
    setSubmitted(true);

    // Tenta abrir a conversa diretamente em nova aba/janela
    try {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch {
      // Caso bloqueado por restrição do navegador, o botão manual na tela de confirmação resolve
    }

    setTimeout(() => {
      setIsSubmitting(false);
    }, 400);
  };

  const handleCopyMessage = () => {
    if (!rawMessage) return;
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleResetForm = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      whatsapp: '',
      email: '',
      description: defaultService ? `Gostaria de solicitar orçamento para: ${defaultService}` : '',
    });
    setErrors({});
    setPreparedUrl('');
    setRawMessage('');
  };

  return (
    <section id={id} className="py-20 lg:py-28 bg-[#FFFFFF] border-t border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-12">
          <div className="text-xs font-semibold tracking-wider text-[#2A5FA5] uppercase">
            Atendimento Técnico & Orçamentos
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1220] title-shimmer tracking-tight leading-tight">
            Vamos desenvolver seu próximo projeto?
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            Conte um pouco sobre a peça que você precisa fabricar. As informações serão organizadas e encaminhadas diretamente para nossa equipe técnica no WhatsApp comercial.
          </p>
        </div>

        {/* Card do Formulário */}
        <div className="bg-[#F7F8FA] rounded-2xl border border-[#E5E7EB] p-8 sm:p-10 shadow-xs">
          {submitted ? (
            /* Tela de Confirmação & Redirecionamento Direto */
            <div className="text-center py-6 space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0B1220]">
                  Solicitação Pronta para Envio!
                </h3>
                <p className="text-sm sm:text-base text-[#64748B] max-w-lg mx-auto leading-relaxed">
                  Formatamos os detalhes do seu projeto para o WhatsApp comercial da <strong className="text-[#0B1220]">MP Cenografia (+55 11 96649-9640)</strong>.
                </p>
              </div>

              {/* Botão Principal de Ação */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={preparedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-bold uppercase tracking-wider rounded-xl shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Abrir Conversa no WhatsApp</span>
                  <ExternalLink className="w-4 h-4 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 border border-[#E5E7EB] bg-white hover:bg-slate-50 text-xs font-semibold text-[#0B1220] rounded-xl transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-600">Mensagem copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#64748B]" />
                      <span>Copiar texto formatado</span>
                    </>
                  )}
                </button>
              </div>

              {/* Visualização da Mensagem Gerada */}
              <div className="mt-6 text-left max-w-lg mx-auto bg-white rounded-xl border border-[#E5E7EB] p-4 text-xs font-mono text-[#334155] whitespace-pre-line shadow-2xs">
                <div className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#94A3B8] mb-2 pb-1 border-b border-[#F1F5F9]">
                  Mensagem estruturada pronta:
                </div>
                {rawMessage}
              </div>

              {/* Opções de Navegação e Não Perda de Dados */}
              <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748B]">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-1.5 font-semibold text-[#2A5FA5] hover:text-[#1E4680] transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Revisar ou alterar dados preenchidos</span>
                </button>
                <span aria-hidden="true" className="text-[#CBD5E1]">·</span>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="inline-flex items-center gap-1.5 hover:text-[#0B1220] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Limpar e iniciar novo orçamento</span>
                </button>
              </div>
            </div>
          ) : (
            /* Formulário Principal */
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Nome ou Razão Social */}
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-semibold text-[#0B1220]">
                    Nome ou Razão Social <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) {
                        setErrors((prev) => {
                          const copy = { ...prev };
                          delete copy.name;
                          return copy;
                        });
                      }
                    }}
                    placeholder="Ex: Amanda Silva ou Agência Live"
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-[#0B1220] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2A5FA5] transition-colors ${
                      errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-[#E5E7EB]'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* WhatsApp com DDD */}
                <div className="space-y-1.5">
                  <label htmlFor="whatsapp" className="block text-xs font-semibold text-[#0B1220]">
                    WhatsApp com DDD <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    required
                    value={formData.whatsapp}
                    onChange={handlePhoneChange}
                    placeholder="Ex: (11) 96649-9640"
                    className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-[#0B1220] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2A5FA5] transition-colors ${
                      errors.whatsapp ? 'border-rose-400 bg-rose-50/20' : 'border-[#E5E7EB]'
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.whatsapp}</span>
                    </p>
                  )}
                </div>

              </div>

              {/* E-mail de Contato */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-semibold text-[#0B1220]">
                  E-mail de Contato <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) {
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.email;
                        return copy;
                      });
                    }
                  }}
                  placeholder="Ex: contato@empresa.com.br"
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-[#0B1220] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2A5FA5] transition-colors ${
                    errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-[#E5E7EB]'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Descrição da Peça ou Projeto */}
              <div className="space-y-1.5">
                <label htmlFor="description" className="block text-xs font-semibold text-[#0B1220]">
                  Descrição da Peça ou Projeto <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors.description) {
                      setErrors((prev) => {
                        const copy = { ...prev };
                        delete copy.description;
                        return copy;
                      });
                    }
                  }}
                  placeholder="Descreva a peça, medidas estimadas, se o uso será interno ou externo, acabamento pretendido e prazos de entrega necessários."
                  className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-[#0B1220] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2A5FA5] transition-colors ${
                    errors.description ? 'border-rose-400 bg-rose-50/20' : 'border-[#E5E7EB]'
                  }`}
                />
                {errors.description && (
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>

              {/* Submit CTA & Transparência */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-semibold text-white bg-[#2A5FA5] hover:bg-[#1E4680] active:scale-[0.99] rounded-lg transition-all shadow-xs cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Preparando mensagem...' : 'Enviar solicitação de orçamento'}</span>
                </button>

                {/* Transparência e Privacidade Conforme Item 4 */}
                <div className="flex items-center gap-2 text-[11px] text-[#64748B] text-center sm:text-right max-w-sm">
                  <ShieldCheck className="w-4 h-4 text-[#2A5FA5] shrink-0 hidden sm:inline" />
                  <span>
                    Ao enviar, seus dados serão organizados e direcionados de forma transparente ao WhatsApp comercial da MP Cenografia para atendimento pela nossa equipe técnica.
                  </span>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
