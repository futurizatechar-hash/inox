'use client';

import React, { useState, use, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { Container } from '@/components/layout/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { Badge } from '@/components/ui/Badge/Badge';
import { QuantitySelector } from '@/components/ui/QuantitySelector/QuantitySelector';
import { VariantSelector } from '@/components/ui/VariantSelector/VariantSelector';
import { ChevronRight, ShieldCheck, Truck, ShoppingCart, ChevronLeft, X, Maximize2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { getProductBySlug } from '@/dal/products';
import { clsx } from 'clsx';
import styles from './page.module.css';

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addToCart } = useCart();
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  
  // Inicializar variantes seleccionadas basadas en las variantes reales del producto
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    if (!product) return {};
    const initial: Record<string, string> = {};
    product.variants.forEach(v => {
      if (v.options.length > 0) {
        initial[v.id] = v.options[0].id;
      }
    });
    return initial;
  });

  if (!product) {
    return (
      <Container>
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>Producto no encontrado</h2>
          <p>El producto que estás buscando no existe o ha sido movido.</p>
          <Link href="/">
            <Button variant="primary" style={{ marginTop: '16px' }}>Volver al inicio</Button>
          </Link>
        </div>
      </Container>
    );
  }

  // Lista combinada de imágenes: la principal + la galería
  const allImages = [product.image, ...product.gallery].filter(Boolean);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      } else if (e.key === 'ArrowLeft') {
        setLightboxImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen, allImages.length]);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleVariantChange = (variantId: string, optionId: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantId]: optionId }));
  };

  const handleAddToCart = () => {
    // Generar string de variantes para mostrar en el carrito
    const variantText = product.variants
      .map(v => v.options.find(o => o.id === selectedVariants[v.id])?.label)
      .filter(Boolean)
      .join(' • ');

    addToCart({
      id: product.id,
      sku: product.id.toUpperCase(),
      title: product.title,
      price: product.price,
      image: product.image,
      quantity,
      variantText,
    });
  };

  return (
    <>
    <Container>
      <div className={styles.layout}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <Link href="/">Inicio</Link>
          <ChevronRight size={12} className={styles.breadcrumbDivider} />
          <Link href={`/productos?category=${product.category.toLowerCase()}`}>{product.category}</Link>
          <ChevronRight size={12} className={styles.breadcrumbDivider} />
          <span>{product.title}</span>
        </div>

        <div className={styles.productWrapper}>
          {/* Lado Izquierdo: Galería */}
          <div className={styles.gallery}>
            <div 
              className={clsx(styles.mainImage, styles.clickable)}
              onClick={() => {
                setLightboxImageIndex(activeImage);
                setIsLightboxOpen(true);
              }}
              title="Click para ver en pantalla completa"
            >
              <img src={allImages[activeImage] || '/logo.png'} alt={product.title} />
              <div className={styles.zoomOverlay}>
                <Maximize2 size={24} />
              </div>
            </div>
            {allImages.length > 1 && (
              <div className={styles.thumbnails}>
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    className={clsx(styles.thumbnail, { [styles.active]: activeImage === idx })}
                    onClick={() => setActiveImage(idx)}
                  >
                    <img src={img} alt={`Vista ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lado Derecho: Info y Compra */}
          <div className={styles.info}>
            <div className={styles.badges}>
              {product.badges?.map((badge, idx) => (
                <Badge key={idx} variant={badge.variant}>
                  {badge.label}
                </Badge>
              ))}
            </div>

            <h1 className={styles.title}>{product.title}</h1>

            <div className={styles.meta}>
              <span>SKU: {product.id.toUpperCase()}</span>
              <span>•</span>
              <span style={{ color: 'var(--status-success)' }}>
                Stock disponible (Envío Inmediato)
              </span>
            </div>

            <div className={styles.priceContainer}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className={styles.comparePrice}>{formatPrice(product.comparePrice)}</span>
              )}
            </div>

            <div className={styles.separator} />

            <div className={styles.form}>
              {product.variants.map((variantGroup) => (
                <VariantSelector
                  key={variantGroup.id}
                  label={variantGroup.label}
                  options={variantGroup.options}
                  selectedValue={selectedVariants[variantGroup.id]}
                  onChange={(optionId) => handleVariantChange(variantGroup.id, optionId)}
                />
              ))}

              <div className={styles.actions}>
                <span className={styles.quantityLabel}>Cantidad</span>
                <div className={styles.purchaseRow}>
                  <QuantitySelector value={quantity} onChange={setQuantity} max={10} />
                  <Button 
                    size="normal" 
                    variant="accent" 
                    fullWidth 
                    leftIcon={<ShoppingCart size={18} />}
                    onClick={handleAddToCart}
                  >
                    Añadir al Carrito
                  </Button>
                </div>
                <a 
                  href={`https://wa.me/543513217846?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(product.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.fullWidthLink}
                >
                  <Button size="normal" variant="secondary" fullWidth>
                    Consultar por WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* Trust Signals Específicos del Producto */}
            <div className={styles.buyBox}>
              <div className={styles.trustItem}>
                <Truck className={styles.trustIcon} size={20} />
                <span>{product.freeShipping ? 'Envío gratis a todo el país' : 'Envío rápido a domicilio a todo el país'}</span>
              </div>
              <div className={styles.trustItem}>
                <ShieldCheck className={styles.trustIcon} size={20} />
                <span>Garantía oficial de fábrica en acero {product.material || 'AISI 430'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Descripción del producto */}
        <div className={styles.descriptionContainer}>
          <h2 className={styles.descriptionTitle}>Descripción del Producto</h2>
          <div 
            className={styles.descriptionContent}
            dangerouslySetInnerHTML={{ __html: product.description || '' }} 
          />
        </div>
      </div>
    </Container>

      {/* Lightbox interactivo en pantalla completa — renderizado via portal para escapar de Container */}
      {isLightboxOpen && createPortal(
        <div className={styles.lightbox} onClick={() => setIsLightboxOpen(false)}>
          <button 
            className={styles.lightboxClose} 
            onClick={() => setIsLightboxOpen(false)}
            aria-label="Cerrar"
          >
            <X size={28} />
          </button>

          {allImages.length > 1 && (
            <>
              <button 
                className={clsx(styles.lightboxNav, styles.lightboxPrev)} 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
                }}
                aria-label="Anterior"
              >
                <ChevronLeft size={40} />
              </button>
              <button 
                className={clsx(styles.lightboxNav, styles.lightboxNext)} 
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
                }}
                aria-label="Siguiente"
              >
                <ChevronRight size={40} />
              </button>
            </>
          )}

          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={allImages[lightboxImageIndex]} 
              alt={`${product.title} - Zoom`} 
              className={styles.lightboxImage} 
            />
            <div className={styles.lightboxCounter}>
              {lightboxImageIndex + 1} / {allImages.length}
            </div>
          </div>

          {allImages.length > 1 && (
            <div className={styles.lightboxThumbnails} onClick={(e) => e.stopPropagation()}>
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  className={clsx(styles.lightboxThumbnail, { 
                    [styles.lightboxThumbActive]: lightboxImageIndex === idx 
                  })}
                  onClick={() => setLightboxImageIndex(idx)}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
