DO $$ BEGIN
 CREATE TYPE "tag" AS ENUM('shawarma', 'barbeque', 'drink', 'hotdog');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "order_status" AS ENUM('pending', 'paid', 'prepared', 'delivered', 'issues');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "payment_status" AS ENUM('pending', 'success', 'failed', 'cancelled', 'refund');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"emailphone" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "customers" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(256),
	"phone" varchar(256),
	"location" text
);

CREATE TABLE IF NOT EXISTS "guests" (
	"id" varchar(40) PRIMARY KEY NOT NULL,
	"full_name" text,
	"email" varchar(256),
	"phone" varchar(256),
	"location" text
);

CREATE TABLE IF NOT EXISTS "items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" integer NOT NULL,
	"description" text,
	"tag" tag NOT NULL
);

CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"uid" text,
	"reference" text,
	"total" integer NOT NULL,
	"description" text,
	"order_status" order_status NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"paid_at" timestamp
);

CREATE TABLE IF NOT EXISTS "payments" (
	"id" serial PRIMARY KEY NOT NULL,
	"reference" text NOT NULL,
	"amount" integer NOT NULL,
	"description" text,
	"payment_status" payment_status,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"settled_at" timestamp
);

CREATE UNIQUE INDEX IF NOT EXISTS "title_idx" ON "items" ("title");
CREATE UNIQUE INDEX IF NOT EXISTS "reference_idx" ON "payments" ("reference");