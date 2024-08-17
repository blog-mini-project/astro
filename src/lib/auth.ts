import { Lucia } from "lucia"
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { db } from "astro:db"

import { asDrizzleTable } from "@astrojs/db/runtime"
import { Session, Author } from "../../db/config"

const adapter = new DrizzleSQLiteAdapter(
	db as any,
	asDrizzleTable("Session", Session),
	asDrizzleTable("Author", Author),
)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: import.meta.env.PROD,
		},
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
		}
	},
})

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia
		DatabaseUserAttributes: DatabaseUserAttributes
	}
}

interface DatabaseUserAttributes {
	username: string
}