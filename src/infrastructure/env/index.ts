import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_SCHEMA: z.string(),
})

const isValid = envSchema.safeParse(process.env)

if (!isValid.success) {
  console.error(isValid.error.flatten().fieldErrors)
  throw new Error('Environment variables not found')
}

const env = isValid.data

export { env }
