/**
 * Constantes globales de INOX E-Commerce
 */

/** Nombre de la marca */
export const BRAND_NAME = 'INOX';

/** URL del sitio */
export const SITE_URL = 'https://inox.com.ar';

/** Instagram handle */
export const INSTAGRAM_HANDLE = '@inox.ar';
export const INSTAGRAM_URL = 'https://instagram.com/inox.ar';

/** Moneda */
export const CURRENCY_CODE = 'ARS';
export const CURRENCY_SYMBOL = '$';

/** Umbral de envío gratis (en centavos para evitar problemas de punto flotante) */
export const FREE_SHIPPING_THRESHOLD = 15900000; // $159.000,00

/** Expiración de orden por transferencia bancaria (en horas) */
export const TRANSFER_EXPIRATION_HOURS = 72;

/** Rate limiting */
export const RATE_LIMITS = {
  login: { maxRequests: 5, windowMs: 60_000 },
  register: { maxRequests: 3, windowMs: 60_000 },
  checkout: { maxRequests: 10, windowMs: 60_000 },
  api: { maxRequests: 100, windowMs: 60_000 },
} as const;

/** Formato de número de pedido */
export const ORDER_NUMBER_PREFIX = 'INX';
