<h2> Deploy to CloudFlare for asssucking </h2>

1. [Deploy SvelteKit to Cloudflare Workers - The Right Way](#deploy-sveltekit-to-cloudflare-workers---the-right-way)
   1. [Prerequisites](#prerequisites)
   2. [Step 1: Create SvelteKit Project](#step-1-create-sveltekit-project)
   3. [Step 2: Install Cloudflare Adapter](#step-2-install-cloudflare-adapter)
   4. [Step 3: Update `svelte.config.js`](#step-3-update-svelteconfigjs)
   5. [Step 4: Run Wrangler Setup (Auto-Configures Everything)](#step-4-run-wrangler-setup-auto-configures-everything)
   6. [Step 5: Fix the TypeScript Error (CRITICAL)](#step-5-fix-the-typescript-error-critical)
   7. [Step 6: Set Your API Token](#step-6-set-your-api-token)
   8. [Step 7: Build and Deploy](#step-7-build-and-deploy)
   9. [Step 8: Visit Your Site](#step-8-visit-your-site)
   10. [Complete Copy-Paste Script](#complete-copy-paste-script)
   11. [Summary of Commands After Setup](#summary-of-commands-after-setup)
   12. [Troubleshooting](#troubleshooting)
   13. [One-Time vs Every Time](#one-time-vs-every-time)

---

# Deploy SvelteKit to Cloudflare Workers - The Right Way

## Prerequisites

- Cloudflare account (free)
- API Token from https://dash.cloudflare.com/profile/api-tokens (needs "Edit Cloudflare Workers" permission)

---

## Step 1: Create SvelteKit Project

```bash
bun create svelte@latest my-app
cd my-app
bun install
```

---

## Step 2: Install Cloudflare Adapter

```bash
bun add -D @sveltejs/adapter-cloudflare
```

---

## Step 3: Update `svelte.config.js`

Replace the entire file:

```javascript
import adapter from "@sveltejs/adapter-cloudflare"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

export default {
  kit: {
    adapter: adapter(),
  },
  preprocess: vitePreprocess(),
}
```

---

## Step 4: Run Wrangler Setup (Auto-Configures Everything)

```bash
bunx wrangler setup
```

**What this does:**

- Creates `wrangler.toml` or `wrangler.jsonc`
- Updates `package.json` with correct scripts
- Detects SvelteKit and sets output to `.svelte-kit/cloudflare`

**Answer the prompts:**

- Worker name: `my-app` (or whatever you want)
- Framework: `SvelteKit` (auto-detected)
- Output directory: `.svelte-kit/cloudflare` (auto-filled)

---

## Step 5: Fix the TypeScript Error (CRITICAL)

After `wrangler setup` finishes, open `package.json` and find the `build` script.

**Change this:**

```json
"build": "wrangler types --check && vite build"
```

**To this:**

```json
"build": "wrangler types && vite build"
```

Why? The `--check` flag fails on first run because the types file doesn't exist yet. Removing `--check` makes it generate the file automatically.

---

## Step 6: Set Your API Token

```bash
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

> **Don't use `wrangler login` in CodeSpaces/headless environments** - it will fail with `xdg-open` error.

---

## Step 7: Build and Deploy

```bash
bun run build
bun run deploy
```

---

## Step 8: Visit Your Site

Open the URL shown in the output:

```
https://my-app.your-subdomain.workers.dev
```

---

## Complete Copy-Paste Script

```bash
# 1. Create project
bun create svelte@latest my-app
cd my-app
bun install

# 2. Install adapter
bun add -D @sveltejs/adapter-cloudflare

# 3. Update svelte.config.js (MANUAL - edit the file)
# ... paste the adapter config ...

# 4. Run wrangler setup
bunx wrangler setup

# 5. Fix the build script in package.json (MANUAL - edit the file)
# Change "wrangler types --check && vite build"
# To   "wrangler types && vite build"

# 6. Set API token
export CLOUDFLARE_API_TOKEN="your-token-here"

# 7. Deploy
bun run build
bun run deploy
```

---

## Summary of Commands After Setup

| Action               | Command           |
| -------------------- | ----------------- |
| Local dev            | `bun run dev`     |
| Build                | `bun run build`   |
| Local preview        | `bun run preview` |
| Deploy to Cloudflare | `bun run deploy`  |

---

## Troubleshooting

| Problem                             | Solution                                               |
| ----------------------------------- | ------------------------------------------------------ |
| `xdg-open` error                    | Use API token, not `wrangler login`                    |
| `worker-configuration.d.ts` missing | Fix the build script (Step 5)                          |
| Build fails after fix               | Run `bunx wrangler types` manually once                |
| "No such file"                      | Make sure adapter is installed before `wrangler setup` |

---

## One-Time vs Every Time

**One-time setup:**

- Steps 1-5

**Every deploy:**

```bash
export CLOUDFLARE_API_TOKEN="your-token"
bun run deploy
```

---

That's it. No more `xdg-open` errors, no more TypeScript shiii. Just deploy. 🚀
