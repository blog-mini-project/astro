export const prerender = false

import type { APIRoute } from 'astro'

import { getTags } from '../../../lib/tags'

export const GET: APIRoute = async ({ }) => {

    try {
        const tags = await getTags()
        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tags),
        }
    } catch (error) {
        return {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ error: error.message }),
    }
}}