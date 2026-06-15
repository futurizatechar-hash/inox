/**
 * Funciones utilitarias de INOX E-Commerce
 */

/**
 * Formatea un precio en centavos a formato ARS legible
 * @example formatPrice(15900000) → "$159.000,00"
 */
export function formatPrice(priceInCents: number): string {
  const amount = priceInCents / 100;
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Genera un número de pedido único
 * Formato: INX-2026-00001
 */
export function generateOrderNumber(sequentialId: number): string {
  const year = new Date().getFullYear();
  const paddedId = String(sequentialId).padStart(5, '0');
  return `INX-${year}-${paddedId}`;
}

/**
 * Genera un slug URL-friendly a partir de un string
 * @example slugify("Bacha CUORE Acero 304") → "bacha-cuore-acero-304"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric
    .replace(/\s+/g, '-') // Spaces to hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-|-$/g, ''); // Trim hyphens
}

/**
 * Trunca un string a la longitud indicada con "..."
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}

/**
 * Devuelve un class name condicional (alternativa ligera a clsx)
 */
export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(' ');
}
