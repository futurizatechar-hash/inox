/**
 * Tipos de Pedido
 */
export type OrderStatus =
  | 'PENDING'
  | 'PENDING_TRANSFER'
  | 'PENDING_VERIFICATION'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type PaymentStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'IN_PROCESS'
  | 'REFUNDED'
  | 'CANCELLED'
  | 'EXPIRED';

export type PaymentMethod =
  | 'MERCADO_PAGO'
  | 'BANK_TRANSFER'
  | 'CASH_ON_DELIVERY';

export type ShippingMethod = 'STANDARD' | 'EXPRESS' | 'PICKUP';

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  shippingMethod?: ShippingMethod;
  shippingCarrier?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  createdAt: string;
}

export interface OrderItem {
  id: string;
  variantId: string;
  productName: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
}
