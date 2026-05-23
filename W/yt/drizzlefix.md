<h2>Drizzle Fix Bun Create</h2>

1. [Step-by-Step Fix for the Drizzle CLI Crash](#step-by-step-fix-for-the-drizzle-cli-crash)
   1. [Step 1: Create the Project Without Drizzle (Avoid the Bug Entirely)](#step-1-create-the-project-without-drizzle-avoid-the-bug-entirely)
   2. [Step 2: Install Drizzle Manually](#step-2-install-drizzle-manually)
   3. [Step 3: Create the Drizzle Config](#step-3-create-the-drizzle-config)
   4. [Step 4: Set Up Your Database Schema](#step-4-set-up-your-database-schema)
   5. [Step 5: Create the Database Client](#step-5-create-the-database-client)
   6. [Step 6: Fix wrangler.toml](#step-6-fix-wranglertoml)
   7. [Step 7: Add Package Scripts](#step-7-add-package-scripts)
   8. [Step 8: Generate and Run Migrations](#step-8-generate-and-run-migrations)
   9. [Step 9: Use Database in Your App](#step-9-use-database-in-your-app)
   10. [Step 10: Test It Works](#step-10-test-it-works)
2. [Quick Reference: If You Already Have a Broken Project](#quick-reference-if-you-already-have-a-broken-project)
3. [Common Fixes for Specific Errors](#common-fixes-for-specific-errors)

## Step-by-Step Fix for the Drizzle CLI Crash

### Step 1: Create the Project Without Drizzle (Avoid the Bug Entirely)

```bash
bun create cloudflare@latest my-app --framework=svelte
cd my-app
```

**When prompted:**

- Choose TypeScript (yes)
- Skip the addons (don't select drizzle or better-auth)
- Complete the setup

### Step 2: Install Drizzle Manually

```bash
bun add drizzle-orm
bun add -d drizzle-kit @types/node
```

### Step 3: Create the Drizzle Config

Create `drizzle.config.ts` in your project root:

```typescript
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/lib/server/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "d1-http",
})
```

### Step 4: Set Up Your Database Schema

Create `src/lib/server/schema.ts`:

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
})
```

### Step 5: Create the Database Client

Create `src/lib/server/db.ts`:

```typescript
import { drizzle } from "drizzle-orm/d1"
import type { D1Database } from "@cloudflare/workers-types"
import * as schema from "./schema"

export const createDb = (db: D1Database) => {
  return drizzle(db, { schema })
}

export type Db = ReturnType<typeof createDb>
```

### Step 6: Fix wrangler.toml

Add your D1 database binding to `wrangler.toml`:

```toml
name = "my-app"
main = ".svelte-kit/cloudflare/index.js"
compatibility_date = "2024-12-18"

[[d1_databases]]
binding = "DB"
database_name = "my-app-db"
database_id = "your-database-id"  # Create this in Cloudflare dashboard first
```

### Step 7: Add Package Scripts

Update your `package.json`:

```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "wrangler deploy",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "wrangler d1 migrations apply my-app-db",
    "cf-typegen": "wrangler types"
  }
}
```

### Step 8: Generate and Run Migrations

```bash
# Generate migration files
bun run db:generate

# Create the database in Cloudflare (first time only)
bunx wrangler d1 create my-app-db

# Run migrations
bun run db:migrate
```

### Step 9: Use Database in Your App

Example endpoint in `src/routes/api/users/+server.ts`:

```typescript
import { createDb } from "$lib/server/db"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ platform }) => {
  if (!platform?.env?.DB) {
    return new Response("DB not found", { status: 500 })
  }

  const db = createDb(platform.env.DB)
  const users = await db.query.users.findMany()

  return Response.json(users)
}
```

### Step 10: Test It Works

```bash
# Run locally
bun run dev

# Build and check for type errors
bun run build

# Deploy to Cloudflare
bun run deploy
```

## Quick Reference: If You Already Have a Broken Project

If you already created the project with Drizzle and it crashed:

```bash
# Remove broken project
rm -rf my-app

# Start fresh following steps 1-10 above
```

## Common Fixes for Specific Errors

**Type error: Cannot find namespace 'D1Database'**

```bash
bun add -d @cloudflare/workers-types
```

**Error: No migrations folder**

```bash
mkdir migrations
bun run db:generate
```

**Error: DB binding not found**
Make sure `wrangler.toml` has the D1 configuration and run:

```bash
bunx wrangler d1 execute my-app-db --command "SELECT 1"
```

This approach completely bypasses the broken CLI addon. Let me know if you hit any specific error messages and I'll help you fix them.
