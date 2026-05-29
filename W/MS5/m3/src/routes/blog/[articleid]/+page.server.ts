// ---------------------------------------
// Server Load Function Function
// ---------------------------------------

import { error } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
  const blogArticles = [
    {
      id: "0",
      text: "First Smell Panty Post",
    },
    {
      id: "1",
      text: "Second Panty",
    },
  ]

  const foundArticle = blogArticles.find(
    (article) => article.id === params.articleid,
  )

  if (foundArticle) {
    return {
      blogPost: foundArticle.text,
    }
  }

  throw error(404, "Fuck off No Article")
}
