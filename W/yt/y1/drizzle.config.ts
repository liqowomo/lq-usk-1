import { defineConfig } from "drizzle-kit"

if (!process.env.DATABASE_URL)
  throw new Error("BASTARD ! Local DATABASE_URL not set")

export default defineConfig({
  schema: "./src/lib/server/db/schema/**/*.ts",
  dialect: "sqlite",
  dbCredentials: { url: process.env.DATABASE_URL },
  verbose: true,
  strict: true,
})
