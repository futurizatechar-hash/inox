/**
 * Data Access Layer — Categories (Mocked Local Version)
 *
 * Todas las queries de categorías se centralizan aquí.
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
}

export const CATEGORIES: Category[] = [
  {
    id: 'bachas',
    name: 'Bachas de Cocina',
    slug: 'bachas',
    description: 'Bachas simples, dobles y esquineras de acero inoxidable AISI 304 y 430.'
  },
  {
    id: 'mesadas',
    name: 'Mesadas de Cocina',
    slug: 'mesadas',
    description: 'Mesadas ciegas y con bacha integrada de acero inoxidable de alta calidad.'
  },
  {
    id: 'accesorios',
    name: 'Accesorios de Cocina',
    slug: 'accesorios',
    description: 'Griferías, dosificadores de jabón, escurridores y complementos.'
  },
  {
    id: 'industrial',
    name: 'Línea Industrial B2B',
    slug: 'industrial',
    description: 'Equipamiento gastronómico industrial y piletas de gran capacidad.'
  }
];

export function getCategories(): Category[] {
  return CATEGORIES;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
