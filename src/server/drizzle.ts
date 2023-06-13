import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { Pool } from "pg";

const queryClient = postgres({
  host: process.env.PGHOST || "",
  port: Number(process.env.PGPORT || "5432"),
  username: process.env.PGUSER || "postgres", // Username of database user
  password: process.env.PGPASSWORD || "8080",
  database: process.env.PGDATABASE || "ken",
});

const db = drizzle(queryClient, {
  logger: process.env.NODE_ENV === "development" ? true : undefined,
});

export { db };
