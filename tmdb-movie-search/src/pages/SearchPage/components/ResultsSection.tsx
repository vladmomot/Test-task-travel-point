import styled from 'styled-components'
import type { MovieSearchState } from '../../../features/search/hooks/useMovieSearch'
import { useSearchContext } from '../../../features/search/context/SearchContext'
import { MoviesGrid } from './MoviesGrid'
import { LoadingState } from './ui/LoadingState'
import { ProgressBar } from './ui/ProgressBar'
import { SkeletonGrid } from './ui/SkeletonGrid'

const Root = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  z-index: 50;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`

const ResultsTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  font-weight: 600;
`

const ResultsCount = styled.span`
  color: #764ba2;
  font-weight: 500;
`

const ErrorBox = styled.div`
  background: rgba(220, 38, 38, 0.08);
  border: 1px solid rgba(220, 38, 38, 0.25);
  color: #991b1b;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  p {
    font-size: 1.1rem;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`

export function ResultsSection({ search }: { search: MovieSearchState }) {
  const { query } = useSearchContext()
  const trimmed = query.trim()

  const isLoading = search.status === 'loading'
  const isIdle = search.status === 'idle'
  const isError = search.status === 'error'
  const isSuccess = search.status === 'success'

  return (
    <Root>
      {isLoading ? <ProgressBar /> : null}

      <ResultsHeader>
        <ResultsTitle>Search Results</ResultsTitle>
        <ResultsCount>
          {isSuccess ? `${search.totalResults} movies found` : '—'}
        </ResultsCount>
      </ResultsHeader>

      {isError ? (
        <>
          <ErrorBox role="alert">
            {search.errorMessage || 'Failed to load results.'}
          </ErrorBox>
          <EmptyState>
            <h3>Something went wrong</h3>
            <p>Try changing the query or filters and search again.</p>
          </EmptyState>
        </>
      ) : null}

      {isIdle ? (
        <EmptyState>
          <h3>Start searching</h3>
          <p>Type a movie title above to see results.</p>
        </EmptyState>
      ) : null}

      {isLoading ? (
        trimmed.length < 2 ? (
          <LoadingState text="Searching for movies..." />
        ) : (
          <SkeletonGrid count={6} />
        )
      ) : null}

      {isSuccess ? (
        search.movies.length > 0 ? (
          <MoviesGrid movies={search.movies} />
        ) : (
          <EmptyState>
            <h3>No movies found</h3>
            <p>Try searching with different keywords or check your spelling.</p>
          </EmptyState>
        )
      ) : null}
    </Root>
  )
}

