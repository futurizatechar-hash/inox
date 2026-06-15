/**
 * Data Access Layer — Products (Mocked Local Version)
 *
 * Esta versión lee los datos de productos compilados reales desde products_data.json
 * y los sirve al frontend simulando la base de datos de manera local y estática.
 */

import productsData from './products_data.json';

export interface ProductInstallments {
  count: number;
  amount: number;
  interestFree?: boolean;
}

export interface ProductBadge {
  label: string;
  variant: 'brand' | 'success' | 'error' | 'outline' | 'info';
}

export interface ProductVariantOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface ProductVariantGroup {
  id: string;
  label: string;
  options: ProductVariantOption[];
}

export interface ProductDimensions {
  width?: number;
  depth?: number;
  height?: number;
  unit?: 'mm' | 'cm';
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  comparePrice?: number | null;
  discount?: number;
  line: string;
  brand: string;
  category: string; // Top-level mapped category ('bachas', 'mesadas', 'accesorios', 'industrial')
  rawCategory: string; // Subcategory from raw data (e.g. 'bacha-simple', 'mesada-ciega')
  material?: string;
  thickness?: string;
  features: string[];
  installationType?: string;
  dimensions?: ProductDimensions;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  soldCount: number;
  freeShipping: boolean;
  isFull: boolean;
  installments?: ProductInstallments;
  badges?: ProductBadge[];
  variants: ProductVariantGroup[];
  isNew?: boolean;
  featured?: boolean;
  description?: string;
  
  // Opciones de filtro específicas de cada tipo
  capacity?: string;
  length?: string;
  shape?: string;
}

