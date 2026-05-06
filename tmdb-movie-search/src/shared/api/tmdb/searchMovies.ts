import { tmdbGet } from './client'
import type { TmdbSearchMovieResponse } from './types'

export type SearchMoviesParams = {
  query: string
  language?: string
  page?: number
  include_adult?: boolean
  region?: string
  year?: number
  primary_release_year?: number
}

export function searchMovies(params: SearchMoviesParams, signal?: AbortSignal) {
  return tmdbGet<TmdbSearchMovieResponse>('/search/movie', params, signal)
}

