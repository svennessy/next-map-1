import { pgTable, serial, real } from 'drizzle-orm/pg-core';

// Define the locations table schema
export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  latitude: real('latitude'),  // Use 'real' for float precision
  longitude: real('longitude'), // Use 'real' for float precision
});