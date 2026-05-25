# SvelteKit + Cloudflare D1 + Rate Limiting: Complete Tutorial

1. [SvelteKit + Cloudflare D1 + Rate Limiting: Complete Tutorial](#sveltekit--cloudflare-d1--rate-limiting-complete-tutorial)
   1. [What You'll Build](#what-youll-build)
   2. [Step 1: Initial Setup](#step-1-initial-setup)
   3. [Step 2: Configure Drizzle](#step-2-configure-drizzle)
   4. [Step 3: Create Database Schema](#step-3-create-database-schema)
   5. [Step 4: Create Database Client](#step-4-create-database-client)
   6. [Step 5: Set Up Server Hook](#step-5-set-up-server-hook)
   7. [Step 6: Configure Environment](#step-6-configure-environment)
   8. [Step 7: Generate and Run Migrations](#step-7-generate-and-run-migrations)
   9. [Step 8: Configure Cloudflare](#step-8-configure-cloudflare)
   10. [Step 9: Create D1 Database](#step-9-create-d1-database)
   11. [Step 10: Update TypeScript Types](#step-10-update-typescript-types)
   12. [Step 11: Create Page Server Logic](#step-11-create-page-server-logic)
   13. [Step 12: Create Responsive UI](#step-12-create-responsive-ui)
   14. [Issues \& Resolutions (Today's Debugging)](#issues--resolutions-todays-debugging)
       1. [❌ Issue 1: `file:` URL not supported in Cloudflare](#-issue-1-file-url-not-supported-in-cloudflare)
       2. [❌ Issue 2: Property 'DB' does not exist on type 'Env'](#-issue-2-property-db-does-not-exist-on-type-env)
       3. [❌ Issue 3: Table doesn't exist in D1](#-issue-3-table-doesnt-exist-in-d1)
       4. [❌ Issue 4: Rate limit errors on every submission](#-issue-4-rate-limit-errors-on-every-submission)
       5. [❌ Issue 5: Remote D1 used during preview](#-issue-5-remote-d1-used-during-preview)
   15. [Testing Commands](#testing-commands)
   16. [Key Takeaways](#key-takeaways)
   17. [Bundle Size (Production)](#bundle-size-production)
   18. [Next Steps](#next-steps)

## What You'll Build

A cyberpunk guestbook with D1 database, rate limiting, and responsive design - deployed globally on Cloudflare's edge network.

---

## Step 1: Initial Setup

```bash
# Create SvelteKit project
npm create svelte@latest my-guestbook
cd my-guestbook

# Install dependencies
npm install

# Install database packages
npm install drizzle-orm @libsql/client
npm install -D drizzle-kit @cloudflare/workers-types

# Install rate limiting (Cloudflare native)
# No package needed - uses wrangler.jsonc binding
```

---

## Step 2: Configure Drizzle

**`drizzle.config.ts`**:

```typescript
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/lib/server/db/schema.ts",
  dialect: "sqlite",
  out: "./src/lib/server/db/migrations",
  dbCredentials: { url: process.env.DATABASE_URL! },
})
```

---

## Step 3: Create Database Schema

**`src/lib/server/db/schema.ts`**:

```typescript
import { sql, type InferSelectModel } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const mistressBook = sqliteTable("mistress_book", {
  id: integer().primaryKey(),
  name: text().notNull(),
  message: text().notNull(),
  fetish: text().notNull(),
  country: text(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
})

export type MistressBook = InferSelectModel<typeof mistressBook>
```

---

## Step 4: Create Database Client

**`src/lib/server/db/index.ts`**:

```typescript
import { drizzle } from "drizzle-orm/d1"
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql"
import { createClient } from "@libsql/client"
import type { D1Database } from "@cloudflare/workers-types"

export const createDb = (db: D1Database) => drizzle(db)

export const createLocalDb = () => {
  const client = createClient({ url: process.env.DATABASE_URL! })
  return drizzleLibsql(client)
}
```

---

## Step 5: Set Up Server Hook

**`src/hooks.server.ts`**:

```typescript
import type { Handle } from "@sveltejs/kit"
import { createDb, createLocalDb } from "$lib/server/db"

export const handle: Handle = async ({ event, resolve }) => {
  if (event.platform?.env?.DB) {
    event.locals.db = createDb(event.platform.env.DB)
  } else {
    event.locals.db = createLocalDb()
  }
  return resolve(event)
}
```

---

## Step 6: Configure Environment

**`.env`**:

```
DATABASE_URL=file:local.db
```

---

## Step 7: Generate and Run Migrations

```bash
# Generate migration files
npx drizzle-kit generate

# Apply to local SQLite
npx drizzle-kit migrate
```

---

## Step 8: Configure Cloudflare

**`wrangler.jsonc`**:

```jsonc
{
  "name": "my-guestbook",
  "main": ".svelte-kit/cloudflare/_worker.js",
  "compatibility_date": "2026-05-25",
  "compatibility_flags": ["nodejs_compat"],
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "guestbook-db",
      "database_id": "YOUR_DATABASE_ID",
      "migrations_dir": "./src/lib/server/db/migrations",
    },
  ],
  "ratelimits": [
    {
      "name": "RATE_LIMITER",
      "namespace_id": "1001",
      "simple": { "limit": 10, "period": 60 },
    },
  ],
}
```

---

## Step 9: Create D1 Database

```bash
# Create database (save the ID)
wrangler d1 create guestbook-db

# Copy database_id to wrangler.jsonc

# Apply migrations to D1
wrangler d1 migrations apply guestbook-db --local
wrangler d1 migrations apply guestbook-db --remote
```

---

## Step 10: Update TypeScript Types

**`src/app.d.ts`**:

```typescript
import type { D1Database } from "@cloudflare/workers-types"

declare global {
  namespace App {
    interface Platform {
      env: { DB: D1Database }
    }
    interface Locals {
      db: any
    }
  }
}
export {}
```

- Note this step can be automated with the command - `wrangler types`

---

## Step 11: Create Page Server Logic

**`src/routes/+page.server.ts`**:

```typescript
import { mistressBook } from "$lib/server/db/schema"
import { desc } from "drizzle-orm"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ locals }) => {
  const messages = await locals.db
    .select()
    .from(mistressBook)
    .limit(10)
    .orderBy(desc(mistressBook.createdAt))
  return { messages }
}

export const actions: Actions = {
  default: async ({ request, locals, platform, getClientAddress }) => {
    // Rate limiting
    const rateLimiter = platform?.env?.RATE_LIMITER
    if (rateLimiter) {
      const { success } = await rateLimiter.limit({ key: getClientAddress() })
      if (!success) {
        return {
          success: false,
          error: "Too many requests. Please wait 60 seconds.",
        }
      }
    }

    // Process form
    const formData = await request.formData()
    await locals.db.insert(mistressBook).values({
      name: formData.get("name") as string,
      message: formData.get("message") as string,
      fetish: formData.get("fetish") as string,
      country: platform?.cf?.country ?? "Unknown",
    })

    return { success: true }
  },
}
```

---

## Step 12: Create Responsive UI

**`src/routes/+page.svelte`** (simplified):

```svelte
<script lang="ts">
  import { enhance } from "$app/forms";
  let { data, form } = $props();

  let name = $state("");
  let message = $state("");
  let fetish = $state("");

  $effect(() => {
    if (form?.success) {
      name = message = fetish = "";
    }
  });
</script>

<form method="POST" use:enhance>
  <input type="text" name="name" bind:value={name} required />
  <input type="text" name="fetish" bind:value={fetish} required />
  <textarea name="message" bind:value={message} required></textarea>
  <button type="submit">Submit</button>
</form>

{#each data.messages as msg}
  <div>
    <strong>{msg.name}</strong> ({msg.country})
    <p>{msg.message}</p>
    <small>Fetish: {msg.fetish}</small>
  </div>
{/each}
```

---

## Issues & Resolutions (Today's Debugging)

### ❌ Issue 1: `file:` URL not supported in Cloudflare

```
LibsqlError: URL_SCHEME_NOT_SUPPORTED: got "file:"
```

**✅ Fix:** Use D1 bindings in preview/deploy, local file only for dev

### ❌ Issue 2: Property 'DB' does not exist on type 'Env'

```
Property 'DB' does not exist on type 'Env'
```

**✅ Fix:** Update `app.d.ts` with Platform interface and run `wrangler types`

### ❌ Issue 3: Table doesn't exist in D1

```
Error: Failed query: select ... from "mistress_book"
```

**✅ Fix:** Run migrations on D1: `wrangler d1 migrations apply guestbook-db --local`

### ❌ Issue 4: Rate limit errors on every submission

```
Toast appearing on all submissions
```

**✅ Fix:** Use `$effect` to watch `form` prop instead of custom callback

### ❌ Issue 5: Remote D1 used during preview

```
Database has 0 queries in dashboard
```

**✅ Fix:** Remove `"remote": true` from wrangler.jsonc d1_databases

---

## Testing Commands

```bash
# Local development (uses local.db)
bun run dev

# Preview with D1 simulator
bun run preview

# Deploy to production
bun run deploy

# View data
sqlite3 local.db "SELECT * FROM mistress_book;"
wrangler d1 execute guestbook-db --local --command="SELECT * FROM mistress_book;"
wrangler d1 execute guestbook-db --remote --command="SELECT * FROM mistress_book;"

# Purge database
sqlite3 local.db "DELETE FROM mistress_book;"
wrangler d1 execute guestbook-db --local --command="DELETE FROM mistress_book;"
```

---

## Key Takeaways

1. **Three separate databases**: local.db (dev), Miniflare (preview), Remote D1 (production)
2. **Rate limiting is free** with Cloudflare native bindings (10 req/60 sec)
3. **Always run migrations** on each environment separately
4. **Use `$effect` to watch `form`** for post-submission actions
5. **Remove `"remote": true`** from wrangler.jsonc for proper local preview

---

## Bundle Size (Production)

- Total: ~755 KiB
- Gzipped: ~154 KiB ⚡

---

## Next Steps

- Add user authentication with BetterAuth
- Implement edit/delete messages
- Add image uploads to R2
- Set up email notifications on new messages

**You now have a globally distributed, rate-limited, cyberpunk guestbook running on Cloudflare's edge network! 🚀**
