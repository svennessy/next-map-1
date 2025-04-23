// drizzle.config.ts
import "dotenv.local/config";
import type { Config } from "drizzle-kit";
import { parse } from "pg-connection-string";

// Parse NEON connection string
const connection = parse(process.env.DATABASE_URL!);

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: connection.host!,
    port: Number(connection.port),
    user: connection.user!,
    password: connection.password!,
    database: connection.database!,
  },
} satisfies Config;