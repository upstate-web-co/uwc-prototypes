/**
 * Standardized API response helpers.
 * Use these in every API route — never raw Response.json().
 */

export const ApiResponse = {
  success<T>(data: T, status = 200): Response {
    return Response.json({ data }, { status })
  },

  error(code: string, status: number, message?: string): Response {
    return Response.json(
      { error: message || code, code },
      { status }
    )
  },

  validationError(issues: unknown[]): Response {
    return Response.json(
      { error: 'Validation failed', code: 'VALIDATION_ERROR', issues },
      { status: 400 }
    )
  },

  serverError(code: string, message: string): Response {
    return Response.json(
      { error: message, code },
      { status: 500 }
    )
  },

  notFound(code = 'NOT_FOUND', message = 'Resource not found'): Response {
    return Response.json(
      { error: message, code },
      { status: 404 }
    )
  },
}
