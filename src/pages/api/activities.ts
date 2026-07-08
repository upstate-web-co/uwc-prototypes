/**
 * Activities API route.
 * Handles listing and creating activities.
 */

import type { APIContext } from 'astro'
import { ActivitySchema } from '../../lib/schemas'
import { ApiResponse } from '../../lib/response'

// In production, use D1 database
// For prototype, return sample data
const sampleActivities = [
  {
    id: '1',
    title: 'Paris Mountain State Park',
    slug: 'paris-mountain-state-park',
    category: 'hiking',
    description: 'Beautiful hiking trails with scenic views of Greenville.',
    location: '2401 State Park Rd, Greenville, SC 29609',
    tags: ['hiking', 'nature', 'trails'],
  },
  {
    id: '2',
    title: 'Yee-Haw Axe Throwing',
    slug: 'yee-haw-axe-throwing',
    category: 'entertainment',
    description: 'Indoor axe throwing venue with lanes for groups.',
    location: '123 Main St, Greenville, SC 29601',
    tags: ['axe throwing', 'entertainment'],
  },
  {
    id: '3',
    title: 'The Local Cue',
    slug: 'the-local-cue',
    category: 'entertainment',
    description: 'Pool hall with 12 tables, darts, and a full bar.',
    location: '456 Broad St, Greenville, SC 29601',
    tags: ['pool', 'billiards', 'game nights'],
  },
  {
    id: '4',
    title: 'Swamp Rabbit Trail',
    slug: 'swamp-rabbit-trail',
    category: 'hiking',
    description: '22-mile multi-use trail connecting Greenville to Travelers Rest.',
    location: 'Greenville, SC',
    tags: ['biking', 'running', 'walking'],
  },
  {
    id: '5',
    title: 'The Anchorage Restaurant',
    slug: 'the-anchorage-restaurant',
    category: 'restaurant',
    description: 'Farm-to-table Southern cuisine with a modern twist.',
    location: '467 Main St, Greenville, SC 29601',
    tags: ['farm-to-table', 'southern', 'fine dining'],
  },
  {
    id: '6',
    title: 'Game Night at Boardwalk',
    slug: 'game-night-boardwalk',
    category: 'entertainment',
    description: 'Weekly board game nights every Thursday.',
    location: '789 River St, Greenville, SC 29601',
    tags: ['board games', 'game night', 'weekly event'],
  },
]

export async function GET({ request }: APIContext) {
  const url = new URL(request.url)
  const query = url.searchParams.get('query')?.toLowerCase()
  const category = url.searchParams.get('category')

  let results = sampleActivities

  if (query) {
    results = results.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query) ||
      a.tags.some(t => t.toLowerCase().includes(query))
    )
  }

  if (category) {
    results = results.filter(a => a.category === category)
  }

  return ApiResponse.success(results)
}

export async function POST({ request }: APIContext) {
  try {
    const body = await request.json()
    const parsed = ActivitySchema.safeParse(body)

    if (!parsed.success) {
      return ApiResponse.validationError(parsed.error.issues)
    }

    // In production, insert into D1
    const activity = {
      id: crypto.randomUUID(),
      ...parsed.data,
      createdAt: new Date().toISOString(),
    }

    return ApiResponse.success(activity, 201)
  } catch (err) {
    console.error('POST /api/activities error:', err)
    return ApiResponse.serverError('ACTIVITY_CREATE_FAILED', 'Failed to create activity')
  }
}
