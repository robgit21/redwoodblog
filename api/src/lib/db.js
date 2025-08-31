// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

// This is a more robust workaround for SSL/TLS issues with Netlify and PostgreSQL.
// It correctly appends the `sslmode=no-verify` parameter without corrupting the URL
// in case it already contains query parameters.
let dbUrl = process.env.DATABASE_URL
if (dbUrl) {
  const hasParams = dbUrl.includes('?')
  const sslParam = 'sslmode=no-verify'
  if (!dbUrl.includes(sslParam)) {
    dbUrl += hasParams ? `&${sslParam}` : `?${sslParam}`
  }
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
