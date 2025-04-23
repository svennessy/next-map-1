import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// Set up the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Postgres connection string
});

export const db = drizzle(pool);