// Mapear los productos de la fuente JSON a la interfaz del frontend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ALL_PRODUCTS: Product[] = (productsData as any[]).map((p) => {
  // 1. Mapear categoría a top-level ('bachas', 'mesadas', 'accesorios', 'industrial')
  let mappedCategory = 'accesorios';
  const rawCat = (p.category || '').toLowerCase();
  const rawLine = (p.line || '').toLowerCase();
  const nameLower = (p.title || '').toLowerCase();

  const isAccessoryByName = 
    nameLower.includes('sopapa') || 
    nameLower.includes('sop ') || 
    nameLower.startsWith('sop-') || 
    nameLower.includes('sifon') || 
    nameLower.includes('sifón') || 
    nameLower.includes('canasto') || 
    nameLower.includes('colador') || 
    nameLower.includes('grifer') || 
    nameLower.includes('dispenser') || 
    nameLower.includes('dosificador') || 
    nameLower.includes('roller') || 
    nameLower.includes('asadera') || 
    nameLower.includes('bandeja') || 
    nameLower.includes('lavacopas');
  
  if (isAccessoryByName) {
    mappedCategory = 'accesorios';
  } else if (rawLine === 'industrial' || rawCat === 'industrial') {
    mappedCategory = 'industrial';
  } else if (rawCat.includes('mesada')) {
    mappedCategory = 'mesadas';
  } else if (rawCat.includes('bacha')) {
    mappedCategory = 'bachas';
  }
  
  // 2. Calcular descuento si comparePrice existe
  let discount: number | undefined;
  if (p.comparePrice && p.comparePrice > p.price) {
    discount = Math.round(((p.comparePrice - p.price) / p.comparePrice) * 100);
  }
  
  // 3. Simular rating, reviews y ventas
  // Usar hash simple del ID para que los valores sean deterministas y no cambien en cada render
  let hash = 0;
  for (let i = 0; i < p.id.length; i++) {
    hash = p.id.charCodeAt(i) + ((hash << 5) - hash);
  }
  const deterministicRandom = (min: number, max: number, seedModifier = 0) => {
    const val = Math.abs(Math.sin(hash + seedModifier));
    return Math.floor(val * (max - min + 1)) + min;
  };
  
  const rating = Number((4 + deterministicRandom(5, 9) / 10).toFixed(1));
  const reviewsCount = deterministicRandom(10, 350, 1);
  const soldCount = deterministicRandom(50, 2000, 2);
  
  // 4. Envío gratis si el precio es mayor a $159.000 (umbral configurable)
  const freeShipping = p.price > 159000;
  
  // 5. Simular cuotas sin interés
  const installments = {
    count: 3,
    amount: Math.round(p.price / 3),
    interestFree: true
  };
  
  // 6. Simular Badges (etiquetas de oferta, nuevo, envío gratis)
  const badges: ProductBadge[] = [];
  if (discount && discount > 15) {
    badges.push({ label: `${discount}% OFF`, variant: 'success' });
  } else if (deterministicRandom(1, 10, 3) > 8) {
    badges.push({ label: 'Nuevo', variant: 'info' });
  } else if (freeShipping && deterministicRandom(1, 10, 4) > 8) {
    badges.push({ label: 'Envío Gratis', variant: 'brand' });
  }
  
  // 7. Simular opciones de filtro de capacidad, largo y forma basado en el nombre y tipo
  let capacity: string | undefined;
  let length: string | undefined;
  let shape: string | undefined;
  
  // Filtro de Largo para mesadas y bachas
  if (nameLower.includes('80cm') || nameLower.includes(' 80 cm')) length = '0.56 a 0.8 m';
  else if (nameLower.includes('100cm') || nameLower.includes('100 cm')) length = '0.8 m o más';
  else if (nameLower.includes('110cm') || nameLower.includes('110 cm')) length = '0.8 m o más';
  else if (nameLower.includes('120cm') || nameLower.includes('120 cm')) length = '0.8 m o más';
  else if (nameLower.includes('140cm') || nameLower.includes('140 cm')) length = '0.8 m o más';
  else if (nameLower.includes('150cm') || nameLower.includes('150 cm')) length = '0.8 m o más';
  else if (nameLower.includes('160cm') || nameLower.includes('160 cm')) length = '0.8 m o más';
  else if (nameLower.includes('180cm') || nameLower.includes('180 cm')) length = '0.8 m o más';
  else if (nameLower.includes('200cm') || nameLower.includes('200 cm')) length = '0.8 m o más';
  else if (nameLower.includes('220cm') || nameLower.includes('220 cm')) length = '0.8 m o más';
  else if (nameLower.includes('50x') || nameLower.includes('60x')) length = '0.56 a 0.8 m';
  else length = 'Menos de 0.38 m';

  // Filtro de Capacidad para bachas
  if (mappedCategory === 'bachas') {
    if (nameLower.includes('double') || nameLower.includes('doble')) {
      capacity = '45 L o más';
      shape = 'Rectangular';
    } else if (nameLower.includes('simple')) {
      capacity = '24 a 32 L';
      shape = 'Rectangular';
    } else if (nameLower.includes('xl') || nameLower.includes('gema xl')) {
      capacity = '45 L o más';
      shape = 'Cuadrada';
    } else {
      capacity = 'Menos de 24 L';
      shape = 'Redonda';
    }
  }
  
  // 8. Generar variantes simuladas realistas basadas en el tipo de producto
  const variants: ProductVariantGroup[] = [];
  if (mappedCategory === 'mesadas') {
    // Mesadas tienen variantes de orientación de bacha (si tiene bacha)
    if (!nameLower.includes('ciega') && !nameLower.includes('sin bacha')) {
      variants.push({
        id: 'orientacion',
        label: 'Orientación de la bacha',
        options: [
          { id: 'derecha', label: 'Bacha a la Derecha' },
          { id: 'izquierda', label: 'Bacha a la Izquierda' }
        ]
      });
    }
    // Mesadas tienen variantes de zócalo trasero
    variants.push({
      id: 'zocalo',
      label: 'Zócalo trasero',
      options: [
        { id: 'con-zocalo', label: 'Con Zócalo (Estándar)' },
        { id: 'sin-zocalo', label: 'Sin Zócalo' }
      ]
    });
  } else if (mappedCategory === 'bachas') {
    // Bachas tienen variantes de agujeros para grifería
    variants.push({
      id: 'griferia',
      label: 'Agujeros para grifería',
      options: [
        { id: 'sin-agujero', label: 'Sin Agujero' },
        { id: 'monocomando', label: '1 Agujero (Monocomando)' },
        { id: 'mezcladora', label: '3 Agujeros (Tradicional)' }
      ]
    });
  }
  
  return {
    id: p.id,
    slug: p.id,
    title: p.title,
    price: p.price,
    comparePrice: p.comparePrice,
    discount,
    line: p.line,
    brand: p.line ? (p.line.charAt(0).toUpperCase() + p.line.slice(1)) : 'INOX',
    category: mappedCategory,
    rawCategory: p.category,
    material: p.material,
    thickness: p.thickness,
    features: p.features,
    installationType: p.installationType,
    dimensions: p.dimensions,
    image: p.image,
    gallery: p.gallery,
    rating,
    reviewsCount,
    soldCount,
    freeShipping,
    isFull: deterministicRandom(1, 10, 5) > 6, // Simular FULL de Mercado Libre
    installments,
    badges,
    variants,
    isNew: deterministicRandom(1, 10, 6) > 8,
    featured: p.featured || false,
    description: p.description || '',
    capacity,
    length,
    shape
  };
});

export function getProducts(): Product[] {
  return ALL_PRODUCTS;
}

export function getProductById(id: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return ALL_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}
