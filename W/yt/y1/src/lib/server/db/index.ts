import { env } from "$env/dynamic/private"
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/libsql"

const client = createClient({
  url: env.DATABASE_URL!, // Uses $env for better security
})

export const db = drizzle(client)
