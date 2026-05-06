import styled from 'styled-components'
import type { MovieSearchState } from '../../../features/search/hooks/useMovieSearch'
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

export function SearchLayout({ search }: { search: MovieSearchState }) {
  return (
    <Container>
      <Header>
        <h1>TMDB Movie Search</h1>
        <p>Find your favorite movies with powerful search and autocomplete</p>
      </Header>

      <SearchSection />
      <ResultsSection search={search} />
    </Container>
  )
}

