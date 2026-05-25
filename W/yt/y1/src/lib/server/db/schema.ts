// ----------------------------------
// schema.ts - Here you define the tables - Default schema
// ----------------------------------

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  age: integer("age"),

  fetish: text("fetish"),
})
