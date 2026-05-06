import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_JWT_TOKEN } from '../../config/tmdb'
import type { TmdbErrorResponse } from './types'

export class TmdbApiError extends Error {
  status: number
  tmdbStatusCode?: number

  constructor(message: string, status: number, tmdbStatusCode?: number) {
    super(message)
    this.name = 'TmdbApiError'
    this.status = status
    this.tmdbStatusCode = tmdbStatusCode
  }
}

function buildAuthHeaders(): HeadersInit {
  if (TMDB_JWT_TOKEN && TMDB_JWT_TOKEN !== 'YOUR_JWT_TOKEN_HERE') {
    return { Authorization: `Bearer ${TMDB_JWT_TOKEN}` }
  }
  return {}
}

export async function tmdbGet<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined>,
  signal?: AbortSignal,
): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${path}`)

  const hasApiKey = TMDB_API_KEY && TMDB_API_KEY !== 'YOUR_API_KEY_HERE'
  if (hasApiKey) url.searchParams.set('api_key', TMDB_API_KEY)

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === '') continue
    url.searchParams.set(key, String(value))
  }

  const res = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      ...buildAuthHeaders(),
      Accept: 'application/json',
    },
    signal,
  })

  if (res.ok) {
    return (await res.json()) as T
  }

  let message = `Request failed (${res.status})`
  let tmdbStatusCode: number | undefined

  try {
    const data = (await res.json()) as TmdbErrorResponse
    if (data.status_message) message = data.status_message
    if (typeof data.status_code === 'number') tmdbStatusCode = data.status_code
  } catch {
    // ignore parse errors
  }

  throw new TmdbApiError(message, res.status, tmdbStatusCode)
}

