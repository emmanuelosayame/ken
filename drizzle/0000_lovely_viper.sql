CREATE TABLE IF NOT EXISTS "carts" (
	"id" serial PRIMARY KEY NOT NULL,
	"quantity" integer DEFAULT 0,
	"uid" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(256),
	"phone" varchar(256),
	"location" text
);

CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"price" integer NOT NULL,
	"description" text
);

CREATE UNIQUE INDEX IF NOT EXISTS "title_idx" ON "items" ("title");