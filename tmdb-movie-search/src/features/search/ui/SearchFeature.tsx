import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useMovieSuggestions } from '../hooks/useMovieSuggestions'
import type { SearchFilters } from '../types'
import type { MoviePreferences } from '../../preferences/types'
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue'
import { SearchLayout } from '../../../pages/SearchPage/components/SearchLayout'
import { useSearchHistory } from '../hooks/useSearchHistory'
import { useMoviePreferences } from '../../preferences/hooks/useMoviePreferences'
import {
  parseSearchUrlState,
  serializeSearchUrlState,
} from '../lib/searchUrlState'

type LocalSearchFilters = Pick<
  SearchFilters,
  'page' | 'year' | 'primaryReleaseYear'
>

function getInitialPreferences(
  params: URLSearchParams,
  fallback: MoviePreferences,
) {
  const parsedFilters = parseSearchUrlState(params).filters
  return {
    language: params.has('language')
      ? parsedFilters.language
      : fallback.language,
    region: params.has('region') ? parsedFilters.region : fallback.region,
    includeAdult: params.has('includeAdult')
      ? parsedFilters.includeAdult
      : fallback.includeAdult,
  }
}

function getInitialLocalFilters(params: URLSearchParams): LocalSearchFilters {
  const { filters } = parseSearchUrlState(params)

  return {
    page: filters.page,
    year: filters.year,
    primaryReleaseYear: filters.primaryReleaseYear,
  }
}

export function SearchFeature() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { preferences, setPreferences } = useMoviePreferences()
  const [query, setQuery] = useState(
    () => parseSearchUrlState(searchParams).query,
  )
  const [preferenceFilters, setPreferenceFilters] = useState<MoviePreferences>(
    () => getInitialPreferences(searchParams, preferences),
  )
  const [localFilters, setLocalFilters] = useState<LocalSearchFilters>(() =>
    getInitialLocalFilters(searchParams),
  )
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const filters = useMemo<SearchFilters>(
    () => ({ ...preferenceFilters, ...localFilters }),
    [localFilters, preferenceFilters],
  )

  const debouncedQuery = useDebouncedValue(query, 700)
  const debouncedAutocomplete = useDebouncedValue(query, 200)
  const result = useMovieSearch(debouncedQuery, filters)
  const suggestions = useMovieSuggestions(debouncedAutocomplete, filters)
  const { history, addQuery, clearHistory } = useSearchHistory()

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setLocalFilters((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setLocalFilters((prev) => ({ ...prev, page }))
  }

  const handleFiltersChange = (next: SearchFilters) => {
    setPreferenceFilters({
      language: next.language,
      region: next.region,
      includeAdult: next.includeAdult,
    })
    setLocalFilters({
      page: next.page,
      year: next.year,
      primaryReleaseYear: next.primaryReleaseYear,
    })
  }

  useEffect(() => {
    setPreferences(preferenceFilters)
  }, [preferenceFilters, setPreferences])

  useEffect(() => {
    const nextParams = serializeSearchUrlState(query, filters)
    if (nextParams.toString() === searchParams.toString()) return

    setSearchParams(nextParams, { replace: true })
  }, [filters, query, searchParams, setSearchParams])

  useEffect(() => {
    if (!result.isSuccess) return
    if (!debouncedQuery.trim()) return
    addQuery(debouncedQuery)
  }, [addQuery, debouncedQuery, result.isSuccess])

  return (
    <SearchLayout
      query={query}
      searchedQuery={debouncedQuery}
      onQueryChange={handleQueryChange}
      filters={filters}
      onFiltersChange={handleFiltersChange}
      isFiltersOpen={isFiltersOpen}
      onFiltersOpenChange={setIsFiltersOpen}
      search={result}
      suggestions={suggestions}
      currentPage={filters.page}
      onPageChange={handlePageChange}
      history={history}
      onHistorySelect={handleQueryChange}
      onClearHistory={clearHistory}
    />
  )
}
