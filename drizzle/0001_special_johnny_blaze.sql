ALTER TABLE "orders" ALTER COLUMN "order_status" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "order_status" SET NOT NULL;
ALTER TABLE "orders" ALTER COLUMN "paid_at" DROP DEFAULT;
ALTER TABLE "orders" ALTER COLUMN "paid_at" DROP NOT NULL;
ALTER TABLE "orders" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;