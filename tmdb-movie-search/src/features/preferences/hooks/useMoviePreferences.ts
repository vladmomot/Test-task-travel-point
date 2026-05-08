import { useContext } from 'react'
import { MoviePreferencesContext } from '../context/preferencesContext'

export function useMoviePreferences() {
  const context = useContext(MoviePreferencesContext)
  if (!context) {
    throw new Error(
      'useMoviePreferences must be used within MoviePreferencesProvider',
    )
  }

  return context
}
