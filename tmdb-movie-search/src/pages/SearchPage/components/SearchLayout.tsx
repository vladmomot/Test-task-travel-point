import styled from 'styled-components'
import type { UseQueryResult } from '@tanstack/react-query'
import type { TmdbSearchMovieResponse } from '../../../shared/api/tmdb/types'
import type { SearchFilters } from '../../../features/search/types'
import { ResultsSection } from './ResultsSection'
import { SearchSection } from './SearchSection'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;

  h1 {
    color: white;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.2rem;
  }
`

export function SearchLayout({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  isFiltersOpen,
  onFiltersOpenChange,
  search,
  searchedQuery
}: {
  query: string
  searchedQuery: string
  onQueryChange: (value: string) => void
  filters: SearchFilters
  onFiltersChange: (next: SearchFilters) => void
  isFiltersOpen: boolean
  onFiltersOpenChange: (open: boolean) => void
  search: UseQueryResult<TmdbSearchMovieResponse, unknown>
}) {
  return (
    <Container>
      <Header>
        <h1>TMDB Movie Search</h1>
        <p>Find your favorite movies with powerful search and autocomplete</p>
      </Header>
      <SearchSection
        query={query}
        onQueryChange={onQueryChange}
        filters={filters}
        onFiltersChange={onFiltersChange}
        isFiltersOpen={isFiltersOpen}
        onFiltersOpenChange={onFiltersOpenChange}
      />
      <ResultsSection search={search} query={query} searchedQuery={searchedQuery} />
    </Container>
  )
}

