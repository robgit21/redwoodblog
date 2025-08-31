// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

// Workaround for SSL/TLS issue on Netlify with PostgreSQL.
// The `sslmode=no-verify` parameter tells the Prisma client to not verify the SSL certificate,
// which is often necessary in serverless environments.
let dbUrl = process.env.DATABASE_URL
if (dbUrl && !dbUrl.includes('sslmode')) {
  dbUrl += '?sslmode=no-verify'
}

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: dbUrl,
    },
  },
  log: emitLogLevels(['info', 'warn', 'error']),
})

handlePrismaLogging({
  db: prismaClient,
  logger,
  logLevels: ['info', 'warn', 'error'],
})

/**
 * Global Prisma client extensions should be added here, as $extend
 * returns a new instance.
 * export const db = prismaClient.$extend(...)
 * Add any .$on hooks before using $extend
 */
export const db = prismaClient
