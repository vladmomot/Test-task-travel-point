import styled from 'styled-components'
import type { SearchFilters } from '../../../features/search/types'
import { AdvancedFilters } from './AdvancedFilters'
import { AutocompleteDropdown } from './AutocompleteDropdown'

const SearchSectionRoot = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  z-index: 100;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const SearchContainer = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto;
  z-index: 10000;
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

export function SearchSection({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  isFiltersOpen,
  onFiltersOpenChange,
}: {
  query: string
  onQueryChange: (value: string) => void
  filters: SearchFilters
  onFiltersChange: (next: SearchFilters) => void
  isFiltersOpen: boolean
  onFiltersOpenChange: (open: boolean) => void
}) {
  return (
    <SearchSectionRoot>
      <SearchContainer>
        <SearchInput
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for movies..."
          aria-label="Search movies"
        />
        <AutocompleteDropdown />
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

