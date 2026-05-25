// --------------
// Index.ts - Which to be used for both local dev and remote dev
// --------------

import type { D1Database } from "@cloudflare/workers-types"
import { createClient } from "@libsql/client"
import { drizzle } from "drizzle-orm/d1"
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql"

// For Cloudflare Workers environment (preview/deploy)
export const createDb = (db: D1Database) => drizzle(db)

// For local development (bun dev)
export const createLocalDb = () => {
  const client = createClient({
    url: process.env.DATABASE_URL!, // file:local.db
  })
  return drizzleLibsql(client)
}
