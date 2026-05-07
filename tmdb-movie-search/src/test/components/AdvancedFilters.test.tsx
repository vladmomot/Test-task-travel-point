import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AdvancedFilters } from '../../pages/SearchPage/components/AdvancedFilters'
import type { SearchFilters } from '../../features/search/types'

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
})
