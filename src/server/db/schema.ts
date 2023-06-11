import { InferModel } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

// declaring enum in database
// export const popularityEnum = pgEnum("popularity", [
//   "unknown",
//   "known",
//   "popular",
// ]);

export const orderStatusEnum = pgEnum("orderStatus", [
  "pending",
  "success",
  "settled",
  "failed",
  "cancelled",
]);

// export const userS = pgTable("users", {
//   id: serial("id").primaryKey(),
//   fullName: text("full_name"),
//   phone: varchar("phone", { length: 256 }),
// });

export const contactS = pgTable("contacts", {
  id: serial("id").primaryKey(),
  email: text("reference").notNull(),
  phone: integer("amount").notNull(),
  message: text("description"),
  created_at: date("created_at").defaultNow().notNull(),
});

export const paymentS = pgTable(
  "payments",
  {
    id: serial("id").primaryKey(),
    reference: text("reference").notNull(),
    amount: integer("amount").notNull(),
    description: text("description"),
    // status: orderStatusEnum,
    created_at: date("created_at").defaultNow().notNull(),
    settled_at: date("settled_at"),
  },
  (payment) => {
    return {
      nameIndex: uniqueIndex("order_id_idx").on(payment.reference),
    };
  }
);

export const orderS = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    orderId: text("order_id").notNull(),
    total: integer("total").notNull(),
    description: text("description"),
    // status: orderStatusEnum,
    paid_at: date("paid_at").defaultNow().notNull(),
  },
  (order) => {
    return {
      nameIndex: uniqueIndex("order_id_idx").on(order.orderId),
    };
  }
);

export const cartS = pgTable("carts", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").default(0).notNull(),
  uid: varchar("uid").notNull(),
});

export const itemS = pgTable(
  "items",
  {
    id: serial("id").primaryKey(),
    title: text("title"),
    price: integer("price").notNull(),
    description: text("description"),
    // sold: integer("sold"),
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

export type Customer = InferModel<typeof customerS>;
export type Item = InferModel<typeof itemS>;
export type Cart = Omit<InferModel<typeof cartS>, "uid">;

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
