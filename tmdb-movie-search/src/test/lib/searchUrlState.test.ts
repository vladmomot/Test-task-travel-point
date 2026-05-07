import { describe, expect, it } from 'vitest'
import {
  parseSearchUrlState,
  serializeSearchUrlState,
} from '../../features/search/lib/searchUrlState'
import type { SearchFilters } from '../../features/search/types'

describe('searchUrlState', () => {
  it('parses query and filters from URL params', () => {
    const state = parseSearchUrlState(
      new URLSearchParams(
        'q=matrix&language=fr-FR&page=3&includeAdult=true&region=FR&year=1999&primaryReleaseYear=2000',
      ),
    )

    expect(state).toEqual({
      query: 'matrix',
      filters: {
        language: 'fr-FR',
        page: 3,
        includeAdult: true,
        region: 'FR',
        year: 1999,
        primaryReleaseYear: 2000,
      },
    })
  })

  it('falls back to defaults for invalid numeric values', () => {
    const state = parseSearchUrlState(
      new URLSearchParams('page=0&year=1800&primaryReleaseYear=not-a-year'),
    )

    expect(state.filters.page).toBe(1)
    expect(state.filters.year).toBeUndefined()
    expect(state.filters.primaryReleaseYear).toBeUndefined()
  })

  it('serializes only meaningful search state', () => {
    const filters: SearchFilters = {
      language: 'en-US',
      page: 2,
      includeAdult: false,
      region: '',
    }

    expect(serializeSearchUrlState('  matrix  ', filters).toString()).toBe(
      'q=matrix&page=2',
    )
  })
})
