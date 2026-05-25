import { db } from "$lib/server/db" // One import for the client
import { mistressBook, users } from "$lib/server/db/schema" // Import schemas
import { desc } from "drizzle-orm"
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
  const messages = await db
    .select()
    .from(mistressBook)
    .limit(10)
    .orderBy(desc(mistressBook.createdAt))

  // Can also query other tables
  const allUsers = await db.select().from(users)

  return { messages, users: allUsers }
}

export const actions: Actions = {
  default: async ({ request, platform }) => {
    const formData = await request.formData()
    const name = formData.get("name")
    const message = formData.get("message")
    const fetish = formData.get("fetish")
    const country = platform?.cf?.country ?? "Unknown"

    await db.insert(mistressBook).values({
      name: name as string,
      message: message as string,
      fetish: fetish as string,
      country: country as string,
    })

    return { success: true }
  },
}
