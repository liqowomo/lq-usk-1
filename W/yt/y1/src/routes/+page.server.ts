import { mistressBook } from "$lib/server/db/schema"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis/cloudflare"
import { desc } from "drizzle-orm"
import type { Actions, PageServerLoad } from "./$types"

// Cache ratelimit instance
let ratelimitInstance: Ratelimit | null = null

// Upstash Ratelimit Helper  -
// You need to -  wrangler secret put UPSTASH_REDIS_REST_TOKEN & wrangler secret put UPSTASH_REDIS_REST_URL
// Make sure creds Read and Write or error

function getRatelimit(platform: App.Platform | undefined) {
  if (ratelimitInstance) return ratelimitInstance

  // Check if platform exists and has credentials
  const url = platform?.env?.UPSTASH_REDIS_REST_URL
  const token = platform?.env?.UPSTASH_REDIS_REST_TOKEN

  if (!url || !token) {
    console.warn(
      "⚠️ Rate limiting disabled: Upstash credentials not configured",
    )
    return null
  }

  try {
    ratelimitInstance = new Ratelimit({
      redis: new Redis({ url, token }),
      limiter: Ratelimit.slidingWindow(2, "7 d"),
    })
    return ratelimitInstance
  } catch (error) {
    console.error("Failed to initialize rate limiter:", error)
    return null
  }
}

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
    // Pass platform to getRatelimit (it handles undefined)
    const ratelimit = getRatelimit(platform)

    // Only apply rate limiting if configured
    if (ratelimit) {
      const { success, reset } = await ratelimit.limit(getClientAddress())

      if (!success) {
        const secondsToWait = Math.ceil((reset - Date.now()) / 1000)
        return {
          success: false,
          error: `Rate limit exceeded. Please wait ${secondsToWait} seconds before posting again.`,
        }
      }
    }

    // Process form
    const formData = await request.formData()
    const name = formData.get("name")
    const message = formData.get("message")
    const fetish = formData.get("fetish")
    const country = platform?.cf?.country ?? "Unknown"

    // Validate required fields
    if (!name || !message || !fetish) {
      return {
        success: false,
        error: "All fields are required.",
      }
    }

    await locals.db.insert(mistressBook).values({
      name: name as string,
      message: message as string,
      fetish: fetish as string,
      country: country as string,
    })

    return { success: true }
  },
}
