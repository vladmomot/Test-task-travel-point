import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { useSearchHistory } from '../../features/search/hooks/useSearchHistory'

describe('useSearchHistory', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds queries and deduplicates keeping newest first', () => {
    const { result } = renderHook(() => useSearchHistory())

    act(() => {
      result.current.addQuery('batman')
      result.current.addQuery('matrix')
      result.current.addQuery('batman')
    })

    expect(result.current.history).toEqual(['batman', 'matrix'])
  })

  it('clears history', () => {
    const { result } = renderHook(() => useSearchHistory())

    act(() => {
      result.current.addQuery('dune')
      result.current.clearHistory()
    })

    expect(result.current.history).toEqual([])
    expect(localStorage.getItem('tmdb_recent_queries')).toBeNull()
  })
})
