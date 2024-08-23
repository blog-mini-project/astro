
import { getPost } from '../../lib/posts'
import { getComments } from '../../lib/comments'
import { lucia } from '../../lib/auth'

import Base from '../../layouts/base.astro'

const { postid } = Astro.params
var post = await getPost(1)
post = post[0]
const comments = await getComments(1)

let error = null

import type { APIRoute } from "astro"
import { makePost } from '../../../lib/posts'

export const POST: APIRoute = async ({ locals, request }) => {
