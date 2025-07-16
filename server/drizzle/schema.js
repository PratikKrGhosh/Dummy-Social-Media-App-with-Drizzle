import {
  boolean,
  int,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users_table", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 15 }).notNull(),
  userName: varchar("user_name", { length: 15 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  isVerified: boolean("is_verified").default(false).notNull().unique(),
  password: varchar({ length: 15 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
