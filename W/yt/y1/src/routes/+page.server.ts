import { mistressBook } from "$lib/server/db/schema"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
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
    const ratelimit = new Ratelimit({
      redis: new Redis({
        url: platform?.env?.UPSTASH_REDIS_REST_URL,
        token: platform?.env?.UPSTASH_REDIS_REST_TOKEN,
      }),
      limiter: Ratelimit.slidingWindow(2, "7 d"),
    })

    const { success } = await ratelimit.limit(getClientAddress())

    if (!success) {
      return {
        success: false,
        error: "FUCKOFFF",
      }
    }

    const formData = await request.formData()
    const name = formData.get("name")
    const message = formData.get("message")
    const fetish = formData.get("fetish")
    const country = platform?.cf?.country ?? "Unknown"

    await locals.db.insert(mistressBook).values({
      name: name as string,
      message: message as string,
      fetish: fetish as string,
      country: country as string,
    })

    return { success: true }
  },
}
