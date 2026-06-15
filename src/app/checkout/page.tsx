'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Container } from '@/components/layout/Container/Container';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { clsx } from 'clsx';
import { Lock, CreditCard, CheckCircle2, ShoppingBag, ArrowLeft, Landmark } from 'lucide-react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [shippingMethod, setShippingMethod] = useState('correo');
  const [paymentMethod, setPaymentMethod] = useState('mercadopago');
  
  // Form states
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [simulatedOrderNumber, setSimulatedOrderNumber] = useState('');

  const shippingCost = shippingMethod === 'correo' ? 15000 : 0;
  const grandTotal = cartTotal + shippingCost;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !name || !lastName || !dni || !phone) {
      alert('Por favor, completa todos los datos de contacto obligatorios.');
      return;
    }
    
    if (shippingMethod === 'correo' && (!address || !zipCode || !province || !city)) {
      alert('Por favor, completa los datos de envío a domicilio.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API request processing
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderSuccess(true);
      const randomOrder = `INX-${Math.floor(100000 + Math.random() * 900000)}`;
      setSimulatedOrderNumber(randomOrder);
      clearCart();
    }, 150000 / 100); // 1.5 seconds simulated processing time
  };

  if (orderSuccess) {
    return (
      <Container>
        <div style={{ padding: '60px 0', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <CheckCircle2 size={64} color="var(--status-success)" style={{ margin: '0 auto 24px' }} />
          <h1 className={styles.title} style={{ marginBottom: '16px' }}>¡Pedido Recibido con Éxito!</h1>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>
            Tu número de orden es: <strong>{simulatedOrderNumber}</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
            Hemos registrado tu pedido y te enviamos un correo electrónico a <strong>{email}</strong> con los detalles del envío y seguimiento.
          </p>
          
          {paymentMethod === 'transfer' && (
            <div style={{ 
              backgroundColor: '#f9f9f9', 
              border: '1px solid #eee', 
              padding: '24px', 
              borderRadius: '8px', 
              textAlign: 'left',
              marginBottom: '32px'
            }}>
              <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Landmark size={20} /> Datos para Transferencia Bancaria
              </h3>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Banco:</strong> Banco Galicia</p>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>CBU:</strong> 0070089330000001234567</p>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Alias:</strong> inox.mendoza.mp</p>
              <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Titular:</strong> INOX SRL (Masecor)</p>
              <p style={{ fontSize: '14px', marginBottom: '16px' }}><strong>Importe total:</strong> <strong style={{ color: 'var(--text-accent)' }}>{formatPrice(grandTotal)}</strong></p>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                * Por favor, envía el comprobante de transferencia a ventas@inox.com.ar o por WhatsApp indicando tu número de pedido. Sujeto a verificación del saldo.
              </p>
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="/">
              <Button size="large" variant="secondary" leftIcon={<ArrowLeft size={16} />}>
                Volver a la Tienda
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  if (items.length === 0) {
    return (
      <Container>
        <div className={styles.layout}>
          <div className={styles.emptyState}>
            <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 16px', color: 'var(--text-tertiary)' }} />
            <h2>No hay productos en el carrito</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Añade productos para continuar con el pago.</p>
            <Link href="/">
              <Button variant="primary">Ver catálogo de productos</Button>
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1 className={styles.title}>Finalizar Compra</h1>
        </header>

        <form onSubmit={handleCheckoutSubmit} className={styles.grid}>
          {/* Lado Izquierdo: Formularios */}
          <div className={styles.forms}>
            
            {/* 1. Datos de Contacto */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>1</span>
                Datos de Contacto
              </h2>
              <div className={styles.formGrid}>
                <div className={styles.fullWidth}>
                  <Input 
                    placeholder="Correo electrónico" 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Input 
                  placeholder="Nombre" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input 
                  placeholder="Apellido" 
                  required 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className={styles.fullWidth}>
                  <Input 
                    placeholder="DNI / CUIT" 
                    required 
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                  />
                </div>
                <div className={styles.fullWidth}>
                  <Input 
                    placeholder="Teléfono" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* 2. Envío */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>2</span>
                Entrega
              </h2>

              <div className={styles.radioOptions}>
                <label className={clsx(styles.radioOption, { [styles.selected]: shippingMethod === 'correo' })}>
                  <input 
                    type="radio" 
                    name="shipping" 
                    className={styles.radioInput}
                    checked={shippingMethod === 'correo'}
                    onChange={() => setShippingMethod('correo')}
                  />
                  <div className={styles.radioContent}>
                    <div className={styles.radioHeader}>
                      <span className={styles.radioLabel}>Envío a domicilio (Correo)</span>
                      <span className={styles.radioPrice}>{formatPrice(15000)}</span>
                    </div>
                    <span className={styles.radioDesc}>Llega entre 3 y 5 días hábiles a todo el país.</span>
                  </div>
                </label>

                <label className={clsx(styles.radioOption, { [styles.selected]: shippingMethod === 'retiro' })}>
                  <input 
                    type="radio" 
                    name="shipping" 
                    className={styles.radioInput}
                    checked={shippingMethod === 'retiro'}
                    onChange={() => setShippingMethod('retiro')}
                  />
                  <div className={styles.radioContent}>
                    <div className={styles.radioHeader}>
                      <span className={styles.radioLabel}>Retiro en local (Fábrica)</span>
                      <span className={styles.radioPrice}>Gratis</span>
                    </div>
                    <span className={styles.radioDesc}>Parque Industrial Mendoza, disponible en 24hs.</span>
                  </div>
                </label>
              </div>

              {shippingMethod === 'correo' && (
                <div className={styles.formGrid} style={{ marginTop: '16px' }}>
                  <div className={styles.fullWidth}>
                    <Input 
                      placeholder="Calle y Número" 
                      required 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className={styles.fullWidth}>
                    <Input placeholder="Piso / Depto (Opcional)" />
                  </div>
                  <Input 
                    placeholder="Código Postal" 
                    required 
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                  />
                  <Input 
                    placeholder="Provincia" 
                    required 
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                  <div className={styles.fullWidth}>
                    <Input 
                      placeholder="Ciudad" 
                      required 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </section>

            {/* 3. Pago */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNumber}>3</span>
                Medio de Pago
              </h2>
              <div className={styles.radioOptions}>
                {/* Mercado Pago */}
                <label className={clsx(styles.radioOption, { [styles.selected]: paymentMethod === 'mercadopago' })}>
                  <input 
                    type="radio" 
                    name="payment"
                    className={styles.radioInput}
                    checked={paymentMethod === 'mercadopago'}
                    onChange={() => setPaymentMethod('mercadopago')}
                  />
                  <div className={styles.radioContent}>
                    <div className={styles.radioHeader}>
                      <span className={styles.radioLabel}>Mercado Pago (Tarjetas / Débito / Dinero)</span>
                      <CreditCard size={20} />
                    </div>
                    <span className={styles.radioDesc}>Tarjetas de crédito, débito o dinero en cuenta Mercado Pago. Procesamiento seguro.</span>
                  </div>
                </label>

                {/* Transferencia */}
                <label className={clsx(styles.radioOption, { [styles.selected]: paymentMethod === 'transfer' })}>
                  <input 
                    type="radio" 
                    name="payment"
                    className={styles.radioInput}
                    checked={paymentMethod === 'transfer'}
                    onChange={() => setPaymentMethod('transfer')}
                  />
                  <div className={styles.radioContent}>
                    <div className={styles.radioHeader}>
                      <span className={styles.radioLabel}>Transferencia Bancaria Directa (5% de Descuento)</span>
                      <Landmark size={20} />
                    </div>
                    <span className={styles.radioDesc}>Te mostramos los datos del CBU/Alias al finalizar para que hagas la transferencia.</span>
                  </div>
                </label>
              </div>
            </section>

          </div>

          {/* Lado Derecho: Resumen */}
          <div>
            <div className={styles.summaryPanel}>
              <h2 className={styles.summaryTitle}>Resumen del Pedido</h2>
              
              <div className={styles.itemsList}>
                {items.map(item => (
                  <div key={`${item.id}-${item.variantText}`} className={styles.item}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                    <div className={styles.itemDetails}>
                      <span className={styles.itemTitle}>{item.title}</span>
                      {item.variantText && <span className={styles.itemVariant}>{item.variantText}</span>}
                      <span className={styles.itemPrice}>{item.quantity} x {formatPrice(item.price)}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.totals}>
                <div className={styles.totalsRow}>
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className={styles.totalsRow}>
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                </div>
                {paymentMethod === 'transfer' && (
                  <div className={styles.totalsRow} style={{ color: 'var(--status-success)', fontWeight: '500' }}>
                    <span>Descuento Transferencia (5%)</span>
                    <span>-{formatPrice(Math.round(cartTotal * 0.05))}</span>
                  </div>
                )}
                <div className={clsx(styles.totalsRow, styles.grandTotal)}>
                  <span>Total</span>
                  <span>{formatPrice(paymentMethod === 'transfer' ? Math.round(cartTotal * 0.95) + shippingCost : grandTotal)}</span>
                </div>
              </div>

              <Button 
                type="submit" 
                size="large" 
                variant="accent" 
                fullWidth 
                leftIcon={<Lock size={18} />}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : paymentMethod === 'mercadopago' ? 'Pagar de forma segura' : 'Comprar y Ver Datos de CBU'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
}
