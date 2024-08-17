export const prerender = false

import { Author, sql, db } from "astro:db"
import { lucia } from "../../lib/auth"

export async function POST({ request }) {
    const { username, password, displayname, profilepic } = await request.json()
    const existingUser = await db
        .select()
        .from(Author)
        .where(sql`username = ${username}`)
        .get()

    if (existingUser) {
        return new Response(JSON.stringify({
            success: false,
            message: "Username already exists"
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    } else {
        const newUser = await db
            .insert(Author)
            .values({ username, password, displayname, profilepic })
            .returning()
            .get()

        const session = await lucia.createSession(newUser.username, {})
        const sessionCookie = lucia.createSessionCookie(session.id)
        return new Response(JSON.stringify({
            success: true,
            sessionCookie: sessionCookie
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
    }
}