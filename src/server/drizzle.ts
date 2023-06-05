import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
// import { Pool } from "pg";

// for query purposes
const queryClient = postgres({
  host: process.env.DB_HOST || "",
  port: 5432,
  database: "ken", // Name of database to connect to
  username: "postgres", // Username of database user
  password: "5050",
});
const db = drizzle(queryClient);

export { db };
