import type { APIRoute } from "astro"
import { getUser } from "../../../../lib/authors"

export const GET: APIRoute = async ({ params }) => {
    const username = params.username
    const userDetails = await getUser(username)
    if (!userDetails || userDetails.length === 0) {
        return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }

    delete userDetails[0].password

    return new Response(JSON.stringify(userDetails[0]), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}