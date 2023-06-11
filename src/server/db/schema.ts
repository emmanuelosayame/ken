import { InferModel } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "prepared",
  "delivered",
  "issues",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "success",
  "failed",
  "cancelled",
  "refund",
]);

export const itemTagEnum = pgEnum("tag", [
  "shawarma",
  "barbeque",
  "drink",
  "hotdog",
]);

export const contactS = pgTable("contacts", {
  id: serial("id").primaryKey(),
  email: text("reference").notNull(),
  phone: integer("amount").notNull(),
  message: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const paymentS = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    reference: text("reference").notNull(),
    amount: integer("amount").notNull(),
    description: text("description"),
    status: paymentStatusEnum("payment_status"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    settled_at: timestamp("settled_at"),
  },
  (payment) => {
    return {
      nameIndex: uniqueIndex("reference_idx").on(payment.reference),
    };
  }
);

export const orderS = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull(),
  reference: text("reference"),
  total: integer("total").notNull(),
  description: text("description"),
  status: orderStatusEnum("order_status").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  paid_at: timestamp("paid_at"),
});

export const itemS = pgTable(
  "items",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    price: integer("price").notNull(),
    description: text("description"),
    tag: itemTagEnum("tag").notNull(),
  },
  (item) => {
    return {
      nameIndex: uniqueIndex("title_idx").on(item.title),
    };
  }
);

export const customerS = pgTable("customers", {
  id: varchar("id", { length: 40 }).primaryKey(),
  fullName: text("full_name"),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  location: text("location"),
});

export const guestS = pgTable("guests", {
  id: varchar("id", { length: 40 }).primaryKey(),
  fullName: text("full_name"),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  location: text("location"),
});

export type Customer = InferModel<typeof customerS>;
export type Item = InferModel<typeof itemS>;
export type Order = InferModel<typeof orderS>;
// export type Cart = Omit<InferModel<typeof cartS>, "uid">;

// export const orderS = pgTable("users", {
//   id: serial("id").primaryKey(),
//   fullName: text("full_name"),
//   phone: varchar("phone", { length: 256 }),
//   count: integer("count").notNull(),
// });

// export const cities = pgTable("cities", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 256 }),
//   countryId: integer("country_id").references(() => countries.id),
//   popularity: popularityEnum("popularity"),
// });
