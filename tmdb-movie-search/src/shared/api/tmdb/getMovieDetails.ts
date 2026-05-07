import { tmdbGet } from './client'
import type { TmdbMovieDetails } from './types'

export function getMovieDetails(id: string, signal?: AbortSignal) {
  return tmdbGet<TmdbMovieDetails>(`/movie/${id}`, {}, signal)
}
