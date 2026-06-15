'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/Button/Button';
import { QuantitySelector } from '@/components/ui/QuantitySelector/QuantitySelector';
import { clsx } from 'clsx';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, items, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Prevenir scroll en el body cuando el drawer está abierto
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div 
        className={clsx(styles.overlay, { [styles.open]: isDrawerOpen })} 
        onClick={closeDrawer} 
      />
      <aside className={clsx(styles.drawer, { [styles.open]: isDrawerOpen })}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <ShoppingBag size={20} />
            Tu Carrito
          </h2>
          <button className={styles.closeButton} onClick={closeDrawer}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.body}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <ShoppingBag size={48} strokeWidth={1} />
              <p>Tu carrito está vacío</p>
              <Button variant="secondary" onClick={closeDrawer}>
                Seguir comprando
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variantText}`} className={styles.cartItem}>
                <img src={item.image} alt={item.title} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  {item.variantText && (
                    <span className={styles.itemVariant}>{item.variantText}</span>
                  )}
                  <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                  
                  <div className={styles.itemActions}>
                    <div style={{ transform: 'scale(0.8)', transformOrigin: 'left center' }}>
                      <QuantitySelector 
                        value={item.quantity} 
                        onChange={(qty) => updateQuantity(item.id, qty)} 
                      />
                    </div>
                    <button 
                      className={styles.removeButton}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Subtotal</span>
              <span className={styles.summaryValue}>{formatPrice(cartTotal)}</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center' }}>
              Los costos de envío se calcularán en el checkout.
            </p>
            <Link
              href="/checkout"
              onClick={closeDrawer}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '48px',
                backgroundColor: 'var(--color-yellow-400)',
                color: 'var(--color-black)',
                fontWeight: 700,
                fontSize: '15px',
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Ir a Pagar
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
