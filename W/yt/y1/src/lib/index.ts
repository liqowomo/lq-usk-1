// place files you want to import through the `$lib` alias in this folder.
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

const client = createClient({
  url: process.env.DATABASE_URL!,
})

export const db = drizzle(client)
