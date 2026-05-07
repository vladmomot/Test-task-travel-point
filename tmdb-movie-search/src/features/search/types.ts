export type SearchFilters = {
  language: string
  page: number
  includeAdult: boolean
  region: string
  year?: number
  primaryReleaseYear?: number
}

export const DEFAULT_SEARCH_FILTERS: SearchFilters = {
  language: 'en-US',
  page: 1,
  includeAdult: false,
  region: '',
}
