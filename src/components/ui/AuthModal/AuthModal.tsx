'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { X, Eye, EyeOff, ArrowRight, UserPlus } from 'lucide-react';
import { clsx } from 'clsx';
import styles from './AuthModal.module.css';

type AuthTab = 'login' | 'register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Register state
  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder – will connect to Supabase Auth
    alert(`Inicio de sesión simulado\n\nEmail: ${loginEmail}\nRecordarme: ${rememberMe ? 'Sí' : 'No'}\n\nEsta funcionalidad se conectará con Supabase Auth en la siguiente fase.`);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    // Placeholder – will connect to Supabase Auth
    alert(`Registro simulado\n\nNombre: ${regFirstName} ${regLastName}\nEmail: ${regEmail}\n\nEsta funcionalidad se conectará con Supabase Auth en la siguiente fase.`);
  };

  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div
      className={clsx(styles.overlay, { [styles.overlayVisible]: isOpen })}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!isOpen}
    >
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Autenticación">
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <img src="/logo_cropped.png" alt="INOX" className={styles.logoSmall} />
          <h2 className={styles.headerTitle}>
            {activeTab === 'login' ? 'Bienvenido de vuelta' : 'Creá tu cuenta'}
          </h2>
          <p className={styles.headerSubtitle}>
            {activeTab === 'login'
              ? 'Ingresá a tu cuenta para gestionar tus pedidos y favoritos.'
              : 'Registrate para acceder a ofertas exclusivas y seguimiento de pedidos.'}
          </p>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            className={clsx(styles.tab, { [styles.tabActive]: activeTab === 'login' })}
            onClick={() => switchTab('login')}
          >
            Iniciar Sesión
          </button>
          <button
            className={clsx(styles.tab, { [styles.tabActive]: activeTab === 'register' })}
            onClick={() => switchTab('register')}
          >
            Registrarse
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {activeTab === 'login' ? (
            <form className={styles.form} onSubmit={handleLoginSubmit}>
              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Email</label>
                <input
                  type="email"
                  className={styles.fieldInput}
                  placeholder="tu@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Contraseña</label>
                <div className={styles.passwordRow}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={styles.fieldInput}
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.extrasRow}>
                <label className={styles.checkRow}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className={styles.checkLabel}>Recordarme</span>
                </label>
                <button type="button" className={styles.forgotLink}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Iniciar Sesión
                <ArrowRight size={18} />
              </button>

              {/* Divider */}
              <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>o continuar con</span>
                <span className={styles.dividerLine} />
              </div>

              {/* Social Login */}
              <div className={styles.socialBtns}>
                <button type="button" className={styles.socialBtn}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button type="button" className={styles.socialBtn}>
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </form>
          ) : (
            <form className={styles.form} onSubmit={handleRegisterSubmit}>
              <div className={styles.nameRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Nombre</label>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    placeholder="Juan"
                    value={regFirstName}
                    onChange={(e) => setRegFirstName(e.target.value)}
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Apellido</label>
                  <input
                    type="text"
                    className={styles.fieldInput}
                    placeholder="Pérez"
                    value={regLastName}
                    onChange={(e) => setRegLastName(e.target.value)}
                    required
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Email</label>
                <input
                  type="email"
                  className={styles.fieldInput}
                  placeholder="tu@email.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Contraseña</label>
                <div className={styles.passwordRow}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={styles.fieldInput}
                    placeholder="Mínimo 8 caracteres"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.fieldLabel}>Confirmar Contraseña</label>
                <div className={styles.passwordRow}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={styles.fieldInput}
                    placeholder="Repetí tu contraseña"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <UserPlus size={18} />
                Crear Cuenta
              </button>

              <p className={styles.termsText}>
                Al registrarte, aceptás nuestros{' '}
                <a href="/institucional/terminos" className={styles.termsLink}>
                  Términos y Condiciones
                </a>{' '}
                y la{' '}
                <a href="/institucional/privacidad" className={styles.termsLink}>
                  Política de Privacidad
                </a>
                .
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          {activeTab === 'login' ? (
            <p className={styles.footerText}>
              ¿No tenés cuenta?{' '}
              <button className={styles.footerLink} onClick={() => switchTab('register')}>
                Registrate gratis
              </button>
            </p>
          ) : (
            <p className={styles.footerText}>
              ¿Ya tenés cuenta?{' '}
              <button className={styles.footerLink} onClick={() => switchTab('login')}>
                Iniciá sesión
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
