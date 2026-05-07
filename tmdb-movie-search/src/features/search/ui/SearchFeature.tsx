import { useState } from 'react'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { useMovieSuggestions } from '../hooks/useMovieSuggestions'
import { DEFAULT_SEARCH_FILTERS, type SearchFilters } from '../types'
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue'
import { SearchLayout } from '../../../pages/SearchPage/components/SearchLayout'

export function SearchFeature() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_SEARCH_FILTERS)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const debouncedQuery = useDebouncedValue(query, 700)
  const debouncedAutocomplete = useDebouncedValue(query, 200)
  const result = useMovieSearch(debouncedQuery, filters)
  const suggestions = useMovieSuggestions(debouncedAutocomplete, filters)

  return (
    <SearchLayout
      query={query}
      searchedQuery={debouncedQuery}
      onQueryChange={setQuery}
      filters={filters}
      onFiltersChange={setFilters}
      isFiltersOpen={isFiltersOpen}
      onFiltersOpenChange={setIsFiltersOpen}
      search={result}
      suggestions={suggestions}
    />
  )
}
