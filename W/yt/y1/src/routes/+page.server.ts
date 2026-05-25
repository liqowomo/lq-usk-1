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
    // Rate limiting - get client IP address
    const clientIp = getClientAddress()
    const rateLimiter = platform?.env?.RATE_LIMITER

    if (rateLimiter) {
      const { success } = await rateLimiter.limit({ key: clientIp })

      if (!success) {
        return {
          success: false,
          error: "STOP!!!!",
        }
      }
    }

    // Process the form submission
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
