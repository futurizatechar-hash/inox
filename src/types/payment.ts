/**
 * Tipos de Pago
 */
export interface PaymentPreference {
  preferenceId: string;
  orderId: string;
  initPoint: string; // URL de Mercado Pago
}

export interface BankTransferDetails {
  orderId: string;
  bankName: string;
  cbu: string;
  alias: string;
  holder: string;
  amount: number; // en centavos
  reference: string; // código de referencia único
  expiresAt: string;
}

export interface PaymentNotification {
  id: string;
  type: string;
  data: {
    id: string;
  };
}
