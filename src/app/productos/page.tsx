'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { ChevronRight, SlidersHorizontal, X, Search } from 'lucide-react';
import { Container } from '@/components/layout/Container/Container';
import { ProductCard } from '@/components/ui/ProductCard/ProductCard';
import { ALL_PRODUCTS, Product } from '@/dal/products';
import styles from './page.module.css';

// Mappings for labels (matching Masecor reference layout)
const lineLabels: Record<string, string> = {
  premium: 'Premium',
  prisma: 'Prisma',
  standard: 'Estándar',
  lavadero: 'Lavadero',
  accesorios: 'Accesorios',
};

const mainCategoryLabels: Record<string, string> = {
  bachas: 'Bachas',
  mesadas: 'Mesadas',
  accesorios: 'Accesorios',
  lavadero: 'Lavaderos',
  industrial: 'Línea Industrial',
};

const subCategoryLabels: Record<string, string> = {
  simple: 'Simple',
  doble: 'Doble',
  ciega: 'Ciega',
  integrada: 'Integrada',
  pileta: 'Pileta',
  canastos: 'Canastos',
  coladores: 'Coladores',
  griferia: 'Grifería',
  dispenser: 'Dosificadores',
  sifones: 'Sifones',
  sopapas: 'Sopapas',
  roller: 'Roller / Escurridor',
  asadera: 'Asadera',
  otros: 'Otros Accesorios',
  industrial: 'Gastronomía Profesional',
};

const installationLabels: Record<string, string> = {
  'sobre-mueble': 'Sobre Mueble',
  'bajo-mesada': 'Bajo Mesada',
  empotrar: 'Empotrar',
  colgar: 'Colgar',
  'sobre-mesada-bajo-mesada': 'Sobre/Bajo Mesada',
};

const widthRangeLabels: Record<string, string> = {
  'under-60': 'Menos de 60 cm',
  '60-79': '60 a 79 cm',
  '80-119': '80 a 119 cm',
  '120-159': '120 a 159 cm',
  'over-160': '160 cm o más',
};

// Classification helpers matching ProductGrid.astro
function getWidthRangeTag(width: number | undefined): string | null {
  if (width === undefined || isNaN(width)) return null;
  if (width < 600) return 'under-60';
  if (width >= 600 && width < 800) return '60-79';
  if (width >= 800 && width < 1200) return '80-119';
  if (width >= 1200 && width < 1600) return '120-159';
  if (width >= 1600) return 'over-160';
  return null;
}

function getProductCategories(product: Product) {
  const name = product.title.toLowerCase();
  const cat = product.rawCategory || '';
  
  let mainCategory = '';
  let subCategory = '';

  const isAccessoryByName = 
    name.includes('sopapa') || 
    name.includes('sop ') || 
    name.startsWith('sop-') || 
    name.includes('sifon') || 
    name.includes('sifón') || 
    name.includes('canasto') || 
    name.includes('colador') || 
    name.includes('grifer') || 
    name.includes('dispenser') || 
    name.includes('dosificador') || 
    name.includes('roller') || 
    name.includes('asadera') || 
    name.includes('bandeja') || 
    name.includes('lavacopas');
  
  if (isAccessoryByName) {
    mainCategory = 'accesorios';
    if (name.includes('canasto')) subCategory = 'canastos';
    else if (name.includes('colador')) subCategory = 'coladores';
    else if (name.includes('griferia') || name.includes('grifería') || name.includes('grifer')) subCategory = 'griferia';
    else if (name.includes('dispenser') || name.includes('dosificador')) subCategory = 'dispenser';
    else if (name.includes('sifon') || name.includes('sifón')) subCategory = 'sifones';
    else if (name.includes('sopapa') || name.includes('sop ') || name.startsWith('sop-')) subCategory = 'sopapas';
    else if (name.includes('roller')) subCategory = 'roller';
    else if (name.includes('asadera')) subCategory = 'asadera';
    else subCategory = 'otros';
  } else if (cat === 'bacha-simple') {
    mainCategory = 'bachas';
    subCategory = 'simple';
  } else if (cat === 'bacha-doble') {
    mainCategory = 'bachas';
    subCategory = 'doble';
  } else if (cat === 'mesada-ciega') {
    mainCategory = 'mesadas';
    subCategory = 'ciega';
  } else if (cat === 'mesada-integrada') {
    mainCategory = 'mesadas';
    subCategory = 'integrada';
  } else if (cat === 'pileta-lavadero') {
    mainCategory = 'lavadero';
    subCategory = 'pileta';
  } else if (cat === 'accesorio') {
    mainCategory = 'accesorios';
    if (name.includes('canasto')) subCategory = 'canastos';
    else if (name.includes('colador')) subCategory = 'coladores';
    else if (name.includes('griferia') || name.includes('grifería') || name.includes('grifer')) subCategory = 'griferia';
    else if (name.includes('dispenser') || name.includes('dosificador')) subCategory = 'dispenser';
    else if (name.includes('sifon') || name.includes('sifón')) subCategory = 'sifones';
    else if (name.includes('sopapa') || name.includes('sop ') || name.startsWith('sop-')) subCategory = 'sopapas';
    else if (name.includes('roller')) subCategory = 'roller';
    else if (name.includes('asadera')) subCategory = 'asadera';
    else subCategory = 'otros';
  } else if (product.category === 'industrial') {
    mainCategory = 'industrial';
    subCategory = 'industrial';
  } else {
    mainCategory = 'otros';
    subCategory = 'otros';
  }
  
  return { mainCategory, subCategory };
}

