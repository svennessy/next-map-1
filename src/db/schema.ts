import { pgTable, serial, text, doublePrecision } from 'drizzle-orm/pg-core'

export const markers = pgTable('markers', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  lat: doublePrecision('lat').notNull(),
  lng: doublePrecision('lng').notNull(),
})