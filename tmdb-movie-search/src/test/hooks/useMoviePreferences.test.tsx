import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { MoviePreferencesProvider } from '../../features/preferences/context/MoviePreferencesContext'
import { useMoviePreferences } from '../../features/preferences/hooks/useMoviePreferences'
import { DEFAULT_MOVIE_PREFERENCES } from '../../features/preferences/types'

const wrapper = ({ children }: { children: ReactNode }) => (
  <MoviePreferencesProvider>{children}</MoviePreferencesProvider>
)

describe('useMoviePreferences', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('provides default movie preferences', () => {
    const { result } = renderHook(() => useMoviePreferences(), { wrapper })

    expect(result.current.preferences).toEqual(DEFAULT_MOVIE_PREFERENCES)
  })

  it('updates and persists movie preferences', () => {
    const { result } = renderHook(() => useMoviePreferences(), { wrapper })

    act(() => {
      result.current.setPreferences({
        language: 'fr-FR',
        region: 'FR',
        includeAdult: true,
      })
    })

    expect(result.current.preferences).toEqual({
      language: 'fr-FR',
      region: 'FR',
      includeAdult: true,
    })
    expect(localStorage.getItem('tmdb_movie_preferences')).toBe(
      JSON.stringify({
        language: 'fr-FR',
        region: 'FR',
        includeAdult: true,
      }),
    )
  })

  it('resets movie preferences', () => {
    const { result } = renderHook(() => useMoviePreferences(), { wrapper })

    act(() => {
      result.current.setPreferences({ language: 'fr-FR' })
      result.current.resetPreferences()
    })

    expect(result.current.preferences).toEqual(DEFAULT_MOVIE_PREFERENCES)
    expect(localStorage.getItem('tmdb_movie_preferences')).toBeNull()
  })
})
