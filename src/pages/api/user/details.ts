import type { APIRoute } from "astro"
import { getUser } from "../../../lib/authors"

export const GET: APIRoute = async ({ locals }) => {
  const user = locals.user
  const userDetails = await getUser(user.username)
  delete userDetails[0].password

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return new Response(JSON.stringify(userDetails[0]), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}