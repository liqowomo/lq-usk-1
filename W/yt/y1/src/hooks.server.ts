import { createDb, createLocalDb } from "$lib/server/db"
import type { Handle } from "@sveltejs/kit"

export const handle: Handle = async ({ event, resolve }) => {
  // Log what's available
  console.log("Platform exists:", !!event.platform)
  console.log("DB binding exists:", !!event.platform?.env?.DB)
  console.log("DATABASE_URL:", process.env.DATABASE_URL)

  if (event.platform?.env?.DB) {
    console.log("✅ Using D1 database binding")
    event.locals.db = createDb(event.platform.env.DB)
  } else {
    console.log("⚠️ No D1 binding found, falling back to local SQLite")
    // This will fail in preview because file: URLs aren't supported
    event.locals.db = createLocalDb()
  }

  return resolve(event)
}
