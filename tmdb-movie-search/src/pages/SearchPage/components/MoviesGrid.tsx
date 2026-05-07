import { memo } from 'react'
import styled from 'styled-components'
import type { TmdbMovie } from '../../../shared/api/tmdb/types'
import { MovieCard } from './MovieCard'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`

export const MoviesGrid = memo(function MoviesGrid({
  movies,
}: {
  movies: TmdbMovie[]
}) {
  return (
    <Grid>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </Grid>
  )
})
