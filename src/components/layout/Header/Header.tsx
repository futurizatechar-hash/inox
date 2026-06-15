'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Container } from '../Container/Container';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export function Header() {
  const { cartCount, openDrawer } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/productos?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleUserClick = () => {
    window.location.href = '/cuenta';
  };

  return (
    <>
      <header className={styles.headerWrapper}>
        <Container>
          <div className={styles.headerMain}>
            <div className={styles.leftSection}>
              <div className={styles.mobileMenuBtn}>
                <button 
                  className={styles.iconButton} 
                  aria-label="Menú" 
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={20} />
                </button>
              </div>

              <Link href="/" className={styles.logoLink}>
                <img src="/logo_cropped.png" alt="INOX" className={styles.logoImg} />
              </Link>
            </div>

            {/* Desktop Navigation inline with logo */}
            {!isSearchOpen ? (
              <nav className={styles.navContainer}>
                <Link href="/" className={styles.navLink}>Inicio</Link>
                
                <div className={styles.navDropdown}>
                  <Link href="/productos" className={`${styles.navLink} ${styles.dropdownTrigger}`}>
                    Productos <ChevronDown size={14} className={styles.chevronIcon} />
                  </Link>
                  <div className={styles.dropdownMenu}>
                    <Link href="/productos?category=bachas" className={styles.dropdownItem}>
                      <span className={styles.itemTitle}>Bachas</span>
                      <span className={styles.itemDesc}>Calidad premium y estándar</span>
                    </Link>
                    <Link href="/productos?category=mesadas" className={styles.dropdownItem}>
                      <span className={styles.itemTitle}>Mesadas</span>
                      <span className={styles.itemDesc}>Bacha simple, doble o ciegas</span>
                    </Link>
                    <Link href="/productos?category=accesorios" className={styles.dropdownItem}>
                      <span className={styles.itemTitle}>Accesorios</span>
                      <span className={styles.itemDesc}>Dispenser, grifería, escurridores</span>
                    </Link>
                    <Link href="/productos?line=industrial" className={styles.dropdownItem}>
                      <span className={styles.itemTitle}>Línea Industrial</span>
                      <span className={styles.itemDesc}>Equipamiento gastronómico profesional</span>
                    </Link>
                  </div>
                </div>

                <Link href="/institucional/contacto" className={styles.navLink}>Contacto</Link>
                <Link href="/institucional/politica-de-devolucion" className={styles.navLink}>Política de Devolución</Link>
              </nav>
            ) : (
              <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', margin: '0 32px' }}>
                <input
                  type="text"
                  placeholder="Buscar productos (ej: bacha, mesada)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    flex: 1,
                    padding: '8px 16px',
                    borderRadius: '20px',
                    border: '1px solid #444',
                    backgroundColor: '#222',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button type="submit" style={{ display: 'none' }} />
              </form>
            )}

            <div className={styles.actions}>
              <button 
                className={styles.iconButton} 
                aria-label="Buscar" 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
              </button>
              <button className={styles.iconButton} aria-label="Mi Cuenta" onClick={handleUserClick}>
                <User size={20} />
              </button>
              <button className={styles.iconButton} aria-label="Carrito" onClick={openDrawer}>
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`${styles.mobileDrawer} ${isMobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <div className={styles.drawerOverlay} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={styles.drawerContent}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>Menú</span>
            <button 
              className={styles.iconButton} 
              onClick={() => setIsMobileMenuOpen(false)} 
              aria-label="Cerrar menú"
            >
              <X size={20} />
            </button>
          </div>
          <nav className={styles.drawerNav}>
            <Link 
              href="/" 
              className={styles.drawerLink} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Inicio
            </Link>
            
            <div className={styles.drawerCollapsible}>
              <button 
                className={styles.drawerCollapsibleTrigger} 
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
              >
                Productos
                <ChevronDown 
                  size={16} 
                  className={`${styles.drawerChevron} ${isMobileProductsOpen ? styles.chevronRotated : ''}`} 
                />
              </button>
              <div className={`${styles.drawerSubmenu} ${isMobileProductsOpen ? styles.submenuOpen : ''}`}>
                <Link 
                  href="/productos" 
                  className={styles.drawerSubLink} 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsMobileProductsOpen(false);
                  }}
                  style={{ fontWeight: 'bold', color: 'var(--color-yellow-400)' }}
                >
                  Ver Todos los Productos
                </Link>
                <Link 
                  href="/productos?category=bachas" 
                  className={styles.drawerSubLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Bachas
                </Link>
                <Link 
                  href="/productos?category=mesadas" 
                  className={styles.drawerSubLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Mesadas
                </Link>
                <Link 
                  href="/productos?category=accesorios" 
                  className={styles.drawerSubLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Accesorios
                </Link>
                <Link 
                  href="/productos?line=industrial" 
                  className={styles.drawerSubLink} 
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Línea Industrial
                </Link>
              </div>
            </div>

            <Link 
              href="/institucional/contacto" 
              className={styles.drawerLink} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contacto
            </Link>
            <Link 
              href="/institucional/politica-de-devolucion" 
              className={styles.drawerLink} 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Política de Devolución
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

