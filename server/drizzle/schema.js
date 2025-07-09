import { relations, sql } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users_table", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 20 }).notNull(),
  userName: varchar("user_name", { length: 20 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  isVerified: boolean("is_verified").default(false).notNull(),
  password: varchar({ length: 16 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const sessionsTable = mysqlTable("sessions_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  token: varchar({ length: 255 }).notNull(),
  valid: boolean().default(true).notNull(),
  userAgent: text("user_agent").notNull(),
  userIp: varchar("user_ip", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const emailTokensTable = mysqlTable("email_tokens_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  token: varchar({ length: 8 }).notNull(),
  valid: boolean().default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at")
    .default(sql`(CURRENT_TIMESTAMP + INTERVAL 5 MINUTE)`)
    .notNull(),
});

export const passwordTokensTable = mysqlTable("password_tokens_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  token: varchar({ length: 255 }).notNull(),
  valid: boolean().default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at")
    .default(sql`(CURRENT_TIMESTAMP + INTERVAL 5 MINUTE)`)
    .notNull(),
});

export const usersTableRelations = relations(usersTable, ({ many }) => ({
  session: many(sessionsTable),
  emailToken: many(emailTokensTable),
  passwordToken: many(passwordTokensTable),
}));

export const sessionsTableRelations = relations(sessionsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTable.userId],
    references: usersTable.id,
  }),
}));

export const emailTokensTableRelations = relations(
  emailTokensTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [emailTokensTable.userId],
      references: usersTable.id,
    }),
  })
);

export const passwordTokensTableRelations = relations(
  passwordTokensTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [passwordTokensTable.userId],
      references: usersTable.id,
    }),
  })
);
