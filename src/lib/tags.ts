import { db, Tag, sql } from 'astro:db'

export async function getTags() {
    const tags = await db.select().from(Tag).orderBy(sql`name asc`)
    return tags
}

export async function addTag(name: string) {
    const newTag = await db.insert(Tag).values({
        name,
    })
    return newTag
}