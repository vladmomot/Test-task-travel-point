import { useState } from 'react'
import { useMovieSearch } from '../hooks/useMovieSearch'
import { DEFAULT_SEARCH_FILTERS, type SearchFilters } from '../types'
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue'
import { SearchLayout } from '../../../pages/SearchPage/components/SearchLayout'

export function SearchFeature() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_SEARCH_FILTERS)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const debouncedQuery = useDebouncedValue(query, 700)
  const result = useMovieSearch(debouncedQuery, filters)

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
    />
  )
}

