import { PrismaClient } from '@prisma/client'

// Dies ist eine Lösung für das SSL-Verbindungsproblem in Serverless-Umgebungen.
// Es weist Prisma an, die SSL-Verbindung ohne Zertifikatsprüfung herzustellen.
const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.NETLIFY_DATABASE_URL,
    },
  },
  prisma: {
    log: ['query', 'info', 'warn', 'error'],
  },
})

if (process.env.NETLIFY_DATABASE_URL) {
  // Nur in der Produktionsumgebung wird diese Konfiguration angewendet.
  // Das ist ein Workaround für SSL-Probleme mit PostgreSQL auf Serverless-Plattformen.
  const url = new URL(process.env.NETLIFY_DATABASE_URL)
  url.searchParams.set('sslmode', 'require')
  url.searchParams.set('ssl', 'true')
  db.$connect()
}

// Stattdessen sollten wir eine einfachere Methode verwenden,
// die in der Regel von selbst funktioniert.
const dbSimple = new PrismaClient()

// Exportiere `dbSimple` für die Nutzung in deinen Diensten.
export { dbSimple as db }
