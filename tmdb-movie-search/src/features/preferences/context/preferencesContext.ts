import { createContext } from 'react'
import type { MoviePreferencesContextValue } from '../types'

export const MoviePreferencesContext =
  createContext<MoviePreferencesContextValue | null>(null)
