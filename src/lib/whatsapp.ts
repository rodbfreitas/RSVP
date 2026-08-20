import { phoneForWaLink } from "./phone";

/**
 * Gera um link wa.me com mensagem pré-preenchida, corretamente
 * URL-encoded (Prompt Mestre §WhatsApp — MVP).
 */
export function buildWaShareLink(message: string, phone?: string): string {
  const base = phone
    ? `https://wa.me/${phoneForWaLink(phone)}`
    : "https://wa.me/";
  const params = new URLSearchParams({ text: message });
  return `${base}?${params.toString()}`;
}
