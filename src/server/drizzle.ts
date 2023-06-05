import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { Pool } from "pg";

// for query purposes
const queryClient = postgres({
  host: process.env.DB_HOST || "",
  port: Number(process.env.DB_PORT || "5432"),
  database: process.env.DB_DATABASE || "ken", // Name of database to connect to
  username: process.env.DB_USER || "postgres", // Username of database user
  password: process.env.DB_PASSWORD || "",
});
const db = drizzle(queryClient);

export { db };
