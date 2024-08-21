import { db, User, Post, sql } from 'astro:db'

export async function getUser(username: string) {
    const Userdata = await db.select().from(User).where(sql`username = ${username}`)
    if (!Userdata) {
        throw new Error(`User with username ${username} not found`)
    }
    return Userdata
}

export async function getUserPosts(username: string) {
    const posts = await db.select().from(Post).where(sql`user = ${username}`).orderBy(sql`published desc`).limit(25)
    return posts
}

export async function getUsersByKarma() {
    const users = await db.select().from(User).orderBy(sql`karma desc`).limit(25)
    return users
}