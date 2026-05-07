import styled from 'styled-components'
import type { SearchFilters } from '../../../features/search/types'
import type { UseQueryResult } from '@tanstack/react-query'
import type { TmdbSearchMovieResponse } from '../../../shared/api/tmdb/types'
import { AdvancedFilters } from './AdvancedFilters'
import { AutocompleteDropdown } from './AutocompleteDropdown'
import { useEffect, useMemo, useRef, useState } from 'react'

const SearchSectionRoot = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  z-index: 1500;
  overflow: visible;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  z-index: 2000;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #e1e5e9;
  border-radius: 15px;
  outline: none;
  transition: all 0.3s ease;
  background: white;
  position: relative;
  z-index: 10001;

  &:focus {
    border-color: #764ba2;
  }
`

const SUGGETIONS_MAX_COUNT = 5

export function SearchSection({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  isFiltersOpen,
  onFiltersOpenChange,
  suggestions,
}: {
  query: string
  onQueryChange: (value: string) => void
  filters: SearchFilters
  onFiltersChange: (next: SearchFilters) => void
  isFiltersOpen: boolean
  onFiltersOpenChange: (open: boolean) => void
  suggestions: UseQueryResult<TmdbSearchMovieResponse, unknown>
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(-1)

  const items = useMemo(() => {
    return suggestions.data?.results?.slice(0, SUGGETIONS_MAX_COUNT) ?? []
  }, [suggestions.data])

  const hasMinChars = query.trim().length >= 2
  const canShow =
    hasMinChars &&
    (items.length > 0 ||
      suggestions.isPending ||
      suggestions.isFetching ||
      suggestions.isSuccess)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      const root = containerRef.current
      if (!root) return
      if (e.target instanceof Node && root.contains(e.target)) return
      setOpen(false)
      setActiveIndex(-1)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  const selectItem = (idx: number) => {
    const m = items[idx]
    if (!m) return
    onQueryChange(m.title)
    setOpen(false)
    setActiveIndex(-1)
  }

  return (
    <SearchSectionRoot>
      <SearchContainer ref={containerRef}>
        <SearchInput
          value={query}
          onChange={(e) => {
            const nextQuery = e.target.value
            onQueryChange(nextQuery)
            const hasEnoughChars = nextQuery.trim().length >= 2
            setOpen(hasEnoughChars)
            setActiveIndex(-1)
          }}
          placeholder="Search for movies..."
          aria-label="Search movies"
          onFocus={() => {
            if (canShow) setOpen(true)
          }}
          onKeyDown={(e) => {
            if (!open || !canShow) {
              if (e.key === 'ArrowDown' && canShow) {
                e.preventDefault()
                setOpen(true)
                if (items.length > 0) setActiveIndex(0)
              }
              return
            }
            if (e.key === 'Escape') {
              setOpen(false)
              setActiveIndex(-1)
              return
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActiveIndex((prev) => Math.min(items.length - 1, prev + 1))
              return
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActiveIndex((prev) => Math.max(0, prev - 1))
              return
            }
            if (e.key === 'Enter' && activeIndex >= 0) {
              e.preventDefault()
              selectItem(activeIndex)
            }
          }}
        />
        <AutocompleteDropdown
          open={open && canShow}
          items={items}
          query={query}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          onSelectIndex={selectItem}
          isLoading={suggestions.isPending || suggestions.isFetching}
          isEmpty={hasMinChars && suggestions.isSuccess && items.length === 0}
        />
      </SearchContainer>
      <AdvancedFilters
        filters={filters}
        onFiltersChange={onFiltersChange}
        open={isFiltersOpen}
        onOpenChange={onFiltersOpenChange}
      />
    </SearchSectionRoot>
  )
}
