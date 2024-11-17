import { relations } from 'drizzle-orm'
import { char, integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const personTable = pgTable('persons', {
  id: char('id', { length: 24 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  age: integer('age').notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  password: varchar('password', { length: 100 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
})

export const personRelations = relations(personTable, ({ many }) => ({
  addresses: many(addressTable),
}))

export const addressTable = pgTable('addresses', {
  id: char('id', { length: 24 }).primaryKey().notNull(),
  street: varchar('street', { length: 150 }).notNull(),
  homeNumber: varchar('home_number', { length: 30 }),
  district: varchar('district', { length: 150 }).notNull(),
  zipNumber: varchar('zip_number', { length: 50 }).notNull(),
  personId: char('person_id', { length: 32 })
    .references(() => personTable.id)
    .notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull(),
})

export const addressRelations = relations(addressTable, ({ one }) => ({
  person: one(personTable, {
    fields: [addressTable.personId],
    references: [personTable.id],
  }),
}))
