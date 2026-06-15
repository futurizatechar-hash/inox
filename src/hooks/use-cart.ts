/**
 * Hook custom para el carrito de compras
 *
 * Wrapper sobre el Zustand store que agrega lógica adicional.
 */

import { useCartStore } from '@/store/cart-store';

export function useCart() {
  const store = useCartStore();

  return {
    ...store,
    itemCount: store.totalItems(),
    cartSubtotal: store.subtotal(),
    isEmpty: store.items.length === 0,
  };
}
