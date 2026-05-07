import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../../../shared/api/tmdb/searchMovies'
import type { SearchFilters } from '../types'

export function useMovieSearch(
  query: string,
  filters: SearchFilters,
) {
  const trimmed = query.trim()

  return useQuery({
    queryKey: ['movies', trimmed, filters],
    enabled: !!trimmed,
    queryFn: ({ signal }) =>
      searchMovies(
        {
          query: trimmed,
          language: filters.language,
          page: filters.page,
          include_adult: filters.includeAdult,
          region: filters.region || undefined,
          year: filters.year,
          primary_release_year: filters.primaryReleaseYear,
        },
        signal,
      ),
  })
}