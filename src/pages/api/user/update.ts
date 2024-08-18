import type { APIRoute } from "astro"
import { getUser } from "../../../lib/authors"
import { User, db, sql } from "astro:db"

export const POST: APIRoute = async ({ locals, request }) => {
    const user = locals.user
    const userDetails = await getUser(user.username)
    const { newdisplayname, newprofilepic } = await request.json()

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
            "Content-Type": "application/json",
            },
        })
    }

    try {
        await db.update(User).set({
            displayname: newdisplayname,
            profilepic: newprofilepic
        }).where(sql`username = ${user.username}`)
        return new Response(JSON.stringify({ message: 'Profile updated successfully' + userDetails[0] }), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
}