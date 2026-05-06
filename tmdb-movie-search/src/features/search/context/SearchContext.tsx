import type { ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

export type SearchFilters = {
  language: string
  page: number
  includeAdult: boolean
  region: string
  year?: number
  primaryReleaseYear?: number
}

type SearchContextValue = {
  query: string
  setQuery: (value: string) => void
  filters: SearchFilters
  setFilters: (updater: (prev: SearchFilters) => SearchFilters) => void
  isFiltersOpen: boolean
  setIsFiltersOpen: (value: boolean) => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

const DEFAULT_FILTERS: SearchFilters = {
  language: 'en-US',
  page: 1,
  includeAdult: false,
  region: '',
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('')
  const [filters, setFiltersState] = useState<SearchFilters>(DEFAULT_FILTERS)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const value = useMemo<SearchContextValue>(() => {
    return {
      query,
      setQuery,
      filters,
      setFilters: (updater) => setFiltersState(updater),
      isFiltersOpen,
      setIsFiltersOpen,
    }
  }, [filters, isFiltersOpen, query])

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}

export function useSearchContext() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearchContext must be used within SearchProvider')
  return ctx
}

