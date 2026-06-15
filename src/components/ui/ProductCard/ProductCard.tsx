import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  comparePrice?: number | null;
  discount?: number;
  brand?: string;
  category: string;
  image: string;
  rating?: number;
  reviewsCount?: number;
  soldCount?: number;
  freeShipping?: boolean;
  isFull?: boolean;
  installments?: {
    count: number;
    amount: number;
    interestFree?: boolean;
  };
  badges?: Array<{
    label: string;
    variant: 'default' | 'brand' | 'success' | 'error' | 'outline' | 'info';
  }>;
  layout?: 'grid' | 'list';
}

export function ProductCard({
  id,
  title,
  price,
  comparePrice,
  discount,
  brand,
  category: _category,
  image,
  rating,
  reviewsCount: _reviewsCount,
  soldCount,
  freeShipping,
  isFull,
  installments,
  badges,
  layout = 'grid',
}: ProductCardProps) {
  // Formateador de moneda argentina
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const isList = layout === 'list';

  return (
    <div className={`${styles.card} ${isList ? styles.listCard : styles.gridCard}`}>
      {/* Image Section */}
      <div className={styles.imageSection}>
        <Link href={`/producto/${id}`} className={styles.imageLink}>
          <img src={image} alt={title} className={styles.image} />
          {badges && badges.length > 0 && (
            <div className={styles.badges}>
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className={`${styles.badge} ${
                    badge.label.includes('OFF') || badge.label.includes('OFERTA')
                      ? styles.badge_success
                      : styles.badge_error
                  }`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}
        </Link>
        {/* Heart icon for wishlist */}
        <button className={styles.wishlistBtn} aria-label="Guardar en favoritos">
          <Heart size={18} className={styles.heartIcon} />
        </button>
      </div>

      {/* Content Section */}
      <div className={styles.contentSection}>
        {brand && (
          <div className={styles.brandRow}>
            <span className={styles.brand}>{brand}</span>
          </div>
        )}

        <Link href={`/producto/${id}`}>
          <h3 className={styles.title}>{title}</h3>
        </Link>

        {/* Rating */}
        {rating !== undefined && (
          <div className={styles.ratingContainer}>
            <span className={styles.ratingStar}>★</span>
            <span className={styles.ratingScore}>{rating.toFixed(1)}</span>
            {soldCount !== undefined && (
              <span className={styles.soldCount}>
                {soldCount >= 1000 ? `+${Math.floor(soldCount / 1000)}mil vendidos` : `+${soldCount} vendidos`}
              </span>
            )}
          </div>
        )}

        {/* Price & Discount */}
        <div className={styles.priceContainer}>
          {comparePrice && (
            <span className={styles.comparePrice}>{formatPrice(comparePrice)}</span>
          )}
          <div className={styles.currentPriceRow}>
            <span className={styles.price}>{formatPrice(price)}</span>
            {discount && (
              <span className={styles.discountBadge}>{discount}% OFF</span>
            )}
          </div>
        </div>

        {/* Installments */}
        {installments && (
          <div className={styles.installments}>
            {installments.interestFree ? (
              <span className={styles.interestFreeText}>
                Mismo precio en <strong className={styles.accentText}>{installments.count} cuotas de {formatPrice(installments.amount)}</strong>
              </span>
            ) : (
              <span className={styles.installmentText}>
                en {installments.count} cuotas de {formatPrice(installments.amount)}
              </span>
            )}
          </div>
        )}

        {/* Shipping info */}
        {(freeShipping || isFull) && (
          <div className={styles.shippingContainer}>
            {freeShipping && <span className={styles.freeShipping}>Envío gratis</span>}
            {isFull && (
              <span className={styles.fullShipping}>
                <span className={styles.thunderIcon}>⚡</span>
                <span className={styles.fullText}>FULL</span>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
