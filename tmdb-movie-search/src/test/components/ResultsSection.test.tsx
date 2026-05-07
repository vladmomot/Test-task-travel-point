import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { TmdbSearchMovieResponse } from '../../shared/api/tmdb/types'
import { ResultsSection } from '../../pages/SearchPage/components/ResultsSection'
import { makeQueryResult } from '../utils'

vi.mock('../../pages/SearchPage/components/MoviesGrid', () => ({
  MoviesGrid: () => <div data-testid="movies-grid">movies grid</div>,
}))

const movie = {
  id: 1,
  title: 'Matrix',
  original_title: 'Matrix',
  overview: '',
  release_date: '1999-03-31',
  poster_path: null,
  vote_average: 8,
  vote_count: 100,
  adult: false,
  original_language: 'en',
  popularity: 1,
  genre_ids: [28],
}

describe('ResultsSection', () => {
  it('shows invalid page message when current page exceeds total pages', () => {
    const search = makeQueryResult<TmdbSearchMovieResponse>({
      isSuccess: true,
      data: { page: 5, results: [], total_pages: 2, total_results: 3 },
    })

    render(
      <ResultsSection
        search={search}
        query="batman"
        searchedQuery="batman"
        currentPage={5}
        onPageChange={() => {}}
      />,
    )

    expect(screen.getByText(/Page 5 is out of range/i)).toBeInTheDocument()
    expect(screen.getByText(/Invalid page number/i)).toBeInTheDocument()
  })

  it('calls onPageChange when clicking Next', () => {
    const onPageChange = vi.fn()
    const search = makeQueryResult<TmdbSearchMovieResponse>({
      isSuccess: true,
      data: {
        page: 1,
        results: [movie],
        total_pages: 3,
        total_results: 60,
      },
    })

    render(
      <ResultsSection
        search={search}
        query="matrix"
        searchedQuery="matrix"
        currentPage={1}
        onPageChange={onPageChange}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('shows start searching state when query is empty', () => {
    render(
      <ResultsSection
        search={makeQueryResult<TmdbSearchMovieResponse>()}
        query=""
        searchedQuery=""
        currentPage={1}
        onPageChange={() => {}}
      />,
    )

    expect(screen.getByText(/Start searching/i)).toBeInTheDocument()
  })

  it('shows api error message', () => {
    render(
      <ResultsSection
        search={makeQueryResult<TmdbSearchMovieResponse>({
          isError: true,
          error: new Error('API failed'),
        })}
        query="batman"
        searchedQuery="batman"
        currentPage={1}
        onPageChange={() => {}}
      />,
    )

    expect(screen.getByText('API failed')).toBeInTheDocument()
  })

  it('shows skeleton/loading state when pending', () => {
    render(
      <ResultsSection
        search={makeQueryResult<TmdbSearchMovieResponse>({
          isPending: true,
        })}
        query="batman"
        searchedQuery="batman"
        currentPage={1}
        onPageChange={() => {}}
      />,
    )

    expect(screen.getByLabelText('Loading movies')).toBeInTheDocument()
  })

  it('shows empty results state when success with no items', () => {
    render(
      <ResultsSection
        search={makeQueryResult<TmdbSearchMovieResponse>({
          isSuccess: true,
          data: {
            page: 1,
            results: [],
            total_pages: 1,
            total_results: 0,
          },
        })}
        query="unknown movie title"
        searchedQuery="unknown movie title"
        currentPage={1}
        onPageChange={() => {}}
      />,
    )

    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })
})
