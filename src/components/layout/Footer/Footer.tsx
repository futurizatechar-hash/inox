'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '../Container/Container';
import { 
  Send, 
  Mail, 
  Phone, 
  ShieldCheck,
  CreditCard
} from 'lucide-react';
import { clsx } from 'clsx';
import styles from './Footer.module.css';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      alert(`¡Gracias por suscribirte con: ${newsletterEmail.trim()}!\nPronto recibirás novedades y ofertas exclusivas de INOX.`);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.grid}>
          {/* Brand & Social Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <img src="/logo_cropped.png" alt="INOX" className={styles.logoImg} />
            </Link>
            <p className={styles.description}>
              Especialistas en acero inoxidable. Diseñamos y fabricamos bachas, mesadas y accesorios de calidad profesional para cocinas modernas y exigentes.
            </p>
            <div className={styles.socials}>
              <a 
                href="https://instagram.com/inox.ar" 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialBtn}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialBtn}
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                className={styles.socialBtn}
                aria-label="YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className={clsx(styles.columnDetails, { [styles.open]: openSections['productos'] })}>
            <div className={styles.columnSummary} onClick={() => toggleSection('productos')}>
              <h3>PRODUCTOS</h3>
              <span className={styles.chevron}></span>
            </div>
            <div className={styles.links}>
              <Link href="/productos?category=bachas" className={styles.link}>Bachas de Cocina</Link>
              <Link href="/productos?category=mesadas" className={styles.link}>Mesadas de Acero</Link>
              <Link href="/productos?category=accesorios" className={styles.link}>Accesorios de Diseño</Link>
              <Link href="/productos?category=industrial" className={styles.link}>Línea Industrial</Link>
            </div>
          </div>

          {/* Support Column */}
          <div className={clsx(styles.columnDetails, { [styles.open]: openSections['institucional'] })}>
            <div className={styles.columnSummary} onClick={() => toggleSection('institucional')}>
              <h3>SOPORTE</h3>
              <span className={styles.chevron}></span>
            </div>
            <div className={styles.links}>
              <Link href="/institucional/preguntas-frecuentes" className={styles.link}>Preguntas Frecuentes</Link>
              <Link href="/institucional/envios" className={styles.link}>Envíos y Retiros</Link>
              <Link href="/institucional/politica-de-devolucion" className={styles.link}>Garantía y Devoluciones</Link>
              <Link href="/institucional/contacto" className={styles.link}>Contacto Directo</Link>
            </div>
          </div>

          {/* Contact & Newsletter Column */}
          <div className={styles.contactAndNewsletter}>
            <div className={styles.columnSummaryStatic}>
              <h3>BOLETÍN Y CONTACTO</h3>
            </div>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <Mail size={14} className={styles.contactIcon} />
                <a href="mailto:ventas@inox.com.ar" className={styles.contactText}>ventas@inox.com.ar</a>
              </div>
              <div className={styles.contactItem}>
                <Phone size={14} className={styles.contactIcon} />
                <span className={styles.contactText}>Lunes a Viernes 9:00 - 17:00hs</span>
              </div>
            </div>

            <div className={styles.newsletterWrapper}>
              <p className={styles.newsletterText}>Suscribite para recibir novedades y ofertas especiales:</p>
              <form onSubmit={handleNewsletterSubmit} className={styles.newsletterForm}>
                <input 
                  type="email" 
                  placeholder="Tu correo electrónico" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required 
                  className={styles.newsletterInput}
                  aria-label="Correo electrónico para boletín"
                />
                <button type="submit" className={styles.newsletterBtn} aria-label="Enviar suscripción">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment trust badges */}
        <div className={styles.bottom}>
          <div className={styles.copyrightWrapper}>
            <p className={styles.copyright}>
              © {currentYear} INOX. Todos los derechos reservados.
            </p>
            <div className={styles.legal}>
              <Link href="/institucional/terminos" className={styles.legalLink}>
                Términos y Condiciones
              </Link>
              <Link href="/institucional/privacidad" className={styles.legalLink}>
                Privacidad
              </Link>
            </div>
          </div>

          <div className={styles.trustSeals}>
            <div className={styles.sealItem}>
              <ShieldCheck size={14} className={styles.sealIcon} />
              <span>Compra 100% Segura</span>
            </div>
            <div className={styles.sealItem}>
              <CreditCard size={14} className={styles.sealIcon} />
              <span>Planes de Pago</span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
