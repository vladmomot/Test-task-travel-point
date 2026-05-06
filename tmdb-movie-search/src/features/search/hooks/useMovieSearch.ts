import { useEffect, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../../../shared/api/tmdb/searchMovies'
import type { TmdbMovie } from '../../../shared/api/tmdb/types'
import type { SearchFilters } from '../context/SearchContext'

export type MovieSearchState = {
  status: 'idle' | 'loading' | 'success' | 'error'
  movies: TmdbMovie[]
  totalResults: number
  errorMessage?: string
}

export function useMovieSearch(query: string, filters: SearchFilters) {
  const [state, setState] = useState<MovieSearchState>({
    status: 'idle',
    movies: [],
    totalResults: 0,
  })

  const requestKey = useMemo(() => {
    return JSON.stringify({
      query: query.trim(),
      filters,
    })
  }, [filters, query])

  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      abortRef.current?.abort()
      setState({ status: 'idle', movies: [], totalResults: 0 })
      return
    }

    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac

    setState((prev) => ({
      ...prev,
      status: 'loading',
      errorMessage: undefined,
    }))

    searchMovies(
      {
        query: trimmed,
        language: filters.language,
        page: filters.page,
        include_adult: filters.includeAdult,
        region: filters.region || undefined,
        year: filters.year,
        primary_release_year: filters.primaryReleaseYear,
      },
      ac.signal,
    )
      .then((res) => {
        setState({
          status: 'success',
          movies: res.results,
          totalResults: res.total_results,
        })
      })
      .catch((err: unknown) => {
        if (ac.signal.aborted) return
        const message =
          err instanceof Error ? err.message : 'Something went wrong'
        setState({
          status: 'error',
          movies: [],
          totalResults: 0,
          errorMessage: message,
        })
      })

    return () => ac.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestKey])

  return state
}

