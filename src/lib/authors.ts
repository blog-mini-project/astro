import { db, Author, sql } from 'astro:db'

export async function getAuthor(username: string) {
    const author = await db.select().from(Author).where(sql`username = ${username}`)
    if (!author) {
        throw new Error(`Author with username ${username} not found`)
    }
    return author
}

export async function getAuthorPosts(username: string) {
    const posts = await db.select().from(Post).where(sql`author = ${username}`).orderBy(sql`published desc`).limit(25)
    return posts
}