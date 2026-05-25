//----------------------
// Server endoint for form - during sugbmission
//----------------------

// --- Impors ---

import { db } from "$lib/server/db";
import { mistressBook } from "$lib/server/db/s2";
import { desc } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";

// -- Code Sectio ---

export const load: PageServerLoad = async () => {
  const messages = await db
    .select()
    .from(mistressBook)
    .limit(10)
    .orderBy(desc(mistressBook.createdAt))

  return {
    messages,
  }
}

export const actions: Actions = {
  default: async ({ request, platform }) => {
    const formData = await request.formData()
    const name = formData.get("name")
    const message = formData.get("message")
    const country = platform?.cf?.country ?? "Unknown"

    await db.insert(mistressBook).values({
      name: name as string,
      message: message as string,
      country: country as string,
    })

    return { success: true }
  },
}
