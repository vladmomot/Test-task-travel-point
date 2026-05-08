import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  DEFAULT_MOVIE_PREFERENCES,
  type MoviePreferences,
  type MoviePreferencesContextValue,
} from '../types'
import { MoviePreferencesContext } from './preferencesContext'

const STORAGE_KEY = 'tmdb_movie_preferences'

function normalizePreferences(value: unknown): MoviePreferences {
  if (!value || typeof value !== 'object') return DEFAULT_MOVIE_PREFERENCES
  const record = value as Partial<Record<keyof MoviePreferences, unknown>>
  return {
    language:
      typeof record.language === 'string' && record.language
        ? record.language
        : DEFAULT_MOVIE_PREFERENCES.language,
    region:
      typeof record.region === 'string'
        ? record.region
        : DEFAULT_MOVIE_PREFERENCES.region,
    includeAdult:
      typeof record.includeAdult === 'boolean'
        ? record.includeAdult
        : DEFAULT_MOVIE_PREFERENCES.includeAdult,
  }
}

function readPreferencesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_MOVIE_PREFERENCES
    return normalizePreferences(JSON.parse(raw) as unknown)
  } catch {
    return DEFAULT_MOVIE_PREFERENCES
  }
}

function writePreferencesToStorage(preferences: MoviePreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences))
  } catch {
    // Storage may be unavailable in private browsing or restricted contexts.
  }
}

function clearPreferencesFromStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Storage may be unavailable in private browsing or restricted contexts.
  }
}

export function MoviePreferencesProvider({
  children,
}: {
  children: ReactNode
}) {
  const [preferences, setPreferencesState] = useState<MoviePreferences>(
    readPreferencesFromStorage,
  )

  const setPreferences = useCallback((patch: Partial<MoviePreferences>) => {
    setPreferencesState((prev) => {
      const next = normalizePreferences({ ...prev, ...patch })
      writePreferencesToStorage(next)
      return next
    })
  }, [])

  const resetPreferences = useCallback(() => {
    clearPreferencesFromStorage()
    setPreferencesState(DEFAULT_MOVIE_PREFERENCES)
  }, [])

  const value = useMemo<MoviePreferencesContextValue>(
    () => ({ preferences, setPreferences, resetPreferences }),
    [preferences, resetPreferences, setPreferences],
  )

  return (
    <MoviePreferencesContext.Provider value={value}>
      {children}
    </MoviePreferencesContext.Provider>
  )
}
