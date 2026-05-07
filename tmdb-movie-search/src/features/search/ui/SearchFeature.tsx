import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useMovieSuggestions } from '../hooks/useMovieSuggestions'
import type { SearchFilters } from '../types'
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue'
import { SearchLayout } from '../../../pages/SearchPage/components/SearchLayout'
import { useSearchHistory } from '../hooks/useSearchHistory'
import {
  parseSearchUrlState,
  serializeSearchUrlState,
} from '../lib/searchUrlState'

export function SearchFeature() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(
    () => parseSearchUrlState(searchParams).query,
  )
  const [filters, setFilters] = useState<SearchFilters>(
    () => parseSearchUrlState(searchParams).filters,
  )
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const debouncedQuery = useDebouncedValue(query, 700)
  const debouncedAutocomplete = useDebouncedValue(query, 200)
  const result = useMovieSearch(debouncedQuery, filters)
  const suggestions = useMovieSuggestions(debouncedAutocomplete, filters)
  const { history, addQuery, clearHistory } = useSearchHistory()

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setFilters((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

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
      onFiltersChange={setFilters}
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
