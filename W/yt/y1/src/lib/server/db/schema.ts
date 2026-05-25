//------------------------------
// Main Schema file - Put all schemas in here
//------------------------------

import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

// All your tables in ONE file (or import from s2.ts)
export const mistressBook = sqliteTable("mistress_book", {
  id: integer().primaryKey(),
  name: text().notNull(),
  message: text().notNull(),
  fetish: text().notNull(),
  country: text(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

export const users = sqliteTable("users", {
  id: integer().primaryKey(),
  age: integer(),
  fetish: text(),
})
