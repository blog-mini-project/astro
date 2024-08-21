import { db, Post, sql } from 'astro:db'

export async function makePost(title: string, content: string, user: string, tags: string[]) {
    const newPost = await db.insert(Post).values({
        title,
        content,
        user,
        tags,
        published: new Date(),
        upvotes: 0,
        downvotes: 0,
    })
    var allpost = await db.select().from(Post).all() 
    console.log(allpost)
    return newPost
}

export async function getPost(postId: number) {
    const post = await db.select().from(Post).where(sql`id = ${postId}`)
    if (!post) {
        throw new Error(`Post with id ${postId} not found`)
    }
    return post
}

export async function getPosts() {
    const posts = await db.select().from(Post).orderBy(sql`published desc`).limit(25)
    return posts
}

export async function getPostsByTag(tag: string) {
    const posts = await db.select()
        .from(Post)
        .where(sql`tags LIKE ${'%' + tag + '%'}`)
        .orderBy(sql`published desc`)
        .limit(25)
    return posts
}