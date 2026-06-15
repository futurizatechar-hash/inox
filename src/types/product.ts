/**
 * Tipos de Producto
 */
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc?: string;
  brand: string;
  categoryId: string;
  weight?: number;
  dimensions?: {
    largo: number;
    ancho: number;
    alto: number;
  };
  isActive: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDesc?: string;
  variants: ProductVariant[];
  images: ProductImage[];
  features?: Record<string, string>;
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number; // en centavos
  comparePrice?: number; // en centavos
  stock: number;
  isActive: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt?: string;
  sortOrder: number;
}
