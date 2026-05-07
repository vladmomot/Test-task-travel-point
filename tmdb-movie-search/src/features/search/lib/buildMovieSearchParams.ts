import type { SearchFilters } from '../types'

export function buildMovieSearchParams(
  query: string,
  filters: SearchFilters,
  overridePage?: number,
) {
  return {
    query,
    language: filters.language,
    page: overridePage ?? filters.page,
    include_adult: filters.includeAdult,
    region: filters.region || undefined,
    year: filters.year,
    primary_release_year: filters.primaryReleaseYear,
  }
}
