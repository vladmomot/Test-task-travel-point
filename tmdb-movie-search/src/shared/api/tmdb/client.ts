import { TMDB_API_KEY, TMDB_BASE_URL, TMDB_JWT_TOKEN } from './config/tmdb'
import axios from 'axios'
import type { AxiosError } from 'axios'
import type { TmdbErrorResponse } from './types'


export type TmdbApiError = Error & {
  name: 'TmdbApiError'
  status: number
  tmdbStatusCode?: number
}

function createTmdbApiError(
  message: string,
  status: number,
  tmdbStatusCode?: number,
): TmdbApiError {
  const err = new Error(message) as TmdbApiError
  err.name = 'TmdbApiError'
  err.status = status
  err.tmdbStatusCode = tmdbStatusCode
  return err
}

function buildAuthHeaders(): Record<string, string> {
  if (TMDB_JWT_TOKEN) {
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
  
  if (TMDB_API_KEY) url.searchParams.set('api_key', TMDB_API_KEY)

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === '') continue
    url.searchParams.set(key, String(value))
  }

  try {
    const res = await axios.get(url.toString(), {
      headers: {
        ...buildAuthHeaders(),
        Accept: 'application/json',
      },
      signal,
    })
    return res.data as T
  } catch (e: unknown) {
    const err = e as AxiosError<TmdbErrorResponse>
    const status = err.response?.status ?? 0

    const tmdbData = err.response?.data
    const message =
      tmdbData?.status_message ||
      err.message ||
      (status ? `Request failed (${status})` : 'Network error')

    const tmdbStatusCode =
      typeof tmdbData?.status_code === 'number' ? tmdbData.status_code : undefined

    throw createTmdbApiError(message, status, tmdbStatusCode)
  }
}

