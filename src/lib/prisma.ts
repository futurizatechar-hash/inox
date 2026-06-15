/**
 * Prisma Client Singleton
 *
 * Previene múltiples instancias de Prisma Client en desarrollo
 * (hot-reload crea nuevas conexiones si no se usa singleton).
 *
 * Prisma 7: La conexión se configura via prisma.config.ts
 *
 * Uso:
 *   import { prisma } from '@/lib/prisma';
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
