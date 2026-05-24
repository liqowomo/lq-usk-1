# Complete Step-by-Step Guide: SvelteKit + Cloudflare + Drizzle (2026)

Based on current Cloudflare and Svelte documentation, here's a fresh start-to-finish guide that works around the known Drizzle add-on issue and uses modern configuration (no `wrangler.toml`).

## The Problem You Encountered

You hit a known bug where the Svelte CLI's Drizzle add-on fails with an "Unexpected token" error when creating a project with Cloudflare D1 . This happens because the auto-generated database connection code conflicts with how Cloudflare bindings work. The solution is to set up the project first, then add Drizzle manually.

---

## Step 1: Create the SvelteKit Project with `create-cloudflare`

Use Cloudflare's C3 CLI to create the project. This automatically installs the Cloudflare adapter and Wrangler:

```bash
bun create cloudflare@latest my-svelte-app --framework=svelte
```

During setup, when prompted:

- Choose your SvelteKit template (recommend: "SvelteKit minimal" or "SvelteKit demo")
- Select TypeScript when asked

After creation, navigate into the project:

```bash
cd my-svelte-app
```

**What this gives you:** The Cloudflare adapter (`@sveltejs/adapter-cloudflare`) pre-installed, Wrangler configured, and a project ready for Cloudflare deployment .

---

## Step 2: Install Drizzle and Dependencies

Now add Drizzle manually (bypassing the broken CLI add-on):

```bash
# Core Drizzle packages
bun add drizzle-orm

# Drizzle Kit (for migrations)
bun add -d drizzle-kit

# For local SQLite testing (optional but recommended)
bun add @libsql/client
```

---

## Step 3: Create the Database Schema

Create your Drizzle schema file:

```typescript
// src/lib/server/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).$default(
    () => new Date(),
  ),
})

// Add more tables as needed
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
```

---

## Step 4: Create Database Connection Utilities

This is the crucial part that avoids the CLI bug. You need separate utilities for local testing and D1:

```typescript
// src/lib/server/db/index.ts
import type { D1Database } from "@cloudflare/workers-types"
import { drizzle as drizzleD1 } from "drizzle-orm/d1"

// For use in Cloudflare Workers/Pages (production + D1 local)
export const createDb = (database: D1Database) => drizzleD1(database)
```

```typescript
// src/lib/server/db/local.ts (for local SQLite testing only)
import { drizzle } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"

const client = createClient({
  url: "file:./local.db", // Simple SQLite file in project root
})

export const localDb = drizzle(client)
```

---

## Step 5: Configure Drizzle Kit

Create `drizzle.config.ts` in the project root:

```typescript
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "d1-http", // Required for D1 compatibility
  dbCredentials: {
    url: "file:./local.db", // Fallback for local SQLite
  },
})
```

---

## Step 6: Configure wrangler.jsonc (No wrangler.toml!)

Create `wrangler.jsonc` in your project root. Note the `.jsonc` extension - this allows comments:

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "my-svelte-app",
  "compatibility_date": "2026-04-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": ".svelte-kit/cloudflare",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "my-app-db",
      "database_id": "your-database-id-from-step-8"
    }
  ],
  "observability": {
    "enabled": true
  }
}
```

**Important:** The `database_id` will be filled after you create the D1 database in Step 8.

---

## Step 7: Set Up package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "bun run build && wrangler dev",
    "deploy": "bun run build && wrangler deploy",
    "cf-typegen": "wrangler types ./src/worker-configuration.d.ts",

    "db:generate": "drizzle-kit generate",

    "db:local:push": "drizzle-kit push",
    "db:local:studio": "drizzle-kit studio",
    "db:local:reset": "rm -f local.db && rm -rf .drizzle",

    "db:d1:setup": "wrangler d1 create my-app-db",
    "db:d1:setup:local": "wrangler d1 create my-app-db --local",
    "db:d1:migrate": "bun run db:generate && wrangler d1 migrations apply my-app-db --remote",
    "db:d1:migrate:local": "bun run db:generate && wrangler d1 migrations apply my-app-db --local"
  }
}
```

