/**
 * Comments API route.
 * Handles listing and creating comments for activities.
 */

import type { APIContext } from 'astro'
import { CommentSchema } from '../../lib/schemas'
import { ApiResponse } from '../../lib/response'

export async function GET({ request }: APIContext) {
  const url = new URL(request.url)
  const activityId = url.searchParams.get('activityId')

  // In production, query D1
  const comments = [
    { id: '1', activityId: 'paris-mountain-state-park', author: 'Sarah M.', content: 'Great place! Highly recommend the Lake Placid trail.', createdAt: '2026-06-15' },
    { id: '2', activityId: 'paris-mountain-state-park', author: 'Mike R.', content: 'Beautiful views. Parking can be tricky on weekends.', createdAt: '2026-06-10' },
    { id: '3', activityId: 'yee-haw-axe-throwing', author: 'Jessica T.', content: 'So much fun! The instructors were really helpful.', createdAt: '2026-06-20' },
  ]

  if (activityId) {
    return ApiResponse.success(comments.filter(c => c.activityId === activityId))
  }

  return ApiResponse.success(comments)
}

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json()
    const parsed = CommentSchema.safeParse(body)

    if (!parsed.success) {
      return ApiResponse.validationError(parsed.error.issues)
    }

    const comment = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    }

    // In production, insert into D1
    return ApiResponse.success(comment, 201)
  } catch (err) {
    console.error('POST /api/comments error:', err)
    return ApiResponse.serverError('COMMENT_CREATE_FAILED', 'Failed to create comment')
  }
}
