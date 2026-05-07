import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SearchSection } from '../../pages/SearchPage/components/SearchSection'
import type { SearchFilters } from '../../features/search/types'
import { makeQueryResult } from '../utils'
import type { TmdbSearchMovieResponse } from '../../shared/api/tmdb/types'

vi.mock('../../shared/hooks/useGenres', () => ({
  useGenres: () => ({ data: {} }),
}))

const baseFilters: SearchFilters = {
  language: 'en-US',
  page: 1,
  includeAdult: false,
  region: '',
}

describe('SearchSection', () => {
  it('renders history and handles history actions', () => {
    const onHistorySelect = vi.fn()
    const onClearHistory = vi.fn()

    render(
      <SearchSection
        query=""
        onQueryChange={() => {}}
        filters={baseFilters}
        onFiltersChange={() => {}}
        isFiltersOpen={false}
        onFiltersOpenChange={() => {}}
        suggestions={makeQueryResult<TmdbSearchMovieResponse>()}
        history={['batman', 'matrix']}
        onHistorySelect={onHistorySelect}
        onClearHistory={onClearHistory}
      />,
    )

    expect(screen.getByRole('button', { name: 'batman' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'matrix' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'batman' }))
    expect(onHistorySelect).toHaveBeenCalledWith('batman')

    fireEvent.click(screen.getByRole('button', { name: 'Clear history' }))
    expect(onClearHistory).toHaveBeenCalled()
  })
})
