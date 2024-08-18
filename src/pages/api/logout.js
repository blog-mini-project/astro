export const prerender = false

import { lucia } from "../../lib/auth"

export async function GET({ request }) {
    lucia.invalidateUserSessions( request.headers.get('Cookie') )
    lucia.deleteExpiredSessions()
    return new Response(JSON.stringify({
        success: true
    }), {
        headers: { 'Content-Type': 'application/json' }
    })
}