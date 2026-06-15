/**
 * Tipos de Envío
 */
export type ShippingCarrier = 'andreani' | 'oca' | 'correo_argentino';

export interface ShippingQuote {
  carrier: ShippingCarrier;
  carrierName: string;
  serviceType: string; // "estándar", "express", "sucursal"
  price: number; // en centavos
  estimatedDays: {
    min: number;
    max: number;
  };
  isFree: boolean;
}

export interface ShippingAddress {
  street: string;
  number: string;
  floor?: string;
  apartment?: string;
  city: string;
  province: string;
  zipCode: string;
}
