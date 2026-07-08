/**
 * Photos API route.
 * Handles listing and uploading photos for activities.
 */

import type { APIContext } from 'astro'
import { PhotoSchema } from '../../lib/schemas'
import { ApiResponse } from '../../lib/response'

export async function GET({ request }: APIContext) {
  const url = new URL(request.url)
  const activityId = url.searchParams.get('activityId')

  // In production, query R2 or D1
  const photos = [
    { id: '1', activityId: 'paris-mountain-state-park', caption: 'View from the top', imageUrl: '', createdAt: '2026-06-15' },
    { id: '2', activityId: 'paris-mountain-state-park', caption: 'Lake Placid', imageUrl: '', createdAt: '2026-06-14' },
    { id: '3', activityId: 'yee-haw-axe-throwing', caption: 'Bullseye!', imageUrl: '', createdAt: '2026-06-20' },
  ]

  if (activityId) {
    return ApiResponse.success(photos.filter(p => p.activityId === activityId))
  }

  return ApiResponse.success(photos)
}

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json()
    const parsed = PhotoSchema.safeParse(body)

    if (!parsed.success) {
      return ApiResponse.validationError(parsed.error.issues)
    }

    const photo = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    }

    // In production, upload to R2 and insert metadata into D1
    return ApiResponse.success(photo, 201)
  } catch (err) {
    console.error('POST /api/photos error:', err)
    return ApiResponse.serverError('PHOTO_UPLOAD_FAILED', 'Failed to upload photo')
  }
}
