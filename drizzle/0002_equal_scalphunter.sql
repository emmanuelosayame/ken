ALTER TABLE "contacts" RENAME COLUMN "reference" TO "name";
ALTER TABLE "contacts" RENAME COLUMN "description" TO "emailphone";
ALTER TABLE "contacts" RENAME COLUMN "amount" TO "message";
ALTER TABLE "contacts" ALTER COLUMN "name" DROP NOT NULL;
ALTER TABLE "contacts" ALTER COLUMN "emailphone" SET NOT NULL;
ALTER TABLE "contacts" ALTER COLUMN "message" SET DATA TYPE text;