import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AdvancedFilters } from '../../pages/SearchPage/components/AdvancedFilters'
import {
  DEFAULT_SEARCH_FILTERS,
  type SearchFilters,
} from '../../features/search/types'

const baseFilters: SearchFilters = {
  language: 'en-US',
  page: 1,
  includeAdult: false,
  region: '',
}

describe('AdvancedFilters', () => {
  it('calls onFiltersChange when language changes', () => {
    const onFiltersChange = vi.fn()

    render(
      <AdvancedFilters
        filters={baseFilters}
        onFiltersChange={onFiltersChange}
        open
        onOpenChange={() => {}}
      />,
    )

    fireEvent.change(screen.getByLabelText('Language'), {
      target: { value: 'fr-FR' },
    })

    expect(onFiltersChange).toHaveBeenCalled()
    expect(onFiltersChange).toHaveBeenLastCalledWith({
      ...baseFilters,
      language: 'fr-FR',
    })
  })

  it('calls onFiltersChange when region changes', () => {
    const onFiltersChange = vi.fn()

    render(
      <AdvancedFilters
        filters={baseFilters}
        onFiltersChange={onFiltersChange}
        open
        onOpenChange={() => {}}
      />,
    )

    fireEvent.change(screen.getByLabelText('Region'), {
      target: { value: 'US' },
    })

    expect(onFiltersChange).toHaveBeenCalled()
    expect(onFiltersChange).toHaveBeenLastCalledWith({
      ...baseFilters,
      region: 'US',
    })
  })

  it('resets filters and draft inputs', () => {
    const onFiltersChange = vi.fn()
    const initialFilters: SearchFilters = {
      language: 'fr-FR',
      page: 3,
      includeAdult: true,
      region: 'FR',
      year: 1999,
      primaryReleaseYear: 2000,
    }

    const { rerender } = render(
      <AdvancedFilters
        filters={initialFilters}
        onFiltersChange={onFiltersChange}
        open
        onOpenChange={() => {}}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }))

    expect(onFiltersChange).toHaveBeenCalledWith(DEFAULT_SEARCH_FILTERS)
    expect(screen.getByLabelText('Year')).toHaveValue('')
    expect(screen.getByLabelText('Release Year')).toHaveValue('')

    rerender(
      <AdvancedFilters
        filters={DEFAULT_SEARCH_FILTERS}
        onFiltersChange={onFiltersChange}
        open
        onOpenChange={() => {}}
      />,
    )

    expect(screen.getByLabelText('Page')).toHaveValue('1')
  })
})
