import type { APIRoute } from 'astro'
import { addComment } from '../../../../lib/comments'
import { verifyToken } from '../../../../lib/auth'
import { getComments } from '../../../../lib/comments'

export const post: APIRoute = async ({ params, request }) => {
    const { postid } = params
    const { content, author } = await request.json()
    const token = request.headers.get('Authorization')?.split(' ')[1]

    if (!token) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
    }

    try {
        verifyToken(token)
        await addComment(Number(postid), author, content)
        const comments = await getComments(Number(postid))
        return new Response(JSON.stringify(comments), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 })
    }
};