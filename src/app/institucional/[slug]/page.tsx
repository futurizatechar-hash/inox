'use client';

import React, { use, useState } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { ArrowLeft, Truck, ShieldCheck, HelpCircle, FileText, Lock, Mail, Phone, MapPin, CheckCircle2, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface InstitutionalContent {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function InstitutionalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  // Contact Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor, completa los campos obligatorios (Nombre, Email y Mensaje).');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 1200);
  };

  const contentMap: Record<string, InstitutionalContent> = {
    'contacto': {
      title: 'Contacto',
      icon: <MessageSquare size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginTop: '16px' }}>
          {/* Grid Layout para Desktop */}
          <div style={{ display: 'grid', gap: '40px' }} className="contactGrid">
            {/* Lado Izquierdo: Información */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6' }}>
                ¿Tenés alguna duda o consulta sobre nuestros productos de acero inoxidable? 
                Dejanos tu mensaje y nos pondremos en contacto con vos a la brevedad.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                    <Phone size={20} color="var(--text-accent)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>WhatsApp / Teléfono</h4>
                    <a href="https://wa.me/543513217846" target="_blank" rel="noopener noreferrer" style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none' }}>
                      543513217846
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                    <Mail size={20} color="var(--text-accent)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Correo Electrónico</h4>
                    <a href="mailto:ventas@inox.com.ar" style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-primary)', textDecoration: 'none' }}>
                      ventas@inox.com.ar
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #333' }}>
                    <MapPin size={20} color="var(--text-accent)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>Fábrica y Showroom</h4>
                    <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                      ECOPARQUE INDUSTRIAL CORDOBA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Formulario */}
            <div style={{ backgroundColor: '#0c0c0c', border: '1px solid #222', borderRadius: '12px', padding: '32px' }}>
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckCircle2 size={48} color="var(--status-success)" style={{ margin: '0 auto 16px' }} />
                  <h3 style={{ marginBottom: '8px' }}>¡Mensaje Enviado!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                    Gracias por contactarte con nosotros. Un asesor de INOX se pondrá en contacto contigo a la brevedad.
                  </p>
                  <Button variant="secondary" onClick={() => setSubmitSuccess(false)}>Enviar otro mensaje</Button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Input 
                    placeholder="Nombre completo *" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input 
                    placeholder="Correo electrónico *" 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input 
                    placeholder="Teléfono" 
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <textarea
                    placeholder="Escribí tu mensaje aquí... *"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #333',
                      backgroundColor: '#161616',
                      color: '#fff',
                      fontSize: '14px',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                  <Button 
                    type="submit" 
                    variant="accent" 
                    fullWidth 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      ),
    },
    'politica-de-devolucion': {
      title: 'Política de Devolución',
      icon: <ShieldCheck size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '16px' }}>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: 'var(--text-primary)' }}>
              Cambios y Devoluciones Sin Complicaciones
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.7' }}>
              Cuando realizás una compra, queremos que te sientas seguro y confiado. Por eso, te explicamos de manera clara y sencilla cómo podés cambiar o devolver los productos de acero inoxidable que adquiriste.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-accent)' }}>
              ¿Cómo hacer un cambio o devolución?
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Contamos con dos opciones prácticas para que el proceso sea cómodo y rápido para vos:
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              <div style={{ backgroundColor: '#0c0c0c', border: '1px solid #222', borderRadius: '8px', padding: '20px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>1. Cambio o devolución en nuestras tiendas</h4>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Acercate a cualquiera de nuestras sucursales con el <strong>ticket de compra</strong> o <strong>ticket de cambio</strong>.</li>
                  <li>Nuestro equipo te asistirá para gestionar el cambio o la devolución al instante.</li>
                  <li>Es ideal para quienes prefieren resolverlo en persona y llevarse el producto correcto al momento.</li>
                </ul>
              </div>

              <div style={{ backgroundColor: '#0c0c0c', border: '1px solid #222', borderRadius: '8px', padding: '20px' }}>
                <h4 style={{ fontWeight: 'bold', marginBottom: '8px', color: '#fff' }}>2. Cambio o devolución desde tu domicilio</h4>
                <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>Envía un correo electrónico a <strong>ventas@inox.com.ar</strong> explicando tu situación.</li>
                  <li>Nuestro equipo te responderá a la brevedad para coordinar la logística de devolución o el cambio.</li>
                  <li>Esta opción es perfecta si no puedes acercarte a la fábrica y deseas gestionar todo desde tu casa.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-primary)' }}>Plazos para cambios y devoluciones</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Las devoluciones o cambios deben realizarse <strong>dentro de los 15 días siguientes a la fecha de compra</strong>.
              Este plazo nos permite procesar las solicitudes de manera eficiente y mantener la calidad de nuestro servicio gastronómico y de cocina.
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-primary)' }}>Recomendaciones para facilitar el proceso</h3>
            <ul style={{ color: 'var(--text-secondary)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Conservar el ticket o comprobante de compra digital.</li>
              <li>Mantener el producto en su estado original, sin uso (sin haber sido instalado o amurado) y con sus etiquetas protectoras de acero intactas.</li>
              <li>Informar claramente el motivo del cambio o devolución para que nuestro equipo técnico pueda ayudarte de la mejor manera.</li>
            </ul>
          </div>

          <div style={{ borderLeft: '4px solid var(--text-accent)', paddingLeft: '20px', margin: '16px 0' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-primary)' }}>¿Por qué es importante nuestra política de devolución?</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
              Nuestra política clara te brinda <strong>confianza y seguridad</strong> al comprar productos de gran valor como bachas y mesadas de cocina, flexibilidad ante cualquier inconveniente técnico y atención personalizada de fábrica para resolver tus dudas.
            </p>
          </div>
        </div>
      ),
    },
    'preguntas-frecuentes': {
      title: 'Preguntas Frecuentes (FAQ)',
      icon: <HelpCircle size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '8px' }}>¿Qué medios de pago aceptan?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Aceptamos pagos con tarjeta de crédito, débito y saldo en cuenta a través de Mercado Pago. Además, ofrecemos un <strong>5% de descuento directo</strong> si abonas mediante Transferencia Bancaria Directa.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>¿Cuánto tardan los envíos?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Los envíos a domicilio a través de correo (Andreani/OCA/Correo Argentino) demoran entre 3 y 5 días hábiles en llegar a cualquier punto del país. Si seleccionas retiro en fábrica, estará disponible en 24 horas hábiles.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>¿Ofrecen garantía en sus productos?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Sí, todos nuestros productos de acero inoxidable cuentan con una garantía oficial de fábrica de 5 años por defectos de fabricación.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>¿Hacen facturas A y B?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Sí, emitimos facturas tipo A (para responsables inscriptos/CUIT) y tipo B (para consumidores finales) de forma automática con cada compra.
            </p>
          </div>
        </div>
      ),
    },
    'envios': {
      title: 'Envíos y Retiros',
      icon: <Truck size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            En INOX realizamos envíos a todo el territorio de la República Argentina con las siguientes condiciones:
          </p>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Envío Gratis</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Tu envío es 100% gratuito en compras superiores a <strong>$159.000</strong>.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Operadores de Correo</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Trabajamos de forma paralela con los principales correos del país (Andreani, OCA y Correo Argentino) para garantizar la máxima cobertura y rapidez de entrega.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Retiro en Fábrica</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Puedes retirar tu compra sin cargo adicional directamente por nuestra fábrica en el Parque Industrial Mendoza, de lunes a viernes en el horario de 9:00 a 17:00 hs.
            </p>
          </div>
        </div>
      ),
    },
    'garantia': {
      title: 'Garantía y Devoluciones',
      icon: <ShieldCheck size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Garantía de Calidad</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Nuestras bachas y mesadas están fabricadas con acero inoxidable de grado AISI 304 y AISI 430 de primera calidad, asegurando una resistencia superior. Por ello, ofrecemos una garantía de <strong>5 años</strong> para defectos estructurales de fábrica.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Proceso de Devolución (RMA)</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Si no estás satisfecho con tu compra o el producto llegó dañado, tienes un plazo de 10 días desde la recepción para solicitar la devolución o cambio del producto sin costo de transporte.
            </p>
          </div>
        </div>
      ),
    },
    'terminos': {
      title: 'Términos y Condiciones',
      icon: <FileText size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            El uso de este sitio web y el procesamiento de compras en INOX están sujetos a la aceptación de los siguientes términos generales:
          </p>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Precios y Facturación</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Todos los precios publicados en el sitio web incluyen IVA y corresponden a ventas minoristas. Nos reservamos el derecho de modificar los precios sin previo aviso.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Stock</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              La confirmación de la compra está sujeta a la disponibilidad física en nuestro almacén central al momento de validar el pago.
            </p>
          </div>
        </div>
      ),
    },
    'privacidad': {
      title: 'Política de Privacidad',
      icon: <Lock size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            En INOX nos tomamos muy en serio la seguridad y confidencialidad de tus datos personales:
          </p>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Uso de la Información</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Los datos recopilados en el proceso de registro y compra (nombre, dirección, correo, teléfono) se utilizan exclusivamente para procesar tu pedido, emitir la factura correspondiente y coordinar la entrega.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Seguridad en Pagos</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Toda transacción realizada con tarjeta de crédito o débito se procesa encriptada directamente a través de los servidores seguros de Mercado Pago. INOX no almacena datos de tarjetas en sus sistemas.
            </p>
          </div>
        </div>
      ),
    },
  };

  const item = contentMap[slug];

  if (!item) {
    return (
      <Container>
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>Página institucional no encontrada</h2>
          <p style={{ marginBottom: '24px' }}>El enlace que has seguido puede estar roto o la página ha sido eliminada.</p>
          <Link href="/">
            <Button variant="primary">Volver al inicio</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
        {/* Header de la página */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          {item.icon}
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{item.title}</h1>
        </div>

        {/* Contenido principal */}
        <div style={{ lineHeight: '1.6', fontSize: '15px', marginBottom: '48px' }}>
          {item.content}
        </div>

        {/* Botón de regreso */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: '24px' }}>
          <Link href="/">
            <Button variant="secondary" leftIcon={<ArrowLeft size={16} />}>
              Volver a la tienda
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
