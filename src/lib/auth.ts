import { AstroDBAdapter } from './db'
import dbConfig from '../../db/config'
import { Lucia } from 'lucia'

const db = dbConfig
const sessionTable = db.tables.Session
const userTable = db.tables.Author

const adapter = new AstroDBAdapter(db, sessionTable, userTable)

const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            secure: process.env.NODE_ENV === 'production'
        }
    },
    getUserAttributes: (attributes) => {
        return {
            displayname: attributes.displayname,
            profilepic: attributes.profilepic,
            karma: attributes.karma,
        }
    }
})

declare module 'lucia' {
    interface Register {
        Lucia: typeof lucia
        DatabaseUserAttributes: Omit<ReturnType<typeof adapter.getUser>['attributes'], 'id'>
    }
}

export { lucia }