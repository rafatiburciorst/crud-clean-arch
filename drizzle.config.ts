import { defineConfig } from 'drizzle-kit'
import { env } from 'src/infrastructure/env'

export default defineConfig({
  out: './drizzle',
  schema: './src/infrastructure/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
