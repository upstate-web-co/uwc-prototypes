/**
 * Centralized Zod schemas.
 * ALL validation schemas go here — never define inline in routes.
 * Import from this file in API routes and use with parseBody or safeParse.
 */

import { z } from 'zod'

// Contact form submission
export const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
})

export type ContactFormData = z.infer<typeof ContactFormSchema>

// Activity schema
export const ActivitySchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200),
  category: z.enum(['restaurant', 'hiking', 'entertainment', 'sports', 'nightlife', 'other']),
  description: z.string().min(1, 'Description is required').max(5000),
  location: z.string().min(1, 'Location is required').max(500),
  website: z.string().url().optional().or(z.literal('')),
  phone: z.string().max(20).optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
})

export type Activity = z.infer<typeof ActivitySchema>

// Comment schema
export const CommentSchema = z.object({
  id: z.string().optional(),
  activityId: z.string().min(1),
  author: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  content: z.string().min(1, 'Comment is required').max(2000),
  createdAt: z.string().optional(),
})

export type Comment = z.infer<typeof CommentSchema>

// Photo schema
export const PhotoSchema = z.object({
  id: z.string().optional(),
  activityId: z.string().min(1),
  caption: z.string().max(500).optional(),
  imageUrl: z.string().url(),
  uploadedBy: z.string().max(100).optional(),
  createdAt: z.string().optional(),
})

export type Photo = z.infer<typeof PhotoSchema>

// Search schema
export const SearchSchema = z.object({
  query: z.string().min(1).max(200),
  category: z.enum(['restaurant', 'hiking', 'entertainment', 'sports', 'nightlife', 'other']).optional(),
  location: z.string().max(200).optional(),
})

export type SearchQuery = z.infer<typeof SearchSchema>
