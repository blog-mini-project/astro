import type { APIRoute } from 'astro'
import { lucia as auth } from '../../lib/auth'

export const post: APIRoute = async ({ request }) => {
  try {
    const { username, password, displayname, profilepic } = await request.json()
    console.log('Parsed Payload:', { username, displayname, profilepic })

    const user = await auth.createUser({
      key: {
        providerId: "username",
        providerUserId: username,
        password,
      },
      attributes: {
        displayname,
        profilepic,
      },
    })

    return new Response(JSON.stringify({ message: 'User registered successfully', user }), { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ message: error.message }), { status: 400 })
  }
}