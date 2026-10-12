const { PrismaClient } = require('@prisma/client');

// Singleton Prisma Client pattern to avoid exhausting PostgreSQL connection pools
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

module.exports = prisma;

