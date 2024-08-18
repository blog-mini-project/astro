import { db, Session, User } from "astro:db"
import { Lucia } from "lucia"
import { AstroDBAdapter } from "../adapter/lucia-astrodb"

interface DatabaseUserAttributes {
	username: string;
}

const { PROD } = import.meta.env

const adapter = new AstroDBAdapter(db, Session as any, User as any)

export const lucia = new Lucia(adapter, {
	sessionCookie: { attributes: { secure: PROD } },
	getUserAttributes: (attributes) => ({
	  username: attributes.username,
	}),
})

declare module "lucia" {
	interface Register {
	  Lucia: typeof lucia;
	  DatabaseUserAttributes: DatabaseUserAttributes;
	}
  }