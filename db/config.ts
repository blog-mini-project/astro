import { column, defineDb, defineTable, NOW } from "astro:db"

export const Author = defineTable({
    columns: {
        username: column.text({ primaryKey: true }),
        password: column.text(),
        displayname: column.text({ optional: true }),
        profilepic: column.text({ optional: true }),
        myupvotes: column.json({ default: {} }),
        mydownvotes: column.json({ default: {} }),
        karma: column.number({ default: 0 }),
        posts: column.json({ default: {} }),
        comments: column.json({ default: {} }),
    },
    indexes: [
        { on: ["username"], unique: true }
    ]
})

export const Post = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        title: column.text(),
        content: column.text(),
        published: column.date({ default: NOW }),
        author: column.text(),
        upvotes: column.number({ default: 0 }),
        downvotes: column.number({ default: 0 }),
        tags: column.json({ default: [] }),
    },
    foreignKeys: [
        {
            columns: ["author"],
            references: () => [Author.columns.username],
        },
    ],
    indexes: [
        { on: ["author"], unique: true }
    ]
})

export const Tag = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        name: column.text({ unique: true }),
    },
})

export const Comment = defineTable({
    columns: {
        id: column.number({ primaryKey: true }),
        author: column.text(),
        content: column.text({ optional: true }),
        published: column.date({ default: NOW }),
        upvotes: column.number({ default: 0 }),
        downvotes: column.number({ default: 0 }),
        postid: column.number(),
    },
    foreignKeys: [
        {
            columns: ["author"],
            references: () => [Author.columns.username],
        },
        {
            columns: ["postid"],
            references: () => [Post.columns.id],
        },
    ],
    indexes: [
        { on: ["postid"], unique: true }
    ]
})

export const Session = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        username: column.text(),
        expires_at: column.number(),
    },
    foreignKeys: [
        {
            columns: ["username"],
            references: () => [Author.columns.username],
        },
    ],
    indexes: [
        { on: ["username"], unique: false }
    ]
})

const dbConfig = defineDb({
    tables: {
        Comment,
        Author,
        Post,
        Tag,
        Session,
    },
})

export default dbConfig