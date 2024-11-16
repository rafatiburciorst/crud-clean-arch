import { char, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const person = pgTable('persons', {
  id: char('id', { length: 32 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})
