import { defineConfig } from "drizzle-kit"

if (!process.env.DATABASE_URL)
  throw new Error("😡 BASTARD ! Local DATABASE_URL not set")

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  dialect: "sqlite",
  out: "./src/lib/server/db/migrations",
  dbCredentials: { url: process.env.DATABASE_URL },
  verbose: true,
  strict: true,
})
