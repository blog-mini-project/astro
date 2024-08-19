export const prerender = false

import type { APIRoute } from 'astro'
import { addComment } from '../../../../lib/comments'
import { getComments } from '../../../../lib/comments'

export const POST: APIRoute = async ({ locals, request, params }) => {
    const user = locals.user.username
    // post id should be infered from the route
    // Cannot destructure property 'postid' of 'request.params' as it is undefined.
    // const { postid } = request.params
    const postid = params.postid
    const { content } = await request.json()

    try {
        const newComment = await addComment(postid, user, content)
        const comments = await getComments(Number(postid))
        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
}