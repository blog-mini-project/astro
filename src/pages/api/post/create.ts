export const prerender = false

import type { APIRoute } from "astro"
import { makePost } from '../../../lib/posts'

export const POST: APIRoute = async ({ locals, request }) => {
    const user = locals.user.username
    const { title, content, tags } = await request.json()

    try {
        const newPost = await makePost(title, content, user, tags)
        return new Response(JSON.stringify(newPost), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
}