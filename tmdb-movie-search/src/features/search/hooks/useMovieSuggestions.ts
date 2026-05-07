import { useQuery } from '@tanstack/react-query'
import { searchMovies } from '../../../shared/api/tmdb/searchMovies'
import type { SearchFilters } from '../types'
import { buildMovieSearchParams } from '../lib/buildMovieSearchParams'

export function useMovieSuggestions(query: string, filters: SearchFilters) {
  const trimmed = query.trim()
  const suggestionFilters = {
    language: filters.language,
    includeAdult: filters.includeAdult,
    region: filters.region,
    year: filters.year,
    primaryReleaseYear: filters.primaryReleaseYear,
  }

  return useQuery({
    queryKey: ['movieSuggestions', trimmed, suggestionFilters],
    enabled: trimmed.length >= 2,
    queryFn: ({ signal }) =>
      searchMovies(buildMovieSearchParams(trimmed, filters, 1), signal),
  })
}
