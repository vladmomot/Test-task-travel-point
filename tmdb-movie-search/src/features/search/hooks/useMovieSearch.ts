import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../../../shared/api/tmdb/searchMovies'
import type { SearchFilters } from '../types'
import { buildMovieSearchParams } from '../lib/buildMovieSearchParams'

export function useMovieSearch(query: string, filters: SearchFilters) {
  const trimmed = query.trim()
  return useQuery({
    queryKey: ['movies', trimmed, filters],
    enabled: !!trimmed,
    queryFn: ({ signal }) =>
      searchMovies(buildMovieSearchParams(trimmed, filters), signal),
  })
}
