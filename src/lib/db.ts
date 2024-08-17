import { eq, lte } from "astro:db"
import type { Database, Table } from "@astrojs/db/runtime"
import type { Adapter, DatabaseSession, DatabaseUser, UserId } from "lucia"

export class AstroDBAdapter implements Adapter {
    private db: Database
    private sessionTable: Table<any, any>
    private userTable: Table<any, any>

    constructor(db: Database, sessionTable: Table<any, any>, userTable: Table<any, any>) {
        this.db = db
        this.sessionTable = sessionTable
        this.userTable = userTable
    }

    public async deleteSession(sessionId: string): Promise<void> {
        await this.db.delete(this.sessionTable).where(eq(this.sessionTable.columns.id, sessionId))
    }

    public async deleteUserSessions(userId: UserId): Promise<void> {
        await this.db.delete(this.sessionTable).where(eq(this.sessionTable.columns.user_id, userId))
    }

    public async getSessionAndUser(
        sessionId: string
    ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
        const result = await this.db
            .select({
                user: this.userTable,
                session: this.sessionTable
            })
            .from(this.sessionTable)
            .innerJoin(this.userTable, eq(this.sessionTable.columns.user_id, this.userTable.columns.username))
            .where(eq(this.sessionTable.columns.id, sessionId))
            .get()
        if (!result) return [null, null]
        return [transformIntoDatabaseSession(result.session), transformIntoDatabaseUser(result.user)]
    }

    public async getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
        const result = await this.db
            .select()
            .from(this.sessionTable)
            .where(eq(this.sessionTable.columns.user_id, userId))
            .all()
        return result.map((val) => transformIntoDatabaseSession(val))
    }

    public async setSession(session: DatabaseSession): Promise<void> {
        await this.db
            .insert(this.sessionTable)
            .values({
                id: session.id,
                user_id: session.userId,
                expires_at: session.expiresAt,
                ...session.attributes
            })
            .run()
    }

    public async updateSessionExpiration(sessionId: string, expiresAt: Date): Promise<void> {
        await this.db
            .update(this.sessionTable)
            .set({ expires_at: expiresAt })
            .where(eq(this.sessionTable.columns.id, sessionId))
            .run()
    }

    public async deleteExpiredSessions(): Promise<void> {
        await this.db.delete(this.sessionTable).where(lte(this.sessionTable.columns.expires_at, new Date()))
    }

    public async getUser(userId: UserId): Promise<{ attributes: { [key: string]: any id: string } }> {
        const result = await this.db
            .select()
            .from(this.userTable)
            .where(eq(this.userTable.columns.username, userId))
            .get()
        if (!result) throw new Error("User not found")
        return {
            attributes: {
                id: result.username,
                ...result
            }
        }
    }
}

function transformIntoDatabaseSession(raw: any): DatabaseSession {
    const { id, user_id, expires_at, ...attributes } = raw
    return {
        userId: user_id,
        id,
        expiresAt: expires_at,
        attributes
    }
}

function transformIntoDatabaseUser(raw: any): DatabaseUser {
    const { username, ...attributes } = raw
    return {
        id: username,
        attributes
    }
}