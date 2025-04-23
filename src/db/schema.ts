import { pgTable, uuid, doublePrecision, timestamp } from "drizzle-orm/pg-core"

export const userLocations = pgTable("locations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  latitude: doublePrecision("latitude").notNull(),
  longitude: doublePrecision("longitude").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
})
