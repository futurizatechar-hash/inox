'use client';

export const runtime = 'edge';

import React, { use, useState } from 'react';
import { Container } from '@/components/layout/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import {
  ArrowLeft,
  Truck,
  ShieldCheck,
  HelpCircle,
  FileText,
  Lock,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

interface InstitutionalContent {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function InstitutionalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
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
      alert(
        'Por favor, completa los campos obligatorios (Nombre, Email y Mensaje).',
      );
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
    contacto: {
      title: 'Contacto',
      icon: <MessageSquare size={36} color="var(--text-accent)" />,
      content: (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}
        >
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '800px',
            }}
          >
            ¿Tenés alguna duda o consulta sobre nuestros productos de acero
            inoxidable? Dejanos tu mensaje y nos pondremos en contacto con vos a
            la brevedad.
          </p>
          {/* Grid Layout para Desktop */}
          <div style={{ display: 'grid', gap: '32px' }} className="contactGrid">
            {/* Columna Izquierda: Info + WhatsApp */}
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
            >
              {/* Canal Digital — WhatsApp */}
              <div
                style={{
                  border: '1px solid #222',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  background: '#0c0c0c',
                }}
              >
                <div style={{ height: '4px', background: '#25D366' }} />
                <div
                  style={{
                    padding: '32px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#25D366',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginBottom: '16px',
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <p
                    style={{
                      fontSize: '11px',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase' as const,
                      color: '#25D366',
                      marginBottom: '6px',
                    }}
                  >
                    CONTACTO DIRECTO
                  </p>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#ffffff',
                      lineHeight: '1.2',
                      marginBottom: '12px',
                    }}
                  >
                    Escribinos por WhatsApp
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '14px',
                      lineHeight: '1.5',
                      marginBottom: '24px',
                      maxWidth: '300px',
                    }}
                  >
                    Cotizaciones y asesoramiento inmediato en horario comercial.
                  </p>
                  <a
                    href="https://wa.me/543513217846?text=Hola%20INOX!%20Quisiera%20hacer%20una%20consulta%20sobre%20sus%20productos."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      gap: '10px',
                      padding: '14px 24px',
                      backgroundColor: '#25D366',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '13px',
                      letterSpacing: '0.5px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.3)',
                    }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    CHATEAR POR WHATSAPP
                  </a>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '32px',
                  padding: '16px 0',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #333',
                      flexShrink: 0,
                    }}
                  >
                    <Phone size={20} color="var(--text-accent)" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-tertiary)',
                        marginBottom: '4px',
                      }}
                    >
                      WhatsApp / Teléfono
                    </h4>
                    <a
                      href="https://wa.me/543513217846"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                      }}
                    >
                      543513217846
                    </a>
                  </div>
                </div>

                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #333',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={20} color="var(--text-accent)" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-tertiary)',
                        marginBottom: '4px',
                      }}
                    >
                      Correo Electrónico
                    </h4>
                    <a
                      href="mailto:ventas@inox.com.ar"
                      style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                      }}
                    >
                      ventas@inox.com.ar
                    </a>
                  </div>
                </div>

                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#111',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #333',
                      flexShrink: 0,
                    }}
                  >
                    <MapPin size={20} color="var(--text-accent)" />
                  </div>
                  <div>
                    <h4
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-tertiary)',
                        marginBottom: '4px',
                      }}
                    >
                      Fábrica y Showroom
                    </h4>
                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: 'bold',
                        color: 'var(--text-primary)',
                        lineHeight: '1.4',
                        display: 'block',
                      }}
                    >
                      ECOPARQUE INDUSTRIAL CORDOBA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div
              style={{
                backgroundColor: '#0c0c0c',
                border: '1px solid #222',
                borderRadius: '12px',
                padding: '24px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(248, 220, 19, 0.1)',
                    border: '1px solid rgba(248, 220, 19, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Mail size={18} color="var(--color-yellow-400)" />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#fff',
                      marginBottom: '2px',
                      lineHeight: '1.2',
                    }}
                  >
                    Envianos tu consulta
                  </h3>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.4)',
                      lineHeight: '1.3',
                    }}
                  >
                    Te responderemos a la brevedad
                  </p>
                </div>
              </div>
              {submitSuccess ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <CheckCircle2
                    size={48}
                    color="var(--status-success)"
                    style={{ margin: '0 auto 16px' }}
                  />
                  <h3 style={{ marginBottom: '8px' }}>¡Mensaje Enviado!</h3>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '14px',
                      marginBottom: '24px',
                    }}
                  >
                    Gracias por contactarte con nosotros. Un asesor de INOX se
                    pondrá en contacto contigo a la brevedad.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => setSubmitSuccess(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                  }}
                >
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
                      fontFamily: 'inherit',
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            marginTop: '16px',
          }}
        >
          <div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '12px',
                color: 'var(--text-primary)',
              }}
            >
              Cambios y Devoluciones Sin Complicaciones
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '15px',
                lineHeight: '1.7',
              }}
            >
              Cuando realizás una compra, queremos que te sientas seguro y
              confiado. Por eso, te explicamos de manera clara y sencilla cómo
              podés cambiar o devolver los productos de acero inoxidable que
              adquiriste.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '16px',
                color: 'var(--text-accent)',
              }}
            >
              ¿Cómo hacer un cambio o devolución?
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Contamos con dos opciones prácticas para que el proceso sea cómodo
              y rápido para vos:
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: '#0c0c0c',
                  border: '1px solid #222',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h4
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#fff',
                  }}
                >
                  1. Cambio o devolución en nuestras tiendas
                </h4>
                <ul
                  style={{
                    color: 'var(--text-secondary)',
                    paddingLeft: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <li>
                    Acercate a cualquiera de nuestras sucursales con el{' '}
                    <strong>ticket de compra</strong> o{' '}
                    <strong>ticket de cambio</strong>.
                  </li>
                  <li>
                    Nuestro equipo te asistirá para gestionar el cambio o la
                    devolución al instante.
                  </li>
                  <li>
                    Es ideal para quienes prefieren resolverlo en persona y
                    llevarse el producto correcto al momento.
                  </li>
                </ul>
              </div>

              <div
                style={{
                  backgroundColor: '#0c0c0c',
                  border: '1px solid #222',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <h4
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: '#fff',
                  }}
                >
                  2. Cambio o devolución desde tu domicilio
                </h4>
                <ul
                  style={{
                    color: 'var(--text-secondary)',
                    paddingLeft: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <li>
                    Envía un correo electrónico a{' '}
                    <strong>ventas@inox.com.ar</strong> explicando tu situación.
                  </li>
                  <li>
                    Nuestro equipo te responderá a la brevedad para coordinar la
                    logística de devolución o el cambio.
                  </li>
                  <li>
                    Esta opción es perfecta si no puedes acercarte a la fábrica
                    y deseas gestionar todo desde tu casa.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: 'var(--text-primary)',
              }}
            >
              Plazos para cambios y devoluciones
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Las devoluciones o cambios deben realizarse{' '}
              <strong>
                dentro de los 15 días siguientes a la fecha de compra
              </strong>
              . Este plazo nos permite procesar las solicitudes de manera
              eficiente y mantener la calidad de nuestro servicio gastronómico y
              de cocina.
            </p>
          </div>

          <div>
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: 'var(--text-primary)',
              }}
            >
              Recomendaciones para facilitar el proceso
            </h3>
            <ul
              style={{
                color: 'var(--text-secondary)',
                paddingLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <li>Conservar el ticket o comprobante de compra digital.</li>
              <li>
                Mantener el producto en su estado original, sin uso (sin haber
                sido instalado o amurado) y con sus etiquetas protectoras de
                acero intactas.
              </li>
              <li>
                Informar claramente el motivo del cambio o devolución para que
                nuestro equipo técnico pueda ayudarte de la mejor manera.
              </li>
            </ul>
          </div>

          <div
            style={{
              borderLeft: '4px solid var(--text-accent)',
              paddingLeft: '20px',
              margin: '16px 0',
            }}
          >
            <h3
              style={{
                fontSize: '17px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: 'var(--text-primary)',
              }}
            >
              ¿Por qué es importante nuestra política de devolución?
            </h3>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              Nuestra política clara te brinda{' '}
              <strong>confianza y seguridad</strong> al comprar productos de
              gran valor como bachas y mesadas de cocina, flexibilidad ante
              cualquier inconveniente técnico y atención personalizada de
              fábrica para resolver tus dudas.
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
            <h3 style={{ marginBottom: '8px' }}>
              ¿Qué medios de pago aceptan?
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Aceptamos pagos con tarjeta de crédito, débito y saldo en cuenta a
              través de Mercado Pago. Además, ofrecemos un{' '}
              <strong>5% de descuento directo</strong> si abonas mediante
              Transferencia Bancaria Directa.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>¿Cuánto tardan los envíos?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Los envíos a domicilio a través de correo (Andreani/OCA/Correo
              Argentino) demoran entre 3 y 5 días hábiles en llegar a cualquier
              punto del país. Si seleccionas retiro en fábrica, estará
              disponible en 24 horas hábiles.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>
              ¿Ofrecen garantía en sus productos?
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Sí, todos nuestros productos de acero inoxidable cuentan con una
              garantía oficial de fábrica de 5 años por defectos de fabricación.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>¿Hacen facturas A y B?</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Sí, emitimos facturas tipo A (para responsables inscriptos/CUIT) y
              tipo B (para consumidores finales) de forma automática con cada
              compra.
            </p>
          </div>
        </div>
      ),
    },
    envios: {
      title: 'Envíos y Retiros',
      icon: <Truck size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            En INOX realizamos envíos a todo el territorio de la República
            Argentina con las siguientes condiciones:
          </p>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Envío Gratis</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Tu envío es 100% gratuito en compras superiores a{' '}
              <strong>$159.000</strong>.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Operadores de Correo</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Trabajamos de forma paralela con los principales correos del país
              (Andreani, OCA y Correo Argentino) para garantizar la máxima
              cobertura y rapidez de entrega.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Retiro en Fábrica</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Puedes retirar tu compra sin cargo adicional directamente por
              nuestra fábrica en el Parque Industrial Mendoza, de lunes a
              viernes en el horario de 9:00 a 17:00 hs.
            </p>
          </div>
        </div>
      ),
    },
    garantia: {
      title: 'Garantía y Devoluciones',
      icon: <ShieldCheck size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Garantía de Calidad</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Nuestras bachas y mesadas están fabricadas con acero inoxidable de
              grado AISI 304 y AISI 430 de primera calidad, asegurando una
              resistencia superior. Por ello, ofrecemos una garantía de{' '}
              <strong>5 años</strong> para defectos estructurales de fábrica.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Proceso de Devolución (RMA)</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Si no estás satisfecho con tu compra o el producto llegó dañado,
              tienes un plazo de 10 días desde la recepción para solicitar la
              devolución o cambio del producto sin costo de transporte.
            </p>
          </div>
        </div>
      ),
    },
    terminos: {
      title: 'Términos y Condiciones',
      icon: <FileText size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            El uso de este sitio web y el procesamiento de compras en INOX están
            sujetos a la aceptación de los siguientes términos generales:
          </p>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Precios y Facturación</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Todos los precios publicados en el sitio web incluyen IVA y
              corresponden a ventas minoristas. Nos reservamos el derecho de
              modificar los precios sin previo aviso.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Stock</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              La confirmación de la compra está sujeta a la disponibilidad
              física en nuestro almacén central al momento de validar el pago.
            </p>
          </div>
        </div>
      ),
    },
    privacidad: {
      title: 'Política de Privacidad',
      icon: <Lock size={36} color="var(--text-accent)" />,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>
            En INOX nos tomamos muy en serio la seguridad y confidencialidad de
            tus datos personales:
          </p>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Uso de la Información</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Los datos recopilados en el proceso de registro y compra (nombre,
              dirección, correo, teléfono) se utilizan exclusivamente para
              procesar tu pedido, emitir la factura correspondiente y coordinar
              la entrega.
            </p>
          </div>
          <div>
            <h3 style={{ marginBottom: '8px' }}>Seguridad en Pagos</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Toda transacción realizada con tarjeta de crédito o débito se
              procesa encriptada directamente a través de los servidores seguros
              de Mercado Pago. INOX no almacena datos de tarjetas en sus
              sistemas.
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
          <p style={{ marginBottom: '24px' }}>
            El enlace que has seguido puede estar roto o la página ha sido
            eliminada.
          </p>
          <Link href="/">
            <Button variant="primary">Volver al inicio</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div
        style={{
          padding: '24px 0',
          maxWidth: slug === 'contacto' ? '1100px' : '800px',
          margin: '0 auto',
        }}
      >
        {/* Header de la página */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '24px',
            borderBottom: '1px solid #eee',
            paddingBottom: '16px',
          }}
        >
          {item.icon}
          <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>{item.title}</h1>
        </div>

        {/* Contenido principal */}
        <div
          style={{ lineHeight: '1.6', fontSize: '15px', marginBottom: '48px' }}
        >
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
