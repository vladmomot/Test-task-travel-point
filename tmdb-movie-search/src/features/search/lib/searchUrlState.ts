import { DEFAULT_SEARCH_FILTERS, type SearchFilters } from '../types'

export type SearchUrlState = {
  query: string
  filters: SearchFilters
}

const QUERY_PARAM = 'q'
const LANGUAGE_PARAM = 'language'
const PAGE_PARAM = 'page'
const INCLUDE_ADULT_PARAM = 'includeAdult'
const REGION_PARAM = 'region'
const YEAR_PARAM = 'year'
const PRIMARY_RELEASE_YEAR_PARAM = 'primaryReleaseYear'

const MIN_YEAR = 1900
const MAX_YEAR = new Date().getFullYear()

function parseInteger(value: string | null) {
  if (!value) return undefined

  const parsed = Number(value)
  if (!Number.isInteger(parsed)) return undefined

  return parsed
}

function parsePositiveInteger(value: string | null) {
  const parsed = parseInteger(value)
  if (parsed === undefined || parsed < 1) return undefined

  return parsed
}

function parseYear(value: string | null) {
  const parsed = parseInteger(value)
  if (parsed === undefined) return undefined
  if (parsed < MIN_YEAR || parsed > MAX_YEAR) return undefined

  return parsed
}

export function parseSearchUrlState(params: URLSearchParams): SearchUrlState {
  return {
    query: params.get(QUERY_PARAM) ?? '',
    filters: {
      language: params.get(LANGUAGE_PARAM) || DEFAULT_SEARCH_FILTERS.language,
      page:
        parsePositiveInteger(params.get(PAGE_PARAM)) ??
        DEFAULT_SEARCH_FILTERS.page,
      includeAdult: params.get(INCLUDE_ADULT_PARAM) === 'true',
      region: params.get(REGION_PARAM) ?? DEFAULT_SEARCH_FILTERS.region,
      year: parseYear(params.get(YEAR_PARAM)),
      primaryReleaseYear: parseYear(params.get(PRIMARY_RELEASE_YEAR_PARAM)),
    },
  }
}

export function serializeSearchUrlState(query: string, filters: SearchFilters) {
  const params = new URLSearchParams()
  const trimmedQuery = query.trim()

  if (trimmedQuery) params.set(QUERY_PARAM, trimmedQuery)
  if (filters.language !== DEFAULT_SEARCH_FILTERS.language) {
    params.set(LANGUAGE_PARAM, filters.language)
  }
  if (filters.page !== DEFAULT_SEARCH_FILTERS.page && filters.page > 0) {
    params.set(PAGE_PARAM, filters.page.toString())
  }
  if (filters.includeAdult) params.set(INCLUDE_ADULT_PARAM, 'true')
  if (filters.region) params.set(REGION_PARAM, filters.region)
  if (filters.year !== undefined)
    params.set(YEAR_PARAM, filters.year.toString())
  if (filters.primaryReleaseYear !== undefined) {
    params.set(
      PRIMARY_RELEASE_YEAR_PARAM,
      filters.primaryReleaseYear.toString(),
    )
  }

  return params
}
