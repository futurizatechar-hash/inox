import { Container } from '@/components/layout/Container/Container';
import { Button } from '@/components/ui/Button/Button';
import { ProductCard } from '@/components/ui/ProductCard/ProductCard';
import { ShieldCheck, Truck, CreditCard, ArrowRight } from 'lucide-react';
import { getProducts } from '@/dal/products';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const allProducts = getProducts();
  
  // Buscar productos marcados como destacados o tomar los primeros 4 por defecto
  const featured = allProducts.filter(p => p.featured).slice(0, 4);
  const displayProducts = featured.length > 0 ? featured : allProducts.slice(0, 4);

  // Generar productos aleatorios para las nuevas secciones
  const getRandomProducts = (count: number) => {
    return [...allProducts].sort(() => 0.5 - Math.random()).slice(0, count);
  };

  const flashSaleProducts = getRandomProducts(4);
  const bestSellersProducts = getRandomProducts(4);

  return (
    <div className={styles.main}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <Container>
          <div className={styles.heroContent}>
            <div className={styles.heroTextCol}>
              <span className={styles.heroEyebrow}>Desde 1987</span>
              <h1 className={styles.heroTitle}>
                Acero inoxidable<br />
                de alta precisión
              </h1>
              <p className={styles.heroSubtitle}>
                Fabricamos bachas, piletas y mesadas con acero AISI 304 de primera calidad para todo el país.
              </p>
              
              <div className={styles.heroActions}>
                <Link href="/categoria/bachas">
                  <Button size="large" variant="accent" className={styles.heroPrimaryBtn}>
                    VER PRODUCTOS
                  </Button>
                </Link>
                <Link href="/institucional/contacto">
                  <Button size="large" variant="secondary" className={styles.heroOutlineBtn}>
                    CONTACTO
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* TRUST SIGNALS */}
      <section className={styles.trustSignals}>
        <Container>
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <Truck className={styles.trustIcon} size={32} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Envíos a todo el país</span>
                <span className={styles.trustDesc}>Gratis en compras superiores a $159.000</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <CreditCard className={styles.trustIcon} size={32} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Pagá en cuotas fijas</span>
                <span className={styles.trustDesc}>Con todas las tarjetas a través de MercadoPago</span>
              </div>
            </div>
            <div className={styles.trustItem}>
              <ShieldCheck className={styles.trustIcon} size={32} />
              <div className={styles.trustText}>
                <span className={styles.trustTitle}>Garantía oficial</span>
                <span className={styles.trustDesc}>Todos nuestros productos tienen garantía de fábrica</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className={styles.section}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Productos Destacados</h2>
            <Link href="/categoria/bachas">
              <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                Ver todos
              </Button>
            </Link>
          </div>
          <div className={styles.productGrid}>
            {displayProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                title={product.title}
                price={product.price}
                comparePrice={product.comparePrice || undefined}
                category={product.category}
                image={product.image}
                badges={product.badges}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* OFERTA RELAMPAGO */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Oferta Relámpago ⚡</h2>
            <Link href="/categoria/ofertas">
              <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                Ver todas
              </Button>
            </Link>
          </div>
          <div className={styles.productGrid}>
            {flashSaleProducts.map((product) => (
              <ProductCard 
                key={`flash-${product.id}`} 
                id={product.id}
                title={product.title}
                price={product.price}
                comparePrice={product.comparePrice || (product.price * 1.2)}
                category={product.category}
                image={product.image}
                badges={[{ label: 'Oferta', variant: 'error' }]}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* MAS VENDIDOS */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <Container>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Más Vendidos 🔥</h2>
            <Link href="/categoria/destacados">
              <Button variant="ghost" rightIcon={<ArrowRight size={16} />}>
                Ver todos
              </Button>
            </Link>
          </div>
          <div className={styles.productGrid}>
            {bestSellersProducts.map((product) => (
              <ProductCard 
                key={`best-${product.id}`} 
                id={product.id}
                title={product.title}
                price={product.price}
                comparePrice={product.comparePrice}
                category={product.category}
                image={product.image}
                badges={[{ label: 'Top Ventas', variant: 'brand' }]}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* PROMO BANNER */}
      <Container>
        <div className={styles.promoBanner}>
          <h2 className={styles.promoTitle}>
            ¿Sos profesional o tenés un local gastronómico?
          </h2>
          <p className={styles.promoDesc}>
            Conocé nuestra línea industrial. Fabricamos a medida con acero de calidad
            304 para cumplir con las máximas exigencias sanitarias.
          </p>
          <Link href="/categoria/industrial">
            <Button size="large" variant="primary">
              Ver Línea Industrial
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
