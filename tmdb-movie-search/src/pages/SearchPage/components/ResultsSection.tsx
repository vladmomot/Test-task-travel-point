import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import type { UseQueryResult } from '@tanstack/react-query'
import type { TmdbSearchMovieResponse } from '../../../shared/api/tmdb/types'
import { MoviesGrid } from './MoviesGrid'
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

const Pagination = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
`

const PageButton = styled.button`
  border: 1px solid #d9c9ef;
  background: white;
  color: #5b3f87;
  border-radius: 10px;
  padding: 0.45rem 0.85rem;
  cursor: pointer;
  font-weight: 600;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const PageInfo = styled.span`
  color: #5b3f87;
  font-weight: 600;
`

type ResultsSectionProps = {
  search: UseQueryResult<TmdbSearchMovieResponse, unknown>
  query: string
  searchedQuery: string
  currentPage: number
  onPageChange: (page: number) => void
}

export function ResultsSection({
  search,
  query,
  searchedQuery,
  currentPage,
  onPageChange,
}: ResultsSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null)
  const previousPageRef = useRef(currentPage)
  const trimmed = query.trim()
  const hasQuery = trimmed.length > 0
  const trimmedSearched = searchedQuery.trim()
  const isWaitingDebounce = trimmed !== trimmedSearched
  const showProgress =
    hasQuery && search.isFetching && !search.isPending && !isWaitingDebounce
  const showSkeleton = hasQuery && (isWaitingDebounce || search.isPending)
  const showCount = hasQuery && search.isSuccess && search.data
  const totalPages = search.data?.total_pages ?? 1
  const hasInvalidPage =
    hasQuery && search.isSuccess && currentPage > totalPages
  const showPagination =
    hasQuery &&
    search.isSuccess &&
    !!search.data &&
    search.data.results.length > 0 &&
    totalPages > 1

  useEffect(() => {
    if (previousPageRef.current === currentPage) return

    previousPageRef.current = currentPage
    rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [currentPage])

  let content: React.ReactNode

  if (!hasQuery) {
    content = (
      <EmptyState>
        <h3>Start searching</h3>
        <p>Type a movie title above to see results.</p>
      </EmptyState>
    )
  } else if (showSkeleton) {
    content = <SkeletonGrid count={6} />
  } else if (search.isError) {
    content = (
      <>
        <ErrorBox role="alert">
          {search.error instanceof Error
            ? search.error.message
            : 'Failed to load results.'}
        </ErrorBox>
        <EmptyState>
          <h3>Something went wrong</h3>
          <p>Try changing the query or filters and search again.</p>
        </EmptyState>
      </>
    )
  } else if (search.isSuccess && search.data.results.length > 0) {
    content = <MoviesGrid movies={search.data.results} />
  } else if (hasInvalidPage) {
    content = (
      <>
        <ErrorBox role="alert">
          Page {currentPage} is out of range. Enter a page number less than or
          equal to {totalPages}.
        </ErrorBox>
        <EmptyState>
          <h3>Invalid page number</h3>
          <p>
            Available pages: 1 to {totalPages}. Please set a smaller page in the
            Page filter or use Prev.
          </p>
        </EmptyState>
      </>
    )
  } else {
    content = (
      <EmptyState>
        <h3>No movies found</h3>
        <p>Try searching with different keywords or check your spelling.</p>
      </EmptyState>
    )
  }

  return (
    <Root ref={rootRef}>
      {showProgress ? <ProgressBar /> : null}
      <ResultsHeader>
        <ResultsTitle>Search Results</ResultsTitle>
        <ResultsCount>
          {showCount ? `${search.data.total_results} movies found` : '—'}
        </ResultsCount>
      </ResultsHeader>
      {content}
      {showPagination ? (
        <Pagination>
          <PageButton
            type="button"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1 || search.isFetching}
          >
            Prev
          </PageButton>
          <PageInfo>
            Page {currentPage} of {totalPages}
          </PageInfo>
          <PageButton
            type="button"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage >= totalPages || search.isFetching}
          >
            Next
          </PageButton>
        </Pagination>
      ) : null}
    </Root>
  )
}
