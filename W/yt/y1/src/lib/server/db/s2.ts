// ----------------------------------
// s2.ts - schema is for the tutorial
// ----------------------------------

import { createClient } from "@libsql/client"
import { sql, type InferSelectModel } from "drizzle-orm"
import { drizzle } from "drizzle-orm/better-sqlite3"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const mistressBook = sqliteTable("mistress_book", {
  id: integer().primaryKey(),
  name: text().notNull(),
  message: text().notNull(),
  fetish: text().notNull(),
  country: text(),
  createdAt: text("created_at", { mode: "text" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export type MistressBook = InferSelectModel<typeof mistressBook>

// Create and export db instance
const client = createClient({
  url: process.env.DATABASE_URL!,
})

export const db = drizzle(client)
