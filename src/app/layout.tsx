import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'INOX | Bachas y Mesadas de Acero Inoxidable',
    template: '%s | INOX',
  },
  description:
    'Tienda online de bachas de cocina, mesadas y accesorios de acero inoxidable. Calidad premium, envíos a todo el país. ¡Comprá ahora!',
  keywords: [
    'bachas de acero inoxidable',
    'mesadas de acero inoxidable',
    'bachas de cocina',
    'piletas de cocina',
    'accesorios cocina acero inoxidable',
    'INOX',
  ],
  authors: [{ name: 'INOX' }],
  creator: 'INOX',
  metadataBase: new URL('https://inox.com.ar'),
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'INOX',
    title: 'INOX | Bachas y Mesadas de Acero Inoxidable',
    description:
      'Tienda online de bachas de cocina, mesadas y accesorios de acero inoxidable. Calidad premium, envíos a todo el país.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INOX | Bachas y Mesadas de Acero Inoxidable',
    description:
      'Tienda online de bachas de cocina, mesadas y accesorios de acero inoxidable.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { AdBar } from '@/components/layout/AdBar/AdBar';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer/Footer';
import { CartProvider } from '@/context/CartContext';
import { CartDrawer } from '@/components/cart/CartDrawer/CartDrawer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-AR" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <AdBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
