export const prerender = false

import { User, Session, sql, db } from "astro:db"
import { lucia } from "../../lib/auth"

export async function POST({ request }) {
    const { username, password } = await request.json()
    const existingUser = await db
        .select()
        .from(User)
        .where(sql`username = ${username} and password = ${password}`)
        .get()

    if (existingUser) {
        const oldSessions = await db
            .select()
            .from(Session)
            .where(sql`userId = ${existingUser.username}`)
            .all()

        for (const oldSession of oldSessions) {
            await lucia.invalidateUserSessions(oldSession.id)
            await db.delete(Session).where(sql`id = ${oldSession.id}`)
            console.log('Deleted old session', oldSession.id)
        }

        const session = await lucia.createSession(existingUser.username, {})
        const sessionCookie = lucia.createSessionCookie(session.id)

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