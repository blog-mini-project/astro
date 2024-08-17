// import type { APIRoute } from 'astro'
// import { makePost } from '../../../lib/posts'
// import { verifyToken } from '../../../lib/auth'

// export const post: APIRoute = async ({ request }) => {
//     const { title, content, tags, author } = await request.json()
//     const token = request.headers.get('Authorization')?.split(' ')[1]

//     if (!token) {
//         return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
//     }

//     try {
//         verifyToken(token)
//         const newPost = await makePost(title, content, author, tags)
//         return new Response(JSON.stringify(newPost), { status: 200 })
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error.message }), { status: 400 })
//     }
// }