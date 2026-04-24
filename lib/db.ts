// Database module - Prisma singleton pattern
// This works in both build-time and runtime

let prismaInstance: any = null;

function getPrismaClient() {
  if (typeof window !== 'undefined') {
    // Client-side: no database access
    return null;
  }

  if (prismaInstance) {
    return prismaInstance;
  }

  try {
    // Try to import Prisma Client and adapter
    const { PrismaClient } = require('@prisma/client');
    const { PrismaPg } = require('@prisma/adapter-pg');
    const { Pool } = require('pg');
    
    if (!prismaInstance) {
      const connectionString = process.env.DATABASE_URL || process.env.DIRECT_URL;
      const pool = new Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      
      prismaInstance = new PrismaClient({
        adapter,
        log:
          process.env.NODE_ENV === 'development'
            ? ['query', 'error', 'warn']
            : ['error'],
      });
    }
    return prismaInstance;
  } catch (e) {
    // Prisma not generated yet or not available
    console.warn('Prisma Client not available yet. Please run: pnpm dlx prisma generate');
    return null;
  }
}

export const prisma = getPrismaClient() || {
  // Fallback mock interface for build time
  user: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
  },
  album: {
    findMany: () => Promise.resolve([]),
    findUnique: () => Promise.resolve(null),
    create: () => Promise.resolve(null),
    update: () => Promise.resolve(null),
  },
};
