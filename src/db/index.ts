import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'
import { env } from 'src/env'
import * as schema from './schema'

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  private client: Client
  private db: ReturnType<typeof drizzle>

  constructor() {
    this.client = new Client({
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
    })

    this.db = drizzle(this.client, { schema, logger: true })
  }

  async onModuleInit() {
    await this.client.connect()
    console.log('Database connected')
  }

  async onModuleDestroy() {
    await this.client.end()
    console.log('Database connection closed')
  }

  get database() {
    return this.db
  }
}
