// drizzle config

import { Pool } from "pg"
import { drizzle } from "drizzle-orm/vercel-postgres"
import * as schema from "./schema"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool, { schema })
