export type MoviePreferences = {
  language: string
  region: string
  includeAdult: boolean
}

export type MoviePreferencesContextValue = {
  preferences: MoviePreferences
  setPreferences: (patch: Partial<MoviePreferences>) => void
  resetPreferences: () => void
}

export const DEFAULT_MOVIE_PREFERENCES: MoviePreferences = {
  language: 'en-US',
  region: '',
  includeAdult: false,
}