const PAGE_SIZE = 16;

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const isFirstRender = React.useRef(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  
  // URL dynamic queries
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialLine = searchParams.get('line') || '';

  // Get initial subcategories if initialCategory is a main category
  const getInitialCategories = () => {
    if (!initialCategory) return [];
    
    if (initialCategory.includes(',')) {
      return initialCategory.split(',');
    }

    const mainCats = ['bachas', 'mesadas', 'accesorios', 'lavadero', 'industrial'];
    if (mainCats.includes(initialCategory.toLowerCase())) {
      const subCats: string[] = [];
      ALL_PRODUCTS.forEach((p) => {
        const { mainCategory, subCategory } = getProductCategories(p);
        if (mainCategory === initialCategory.toLowerCase() && subCategory && !subCats.includes(subCategory)) {
          subCats.push(subCategory);
        }
      });
      return subCats;
    }
    
    return [initialCategory];
  };

  // Search input state
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Filters State
  const [selectedLines, setSelectedLines] = useState<string[]>(initialLine ? initialLine.split(',') : []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(getInitialCategories());
  const [selectedThicknesses, setSelectedThicknesses] = useState<string[]>([]);
  const [selectedInstallations, setSelectedInstallations] = useState<string[]>([]);
  const [selectedWidths, setSelectedWidths] = useState<string[]>([]);
  
  // Extra filters
  const [priceMinInput, setPriceMinInput] = useState<string>('');
  const [priceMaxInput, setPriceMaxInput] = useState<string>('');
  const [priceMin, setPriceMin] = useState<number | ''>('');
  const [priceMax, setPriceMax] = useState<number | ''>('');
  const [freeShippingOnly, setFreeShippingOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('relevance');
  
  // Mobile drawer state
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);

  // Helper: read all filter state from a URLSearchParams object
  const restoreFromParams = React.useCallback((params: URLSearchParams) => {
    const categoryParam = params.get('category') || '';
    const searchParam = params.get('search') || '';
    const lineParam = params.get('line') || '';
    const thicknessParam = params.get('thickness') || '';
    const installParam = params.get('installation') || '';
    const widthParam = params.get('width') || '';
    const minPriceParam = params.get('minPrice') || '';
    const maxPriceParam = params.get('maxPrice') || '';
    const freeShippingParam = params.get('freeShipping') || '';
    const sortParam = params.get('sort') || '';

    setSearchQuery(prev => prev === searchParam ? prev : searchParam);

    let newCategories: string[] = [];
    if (categoryParam) {
      if (categoryParam.includes(',')) {
        newCategories = categoryParam.split(',');
      } else {
        const mainCats = ['bachas', 'mesadas', 'accesorios', 'lavadero', 'industrial'];
        if (mainCats.includes(categoryParam.toLowerCase())) {
          const subCats: string[] = [];
          ALL_PRODUCTS.forEach((p) => {
            const { mainCategory, subCategory } = getProductCategories(p);
            if (mainCategory === categoryParam.toLowerCase() && subCategory && !subCats.includes(subCategory)) {
              subCats.push(subCategory);
            }
          });
          newCategories = subCats;
        } else {
          newCategories = [categoryParam];
        }
      }
    }
    setSelectedCategories(prev => prev.join(',') === newCategories.join(',') ? prev : newCategories);

    const newLines = lineParam ? lineParam.split(',') : [];
    setSelectedLines(prev => prev.join(',') === newLines.join(',') ? prev : newLines);

    const newThicknesses = thicknessParam ? thicknessParam.split(',') : [];
    setSelectedThicknesses(prev => prev.join(',') === newThicknesses.join(',') ? prev : newThicknesses);

    const newInstallations = installParam ? installParam.split(',') : [];
    setSelectedInstallations(prev => prev.join(',') === newInstallations.join(',') ? prev : newInstallations);

    const newWidths = widthParam ? widthParam.split(',') : [];
    setSelectedWidths(prev => prev.join(',') === newWidths.join(',') ? prev : newWidths);

    const newMin = minPriceParam ? Number(minPriceParam) : '';
    setPriceMin(prev => prev === newMin ? prev : newMin);
    setPriceMinInput(prev => prev === minPriceParam ? prev : minPriceParam);

    const newMax = maxPriceParam ? Number(maxPriceParam) : '';
    setPriceMax(prev => prev === newMax ? prev : newMax);
    setPriceMaxInput(prev => prev === maxPriceParam ? prev : maxPriceParam);

    const newShipping = freeShippingParam === 'true';
    setFreeShippingOnly(prev => prev === newShipping ? prev : newShipping);

    const newSort = sortParam || 'relevance';
    setSortBy(prev => prev === newSort ? prev : newSort);
  }, []);

  // Write filters to URL (silently, no re-render loop) whenever state changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedLines.length) params.set('line', selectedLines.join(','));
    if (selectedCategories.length) params.set('category', selectedCategories.join(','));
    if (selectedThicknesses.length) params.set('thickness', selectedThicknesses.join(','));
    if (selectedInstallations.length) params.set('installation', selectedInstallations.join(','));
    if (selectedWidths.length) params.set('width', selectedWidths.join(','));
    if (priceMin !== '') params.set('minPrice', priceMin.toString());
    if (priceMax !== '') params.set('maxPrice', priceMax.toString());
    if (freeShippingOnly) params.set('freeShipping', 'true');
    if (sortBy !== 'relevance') params.set('sort', sortBy);

    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    window.history.replaceState(null, '', newUrl);
  }, [searchQuery, selectedLines, selectedCategories, selectedThicknesses, selectedInstallations, selectedWidths, priceMin, priceMax, freeShippingOnly, sortBy, pathname]);

  // Restore filters ONLY on genuine browser back/forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      restoreFromParams(params);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [restoreFromParams]);

  // Restore filters when navigating via Next.js Links (e.g. Header)
  useEffect(() => {
    restoreFromParams(searchParams);
  }, [searchParams, restoreFromParams]);

  // Extract static unique options for headers & counts
  const lines = useMemo(() => Array.from(new Set(ALL_PRODUCTS.map((p) => p.line).filter(Boolean))) as string[], []);
  const thicknesses = useMemo(() => Array.from(new Set(ALL_PRODUCTS.map((p) => p.thickness).filter(Boolean))).sort() as string[], []);
  const installations = useMemo(() => Array.from(new Set(ALL_PRODUCTS.map((p) => p.installationType).filter(Boolean))) as string[], []);
  const widthRanges = ['under-60', '60-79', '80-119', '120-159', 'over-160'];

  // Grouped category structure dynamically built from all products
  const groupedCategories = useMemo(() => {
    const groups: Record<string, string[]> = {};
    ALL_PRODUCTS.forEach((p) => {
      const { mainCategory, subCategory } = getProductCategories(p);
      if (mainCategory && subCategory) {
        if (!groups[mainCategory]) {
          groups[mainCategory] = [];
        }
        if (!groups[mainCategory].includes(subCategory)) {
          groups[mainCategory].push(subCategory);
        }
      }
    });
    return groups;
  }, []);

  // Filter products dynamic list
  const filteredProducts = useMemo(() => {
    let result = [...ALL_PRODUCTS];

    // Search filter: Stricter matching (only title and categories, NOT description)
    if (searchQuery.trim()) {
      const queries = searchQuery.toLowerCase().trim().split(/\s+/);
      result = result.filter((p) => {
        const { mainCategory, subCategory } = getProductCategories(p);
        const searchSpace = `${p.title} ${mainCategory} ${subCategory || ''}`.toLowerCase();
        return queries.every(q => searchSpace.includes(q));
      });
    }

    // Line
    if (selectedLines.length > 0) {
      result = result.filter((p) => selectedLines.includes(p.line));
    }

    // Subcategory
    if (selectedCategories.length > 0) {
      result = result.filter((p) => {
        const { subCategory } = getProductCategories(p);
        return selectedCategories.includes(subCategory);
      });
    }

    // Thickness
    if (selectedThicknesses.length > 0) {
      result = result.filter((p) => p.thickness && selectedThicknesses.includes(p.thickness));
    }

    // Installation
    if (selectedInstallations.length > 0) {
      result = result.filter((p) => p.installationType && selectedInstallations.includes(p.installationType));
    }

    // Width range tag
    if (selectedWidths.length > 0) {
      result = result.filter((p) => {
        const wRange = getWidthRangeTag(p.dimensions?.width);
        return wRange && selectedWidths.includes(wRange);
      });
    }

    // Custom Price range inputs
    if (priceMin !== '') {
      result = result.filter((p) => p.price >= priceMin);
    }
    if (priceMax !== '') {
      result = result.filter((p) => p.price <= priceMax);
    }

    // Free Shipping
    if (freeShippingOnly) {
      result = result.filter((p) => p.freeShipping);
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // Relevance -> sort by soldCount
      result.sort((a, b) => b.soldCount - a.soldCount);
    }

    return result;
  }, [
    searchQuery,
    selectedLines,
    selectedCategories,
    selectedThicknesses,
    selectedInstallations,
    selectedWidths,
    priceMin,
    priceMax,
    freeShippingOnly,
    sortBy
  ]);

  // Reset visible count whenever filters/sort change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, selectedLines, selectedCategories, selectedThicknesses, selectedInstallations, selectedWidths, priceMin, priceMax, freeShippingOnly, sortBy]);

  const visibleProducts = useMemo(() => filteredProducts.slice(0, visibleCount), [filteredProducts, visibleCount]);
  const hasMore = visibleCount < filteredProducts.length;
  const remaining = filteredProducts.length - visibleCount;

  // Counts based on the CURRENT text search results to keep counts relevant
  const counts = useMemo(() => {
    const lineCounts: Record<string, number> = {};
    const mainCatCounts: Record<string, number> = {};
    const subCatCounts: Record<string, number> = {};
    const thicknessCounts: Record<string, number> = {};
    const instCounts: Record<string, number> = {};
    const widthCounts: Record<string, number> = {};

    // Get products filtered ONLY by search query to make category counts feel natural
    let searchBase = [...ALL_PRODUCTS];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      searchBase = searchBase.filter((p) => 
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.line.toLowerCase().includes(q) ||
        p.rawCategory.toLowerCase().includes(q)
      );
    }

    searchBase.forEach((p) => {
      if (p.line) lineCounts[p.line] = (lineCounts[p.line] || 0) + 1;
      if (p.thickness) thicknessCounts[p.thickness] = (thicknessCounts[p.thickness] || 0) + 1;
      if (p.installationType) instCounts[p.installationType] = (instCounts[p.installationType] || 0) + 1;
      
      const { mainCategory, subCategory } = getProductCategories(p);
      if (mainCategory) mainCatCounts[mainCategory] = (mainCatCounts[mainCategory] || 0) + 1;
      if (subCategory) subCatCounts[subCategory] = (subCatCounts[subCategory] || 0) + 1;
      
      const wRange = getWidthRangeTag(p.dimensions?.width);
      if (wRange) widthCounts[wRange] = (widthCounts[wRange] || 0) + 1;
    });

    return { lineCounts, mainCatCounts, subCatCounts, thicknessCounts, instCounts, widthCounts };
  }, [searchQuery]);

  // Handler helpers
  const handleToggleLine = (line: string) => {
    setSelectedLines((prev) => prev.includes(line) ? prev.filter((l) => l !== line) : [...prev, line]);
  };

  const handleToggleCategory = (subCat: string) => {
    setSelectedCategories((prev) => prev.includes(subCat) ? prev.filter((c) => c !== subCat) : [...prev, subCat]);
  };

  const handleToggleMainCategory = (mainCat: string) => {
    const children = groupedCategories[mainCat] || [];
    const allChecked = children.every(child => selectedCategories.includes(child));
    
    if (allChecked) {
      // Uncheck all children
      setSelectedCategories((prev) => prev.filter(c => !children.includes(c)));
    } else {
      // Check all children
      setSelectedCategories((prev) => {
        const next = [...prev];
        children.forEach(child => {
          if (!next.includes(child)) next.push(child);
        });
        return next;
      });
    }
  };

  const handleSelectOnlyCategoryGroup = (mainCat: string) => {
    const children = groupedCategories[mainCat] || [];
    setSelectedCategories(children);
  };

  const handleToggleThickness = (thick: string) => {
    setSelectedThicknesses((prev) => prev.includes(thick) ? prev.filter((t) => t !== thick) : [...prev, thick]);
  };

  const handleToggleInstallation = (inst: string) => {
    setSelectedInstallations((prev) => prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst]);
  };

  const handleToggleWidth = (wRange: string) => {
    setSelectedWidths((prev) => prev.includes(wRange) ? prev.filter((w) => w !== wRange) : [...prev, wRange]);
  };

  const handleApplyPriceRange = (e: React.FormEvent) => {
    e.preventDefault();
    setPriceMin(priceMinInput !== '' ? Number(priceMinInput) : '');
    setPriceMax(priceMaxInput !== '' ? Number(priceMaxInput) : '');
  };

  const handleClearPriceRange = () => {
    setPriceMinInput('');
    setPriceMaxInput('');
    setPriceMin('');
    setPriceMax('');
  };

  const handleSelectPriceBracket = (min: number | '', max: number | '') => {
    setPriceMin(min);
    setPriceMax(max);
    setPriceMinInput(min !== '' ? min.toString() : '');
    setPriceMaxInput(max !== '' ? max.toString() : '');
  };

  const clearAllFilters = () => {
    setSelectedLines([]);
    setSelectedCategories([]);
    setSelectedThicknesses([]);
    setSelectedInstallations([]);
    setSelectedWidths([]);
    handleClearPriceRange();
    setFreeShippingOnly(false);
    setSearchQuery('');
  };

  // Chips structure
  const activeChips = useMemo(() => {
    const chips: Array<{ type: string; label: string; value: string }> = [];

    selectedLines.forEach((l) => chips.push({ type: 'line', label: lineLabels[l] || l, value: l }));
    
    selectedCategories.forEach((c) => chips.push({ type: 'category', label: subCategoryLabels[c] || c, value: c }));
    
    selectedThicknesses.forEach((t) => chips.push({ type: 'thickness', label: t, value: t }));
    
    selectedInstallations.forEach((i) => chips.push({ type: 'installation', label: installationLabels[i] || i, value: i }));
    
    selectedWidths.forEach((w) => chips.push({ type: 'width', label: widthRangeLabels[w] || w, value: w }));

    if (priceMin !== '' || priceMax !== '') {
      let label = '';
      const format = (v: number) => `$${v.toLocaleString('es-AR')}`;
      if (priceMin !== '' && priceMax !== '') label = `${format(priceMin)} - ${format(priceMax)}`;
      else if (priceMin !== '') label = `Desde ${format(priceMin)}`;
      else if (priceMax !== '') label = `Hasta ${format(priceMax)}`;
      chips.push({ type: 'price', label, value: 'price' });
    }

    if (freeShippingOnly) {
      chips.push({ type: 'shipping', label: 'Envío gratis', value: 'shipping' });
    }

    return chips;
  }, [selectedLines, selectedCategories, selectedThicknesses, selectedInstallations, selectedWidths, priceMin, priceMax, freeShippingOnly]);

  const removeChip = (chip: { type: string; value: string }) => {
    if (chip.type === 'line') setSelectedLines(selectedLines.filter(l => l !== chip.value));
    if (chip.type === 'category') setSelectedCategories(selectedCategories.filter(c => c !== chip.value));
    if (chip.type === 'thickness') setSelectedThicknesses(selectedThicknesses.filter(t => t !== chip.value));
    if (chip.type === 'installation') setSelectedInstallations(selectedInstallations.filter(i => i !== chip.value));
    if (chip.type === 'width') setSelectedWidths(selectedWidths.filter(w => w !== chip.value));
    if (chip.type === 'price') handleClearPriceRange();
    if (chip.type === 'shipping') setFreeShippingOnly(false);
  };

  // Reusable Filter Sidebar Render (Desktop and Mobile Drawer)
  const renderSidebarFilters = () => (
    <div className={styles.sidebarContent}>
      {/* 1. Categorías / Tipo de Producto */}
      {Object.keys(groupedCategories).length > 0 && (
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Tipo de Producto</h3>
          <div className={styles.filterList}>
            {Object.keys(groupedCategories).map((mainCat) => {
              const children = groupedCategories[mainCat] || [];
              const mainCount = counts.mainCatCounts[mainCat] || 0;
              const allChildrenChecked = children.every(child => selectedCategories.includes(child));
              const someChildrenChecked = children.some(child => selectedCategories.includes(child)) && !allChildrenChecked;

              return (
                <div key={mainCat} className={styles.filterSubgroup}>
                  <label className={`${styles.filterCheckboxItem} ${styles.filterCheckboxItemMain}`}>
                    <input
                      type="checkbox"
                      checked={allChildrenChecked}
                      ref={(el) => {
                        if (el) el.indeterminate = someChildrenChecked;
                      }}
                      onChange={() => handleToggleMainCategory(mainCat)}
                      className={styles.filterCheckbox}
                    />
                    <span className={styles.filterCheckboxLabelText} style={{ fontWeight: 'bold' }}>
                      {mainCategoryLabels[mainCat] || mainCat}
                    </span>
                    <button 
                      className={styles.filterOnlyBtn} 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSelectOnlyCategoryGroup(mainCat);
                      }}
                    >
                      Solo
                    </button>
                    <span className={styles.filterCount}>({mainCount})</span>
                  </label>
                  
                  <div className={styles.filterListSub}>
                    {children.map((subCat) => {
                      const count = counts.subCatCounts[subCat] || 0;
                      return (
                        <label key={subCat} className={styles.filterCheckboxItem}>
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(subCat)}
                            onChange={() => handleToggleCategory(subCat)}
                            className={styles.filterCheckbox}
                          />
                          <span className={styles.filterCheckboxLabelText}>{subCategoryLabels[subCat] ?? subCat}</span>
                          <span className={styles.filterCount}>({count})</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Líneas */}
      {lines.length > 0 && (
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Línea</h3>
          <div className={styles.filterList}>
            {lines.map((line) => {
              const count = counts.lineCounts[line] || 0;
              return (
                <label key={line} className={styles.filterCheckboxItem}>
                  <input
                    type="checkbox"
                    checked={selectedLines.includes(line)}
                    onChange={() => handleToggleLine(line)}
                    className={styles.filterCheckbox}
                  />
                  <span className={styles.filterCheckboxLabelText}>{lineLabels[line] ?? line}</span>
                  <span className={styles.filterCount}>({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Costo de envío */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Costo de envío</h3>
        <label className={styles.filterCheckboxItem}>
          <input
            type="checkbox"
            checked={freeShippingOnly}
            onChange={(e) => setFreeShippingOnly(e.target.checked)}
            className={styles.filterCheckbox}
          />
          <span className={styles.filterCheckboxLabelText}>Envío gratis</span>
        </label>
      </div>

      {/* 4. Rango de precio */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Precio</h3>
        <div className={styles.priceBrackets}>
          <button onClick={() => handleSelectPriceBracket('', 100000)} className={styles.priceBracketLink}>
            Hasta $100.000
          </button>
          <button onClick={() => handleSelectPriceBracket(100000, 250000)} className={styles.priceBracketLink}>
            $100.000 a $250.000
          </button>
          <button onClick={() => handleSelectPriceBracket(250000, '')} className={styles.priceBracketLink}>
            Más de $250.000
          </button>
        </div>
        <form onSubmit={handleApplyPriceRange} className={styles.priceForm}>
          <input
            type="number"
            placeholder="Mínimo"
            value={priceMinInput}
            onChange={(e) => setPriceMinInput(e.target.value)}
            className={styles.priceInput}
          />
          <span className={styles.priceDivider}>—</span>
          <input
            type="number"
            placeholder="Máximo"
            value={priceMaxInput}
            onChange={(e) => setPriceMaxInput(e.target.value)}
            className={styles.priceInput}
          />
          <button type="submit" className={styles.priceSubmitBtn} aria-label="Aplicar rango de precio">
            <ChevronRight size={14} />
          </button>
        </form>
      </div>

      {/* 5. Espesor de acero */}
      {thicknesses.length > 0 && (
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Espesor del Acero</h3>
          <div className={styles.filterList}>
            {thicknesses.map((thick) => {
              const count = counts.thicknessCounts[thick] || 0;
              return (
                <label key={thick} className={styles.filterCheckboxItem}>
                  <input
                    type="checkbox"
                    checked={selectedThicknesses.includes(thick)}
                    onChange={() => handleToggleThickness(thick)}
                    className={styles.filterCheckbox}
                  />
                  <span className={styles.filterCheckboxLabelText}>{thick}</span>
                  <span className={styles.filterCount}>({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. Instalación */}
      {installations.length > 0 && (
        <div className={styles.filterGroup}>
          <h3 className={styles.filterTitle}>Instalación</h3>
          <div className={styles.filterList}>
            {installations.map((inst) => {
              const count = counts.instCounts[inst] || 0;
              return (
                <label key={inst} className={styles.filterCheckboxItem}>
                  <input
                    type="checkbox"
                    checked={selectedInstallations.includes(inst)}
                    onChange={() => handleToggleInstallation(inst)}
                    className={styles.filterCheckbox}
                  />
                  <span className={styles.filterCheckboxLabelText}>{installationLabels[inst] ?? inst}</span>
                  <span className={styles.filterCount}>({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Ancho */}
      <div className={styles.filterGroup}>
        <h3 className={styles.filterTitle}>Ancho</h3>
        <div className={styles.filterList}>
          {widthRanges.map((wRange) => {
            const count = counts.widthCounts[wRange] || 0;
            if (count === 0 && !selectedWidths.includes(wRange)) return null; // hide empty ranges
            return (
              <label key={wRange} className={styles.filterCheckboxItem}>
                <input
                  type="checkbox"
                  checked={selectedWidths.includes(wRange)}
                  onChange={() => handleToggleWidth(wRange)}
                  className={styles.filterCheckbox}
                />
                <span className={styles.filterCheckboxLabelText}>{widthRangeLabels[wRange] ?? wRange}</span>
                <span className={styles.filterCount}>({count})</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.pageWrapper}>
      <Container>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbs}>
          <Link href="/">Inicio</Link>
          <ChevronRight size={12} className={styles.breadcrumbDivider} />
          <span>Productos</span>
        </div>

        {/* Catalog Header */}
        <div className={styles.categoryHeader}>
          <h1 className={styles.categoryTitle}>Catálogo Completo</h1>
          <span className={styles.productCountLabel}>
            {filteredProducts.length} resultados
          </span>
        </div>

        {/* Mobile Toolbar */}
        <div className={styles.mobileToolbar}>
          <div className={styles.mobileToolBtnWrapper}>
            <button className={styles.mobileToolBtn} onClick={() => setIsFilterDrawerOpen(true)}>
              <SlidersHorizontal size={16} />
              Filtrar
            </button>
          </div>
          <div className={styles.mobileToolDivider} />
          <div className={styles.mobileToolBtnWrapper}>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.mobileSortSelect}
            >
              <option value="relevance">Ordenar por: Relevancia</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="rating">Más calificados</option>
            </select>
          </div>
        </div>



        {/* Active Chips Tags */}
        {activeChips.length > 0 && (
          <div className={styles.activeFiltersBar}>
            <div className={styles.tagsContainer}>
              {activeChips.map((chip) => (
                <button
                  key={`${chip.type}-${chip.value}`}
                  className={styles.filterTag}
                  onClick={() => removeChip(chip)}
                  title="Quitar filtro"
                >
                  {chip.label}
                  <X size={12} className={styles.closeTagIcon} />
                </button>
              ))}
              <button className={styles.clearAllLink} onClick={clearAllFilters}>
                Limpiar todos
              </button>
            </div>
          </div>
        )}

        {/* Main layout */}
        <div className={styles.layoutMain}>
          {/* Sidebar (Desktop) */}
          <aside className={styles.sidebar}>
            {activeChips.length > 0 && (
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                  Filtros aplicados
                </span>
                <button 
                  style={{ background: 'none', border: 'none', color: '#3483fa', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                  onClick={clearAllFilters}
                >
                  Limpiar todos
                </button>
              </div>
            )}
            {renderSidebarFilters()}
          </aside>

          {/* Catalog Listing */}
          <main className={styles.contentArea}>
            {/* Text Search Input (Buscador por caracteres) */}
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} size={18} />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre, línea, descripción o características..."
                className={styles.searchInput}
                aria-label="Buscar productos"
              />
            </div>
            {/* Desktop Sort Options Bar */}
            <div className={styles.desktopToolbar}>
              <div className={styles.desktopSortWrapper}>
                <span className={styles.sortLabel}>Ordenar por</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.desktopSortSelect}
                >
                  <option value="relevance">Más relevantes</option>
                  <option value="price-asc">Menor precio</option>
                  <option value="price-desc">Mayor precio</option>
                  <option value="rating">Más calificados</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <>
                {/* Desktop Grid View */}
                <div className={styles.desktopGrid}>
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} {...product} layout="grid" />
                  ))}
                </div>

                {/* Mobile List View */}
                <div className={styles.mobileList}>
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.id} {...product} layout="list" />
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className={styles.loadMoreWrapper}>
                    <button
                      className={styles.loadMoreBtn}
                      onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    >
                      Ver {Math.min(remaining, PAGE_SIZE)} productos más
                      <span className={styles.loadMoreCount}>
                        {visibleCount} de {filteredProducts.length}
                      </span>
                    </button>
                  </div>
                )}

                {!hasMore && filteredProducts.length > PAGE_SIZE && (
                  <p className={styles.allLoadedLabel}>✓ Mostrando todos los {filteredProducts.length} resultados</p>
                )}
              </>
            ) : (
              <div className={styles.noResults}>
                <h3>No encontramos productos que coincidan con la búsqueda o filtros.</h3>
                <p>Intenta buscando con otros términos o quitando algunos de los filtros seleccionados.</p>
                <button onClick={clearAllFilters} className={styles.noResultsClearBtn}>
                  Restablecer catálogo
                </button>
              </div>
            )}
          </main>
        </div>
      </Container>

      {/* Mobile Drawer (Filters drawer slide-up modal) */}
      {isFilterDrawerOpen && (
        <div className={styles.drawerOverlay} onClick={() => setIsFilterDrawerOpen(false)}>
          <div className={styles.drawerContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <h2 className={styles.drawerTitle}>Filtrar por</h2>
              <button
                className={styles.drawerCloseBtn}
                onClick={() => setIsFilterDrawerOpen(false)}
                aria-label="Cerrar filtros"
              >
                <X size={20} />
              </button>
            </div>
            <div className={styles.drawerBody}>
              {activeChips.length > 0 && (
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-default)' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-primary)' }}>Filtros aplicados</span>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#3483fa', fontSize: '13px', fontWeight: '600' }}
                    onClick={clearAllFilters}
                  >
                    Limpiar todos
                  </button>
                </div>
              )}
              {renderSidebarFilters()}
            </div>
            <div className={styles.drawerFooter}>
              <button className={styles.drawerApplyBtn} onClick={() => setIsFilterDrawerOpen(false)}>
                Ver {filteredProducts.length} resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <Container>
        <div style={{ padding: '80px 0', textAlign: 'center' }}>
          <h2>Cargando Catálogo...</h2>
        </div>
      </Container>
    }>
      <ProductsCatalog />
    </Suspense>
  );
}
