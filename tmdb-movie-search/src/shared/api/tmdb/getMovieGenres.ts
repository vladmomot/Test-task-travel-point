import { tmdbGet } from './client'
import type { TmdbGenreListResponse } from './types'

export function getMovieGenres(params: { language?: string }, signal?: AbortSignal) {
  return tmdbGet<TmdbGenreListResponse>('/genre/movie/list', params, signal)
}

