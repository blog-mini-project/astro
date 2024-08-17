export const prerender = false

// import type { APIRoute } from 'astro'
// import { db, Author, sql } from 'astro:db'
// import { verifyToken } from '../../../lib/auth'

// export const post: APIRoute = async ({ request }) => {
//     const { displayname, profilepic } = await request.json()
//     const token = request.headers.get('Authorization')?.split(' ')[1]

//     if (!token) {
//         return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
//     }

//     try {
//         const user = verifyToken(token)
//         await db.update(Author).set({
//             displayname,
//             profilepic
//         }).where(sql`username = ${user.username}`)
//         return new Response(JSON.stringify({ message: 'Profile updated successfully' }), { status: 200 })
//     } catch (error) {
//         return new Response(JSON.stringify({ error: error.message }), { status: 400 })
//     }
// }