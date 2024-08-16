import { db, Author, sql } from 'astro:db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const SECRET_KEY = 'supersecretkey'

export async function register(username: string, password: string, displayname?: string, profilepic?: string) {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await db.insert(Author).values({
        username,
        displayname,
        profilepic,
        password: hashedPassword,
        karma: 0,
        myupvotes: {},
        mydownvotes: {},
        posts: {},
        comments: {},
    })
    return newUser
}

export async function login(username: string, password: string) {
    const user = await db.select().from(Author).where(sql`username = ${username}`).first()
    if (!user) {
        throw new Error('User not found')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Invalid password')
    }
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' })
    return { token, user }
}

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        return decoded
    } catch (error) {
        throw new Error('Invalid token')
    }
}