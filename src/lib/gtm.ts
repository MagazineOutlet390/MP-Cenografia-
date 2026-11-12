/**
 * Utilitário de Rastreamento do Google Tag Manager (GTM-5CDLZ6V3)
 * Dispara eventos para o window.dataLayer sem envio de dados pessoais (PII).
 */

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

/**
 * Inicializador seguro do dataLayer no navegador
 */
export function getOrCreateDataLayer(): Array<Record<string, unknown>> {
  if (typeof window === 'undefined') {
    return [];
  }
  window.dataLayer = window.dataLayer || [];
  return window.dataLayer;
}

/**
 * Envia um payload seguro ao dataLayer
 */
export function pushToDataLayer(eventPayload: Record<string, unknown>): void {
  try {
    const dataLayer = getOrCreateDataLayer();
    dataLayer.push(eventPayload);
  } catch (error) {
    console.warn('[GTM dataLayer error]:', error);
  }
}

let lastWhatsAppClickTime = 0;
let lastLeadTime = 0;

/**
 * Evento: whatsapp_click
 * Registra cliques em botões e links que direcionam ao WhatsApp em qualquer página.
 * @param buttonLocation Identificador amigável da posição do botão ('hero', 'header', 'conteudo', 'footer', 'contato', 'flutuante')
 */
export function trackWhatsAppClick(buttonLocation: string): void {
  const now = Date.now();
  // Evita disparos duplicados para cliques acidentais rápidos
  if (now - lastWhatsAppClickTime < 350) {
    return;
  }
  lastWhatsAppClickTime = now;

  pushToDataLayer({
    event: 'whatsapp_click',
    button_location: buttonLocation,
  });
}

/**
 * Evento: generate_lead
 * Registra envio com validação completa do formulário de orçamento/contato.
 * Disparado antes do redirecionamento para o WhatsApp, estritamente sem dados pessoais.
 */
export function trackGenerateLead(): void {
  const now = Date.now();
  // Evita reenvio duplicado do evento em intervalo curto
  if (now - lastLeadTime < 1000) {
    return;
  }
  lastLeadTime = now;

  pushToDataLayer({
    event: 'generate_lead',
  });
}
