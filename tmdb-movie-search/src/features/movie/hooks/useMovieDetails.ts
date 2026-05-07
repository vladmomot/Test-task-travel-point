import { useQuery } from '@tanstack/react-query'
import { getMovieDetails } from '../../../shared/api/tmdb/getMovieDetails'

export function useMovieDetails(id: string | undefined) {
  return useQuery({
    queryKey: ['movieDetails', id],
    enabled: Boolean(id),
    queryFn: ({ signal }) => getMovieDetails(id!, signal),
  })
}
