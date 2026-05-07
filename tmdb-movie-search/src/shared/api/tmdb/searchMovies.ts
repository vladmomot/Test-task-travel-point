import { tmdbGet } from './client'
import type { SearchMoviesParams, TmdbSearchMovieResponse } from './types'

export function searchMovies(params: SearchMoviesParams, signal?: AbortSignal) {
  return tmdbGet<TmdbSearchMovieResponse>('/search/movie', params, signal)
}
