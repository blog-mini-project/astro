import { lucia } from "../lib/auth"
import { verifyRequestOrigin } from "lucia"
import { defineMiddleware } from "astro:middleware"
import { Author, db, eq } from "astro:db"

export const onRequest = defineMiddleware(async (context, next) => {
	if (context.request.method !== "GET") {
		const originHeader = context.request.headers.get("Origin")
		const hostHeader = context.request.headers.get("Host")
		if (
			!originHeader ||
			!hostHeader ||
			!verifyRequestOrigin(originHeader, [hostHeader])
		) {
			return new Response(null, {
				status: 403,
			})
		}
	}

	const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null

	context.locals.isLoggedIn = false

	if (!sessionId) {
		context.locals.author = null
		context.locals.session = null
		return next()   
	}

	const { session, author } = await lucia.validateSession(sessionId)

	if (!session || session === null) {
		const sessionCookie = lucia.createBlankSessionCookie()
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)
		return next()
	}

	const isSessionFresh = session.expiresAt.getTime() > new Date().getTime()
	session.fresh = isSessionFresh

	if (session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id)
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)

		const [dbUser] = await db
			.select()
			.from(Author)
			.where(eq(Author.username, author.username))

		context.locals.dbUser = dbUser
		context.locals.isLoggedIn = true
	} else if (session && !session.fresh) {
		const sessionCookie = lucia.createBlankSessionCookie()
		await lucia.invalidateSession(session.id)
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes,
		)
	}

	context.locals.session = session
	context.locals.author = author
	return next()
})