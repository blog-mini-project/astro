import { db, Comment, sql } from 'astro:db'

export async function getComments(postId: number) {
    const comments = await db.select().from(Comment).where(sql`postid = ${postId}`).orderBy(sql`published desc`)
    return comments
}

export async function addComment(postId: number, user: string, content: string) {
    const newComment = await db.insert(Comment).values({
        postid: postId,
        user,
        content,
        published: new Date(),
        upvotes: 0,
        downvotes: 0,
    })
    return newComment
}