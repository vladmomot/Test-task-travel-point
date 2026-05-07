import { useQuery } from '@tanstack/react-query'
import { getMovieGenres } from '../api/tmdb/getMovieGenres'

export function useGenres() {
  return useQuery({
    queryKey: ['genres'],
    queryFn: ({ signal }) =>
      getMovieGenres({ language: 'en-US' }, signal),
    select: data =>
      Object.fromEntries(
        data.genres.map(genre => [genre.id, genre.name]),
      ) as Record<number, string>,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
  })
}