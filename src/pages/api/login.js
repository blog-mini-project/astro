export const prerender = false

import { User, sql, db } from "astro:db"
import { lucia } from "../../lib/auth"

export async function POST({ request }) {
    const { username, password } = await request.json()
    const existingUser = await db
        .select()
        .from(User)
        .where(sql`username = ${username} and password = ${password}`)
        .get()

    if (existingUser) {
        const session = await lucia.createSession(existingUser.username, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        await db.insert(Session).values({ id: session.id, user_id: existingUser.username, expires_at: session.expires_at })

        return new Response(JSON.stringify({
            success: true,
            sessionCookie: sessionCookie
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    } else {
        return new Response(JSON.stringify({
            success: false,
            message: "Invalid username or password"
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}