---

## Step 8: Create and Configure the D1 Database

### First, create the D1 database:

```bash
# Create local D1 database (for testing)
bun run db:d1:setup:local

# Create remote D1 database (for production)
bun run db:d1:setup
```

When you run `bun run db:d1:setup`, Wrangler will output a database ID. Copy this ID and paste it into the `database_id` field in your `wrangler.jsonc` file .

---

## Step 9: Access D1 in Your SvelteKit App

In your SvelteKit endpoints, access the D1 binding via the `platform` object:

```typescript
// src/routes/api/users/+server.ts
import { json } from "@sveltejs/kit"
import { createDb } from "$lib/server/db"
import { users } from "$lib/server/db/schema"

export async function GET({ platform }) {
  const db = createDb(platform.env.DB)
  const allUsers = await db.select().from(users)
  return json(allUsers)
}

export async function POST({ request, platform }) {
  const db = createDb(platform.env.DB)
  const data = await request.json()
  const newUser = await db.insert(users).values(data).returning()
  return json(newUser)
}
```

For using D1 in `+page.server.ts` or `+layout.server.ts` files:

```typescript
// src/routes/+page.server.ts
import { createDb } from "$lib/server/db"
import { users } from "$lib/server/db/schema"

export async function load({ platform }) {
  const db = createDb(platform.env.DB)
  const usersList = await db.select().from(users)
  return { users: usersList }
}
```

---

## Step 10: Development Workflows

### Option A: Local SQLite for Fast Development

Use this when you don't need Cloudflare bindings:

```bash
# Create/update local database
bun run db:local:push

# Open Drizzle Studio to view data
bun run db:local:studio

# Run dev server
bun run dev
```

### Option B: Local D1 (Cloudflare Emulation)

Use this to test with actual Cloudflare bindings locally:

```bash
# Run migrations on local D1
bun run db:d1:migrate:local

# Start preview server with D1 bindings
bun run preview
```

While `wrangler dev` is running, press `e` in the terminal to open **Local Explorer** - a browser-based interface at `/cdn-cgi/explorer` where you can browse tables, run SQL queries, and edit data in your local D1 database .

### Option C: Production Deployment

```bash
# Run migrations on remote D1
bun run db:d1:migrate

# Deploy to Cloudflare
bun run deploy
```

---

## Complete File Structure

After following this guide, your project should look like:

```
my-svelte-app/
├── src/
│   ├── lib/
│   │   └── server/
│   │       └── db/
│   │           ├── index.ts          # D1 connection factory
│   │           ├── local.ts          # Local SQLite connection
│   │           └── schema.ts         # Your Drizzle schema
│   ├── routes/
│   │   ├── +page.server.ts           # Loader with D1 access
│   │   └── api/
│   │       └── users/
│   │           └── +server.ts        # API endpoint with D1
│   └── app.html
├── drizzle/
│   └── migrations/                   # Generated migrations
├── wrangler.jsonc                    # Cloudflare config (no .toml!)
├── drizzle.config.ts                 # Drizzle Kit config
├── svelte.config.js                  # Already has Cloudflare adapter
├── package.json
└── tsconfig.json
```

---

## Summary of Commands

| Command                       | Purpose                          |
| ----------------------------- | -------------------------------- |
| `bun run db:generate`         | Generate migrations from schema  |
| `bun run db:local:push`       | Push schema to local SQLite      |
| `bun run db:local:studio`     | Open Drizzle Studio for local DB |
| `bun run db:d1:migrate:local` | Run migrations on local D1       |
| `bun run db:d1:migrate`       | Run migrations on production D1  |
| `bun run dev`                 | Start dev server (SQLite only)   |
| `bun run preview`             | Preview with D1 bindings         |
| `bun run deploy`              | Deploy to Cloudflare             |

This setup avoids the CLI bug entirely while giving you full control over both local development and Cloudflare D1 production deployment.
