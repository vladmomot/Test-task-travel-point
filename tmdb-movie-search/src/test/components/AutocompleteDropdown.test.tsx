import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { AutocompleteDropdown } from '../../pages/SearchPage/components/AutocompleteDropdown'

vi.mock('../../shared/hooks/useGenres', () => ({
  useGenres: () => ({ data: { 28: 'Action', 35: 'Comedy' } }),
}))

const movie = {
  id: 1,
  title: 'Fa Hai',
  original_title: 'Fa Hai',
  overview: '',
  release_date: '2020-10-10',
  poster_path: null,
  vote_average: 7,
  vote_count: 10,
  adult: false,
  original_language: 'en',
  popularity: 1,
  genre_ids: [28],
}

describe('AutocompleteDropdown', () => {
  it('shows loading state', () => {
    render(
      <AutocompleteDropdown
        open
        items={[]}
        query="bat"
        activeIndex={-1}
        onActiveIndexChange={() => {}}
        onSelectIndex={() => {}}
        isLoading
        isEmpty={false}
      />,
    )

    expect(screen.getByText('Loading suggestions...')).toBeInTheDocument()
  })

  it('calls onSelectIndex when suggestion is clicked', () => {
    const onSelectIndex = vi.fn()

    render(
      <AutocompleteDropdown
        open
        items={[movie]}
        query="Fa"
        activeIndex={0}
        onActiveIndexChange={() => {}}
        onSelectIndex={onSelectIndex}
        isLoading={false}
        isEmpty={false}
      />,
    )

    fireEvent.click(screen.getByRole('option', { name: /Fa Hai/i }))
    expect(onSelectIndex).toHaveBeenCalledWith(0)
  })

  it('shows empty state', () => {
    render(
      <AutocompleteDropdown
        open
        items={[]}
        query="unknown"
        activeIndex={-1}
        onActiveIndexChange={() => {}}
        onSelectIndex={() => {}}
        isLoading={false}
        isEmpty
      />,
    )

    expect(screen.getByText('No movies found')).toBeInTheDocument()
  })

  it('highlights matching text in suggestion title', () => {
    render(
      <AutocompleteDropdown
        open
        items={[movie]}
        query="Fa"
        activeIndex={0}
        onActiveIndexChange={() => {}}
        onSelectIndex={() => {}}
        isLoading={false}
        isEmpty={false}
      />,
    )

    expect(screen.getByText('Fa', { selector: 'mark' })).toBeInTheDocument()
  })
})
