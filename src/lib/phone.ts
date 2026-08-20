/**
 * Máscara e utilitários de telefone brasileiro: (XX) XXXXX-XXXX
 * O telefone é o identificador principal do RSVP (PRD §13).
 */

/** Remove tudo que não for dígito. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Aplica a máscara (XX) XXXXX-XXXX enquanto o usuário digita. */
export function maskPhone(value: string): string {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Valida um telefone brasileiro (10 ou 11 dígitos, DDD válido). */
export function isValidPhone(value: string): boolean {
  const digits = onlyDigits(value);
  if (digits.length !== 10 && digits.length !== 11) return false;
  const ddd = Number(digits.slice(0, 2));
  if (ddd < 11 || ddd > 99) return false;
  return true;
}

/**
 * Normaliza o telefone para um formato canônico de armazenamento
 * (+55DDDNÚMERO, somente dígitos com prefixo do país), garantindo que
 * o mesmo número sempre produza a mesma chave — usado para
 * deduplicação (PRD §13).
 */
export function normalizePhone(value: string): string {
  let digits = onlyDigits(value);
  if (digits.startsWith("55") && digits.length > 11) {
    digits = digits.slice(2);
  }
  return `55${digits}`;
}

/** Formata um telefone normalizado (55DDXXXXXXXXX) para exibição. */
export function formatPhoneDisplay(normalized: string): string {
  const digits = normalized.startsWith("55")
    ? normalized.slice(2)
    : normalized;
  return maskPhone(digits);
}

/** Telefone pronto para link wa.me (somente dígitos, com código do país). */
export function phoneForWaLink(normalized: string): string {
  return onlyDigits(normalized);
}
