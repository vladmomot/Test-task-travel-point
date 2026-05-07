import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TMDB_IMAGE_BASE_URL } from '../../../shared/api/tmdb/config/tmdb'
import type { TmdbMovie } from '../../../shared/api/tmdb/types'
import { useGenres } from '../../../shared/hooks/useGenres'
import { yearFromReleaseDate } from '../../../shared/utils'

const Card = styled.article`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(118, 75, 162, 0.2);
  }
`

const Poster = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #e1e5e9, #f0f0f0);
  position: relative;
  overflow: hidden;

  &::before {
    content: '🎬';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
    opacity: 0.3;
  }

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Rating = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(118, 75, 162, 0.9);
  color: white;
  padding: 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  z-index: 1;
`

const Info = styled.div`
  padding: 1.5rem;
`

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`

const Year = styled.div`
  color: #764ba2;
  font-weight: 500;
  margin-bottom: 1rem;
`

const Overview = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`

const GenreTag = styled.span`
  background: rgba(118, 75, 162, 0.1);
  color: #764ba2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`

export const MovieCard = memo(function MovieCard({
  movie,
}: {
  movie: TmdbMovie
}) {
  const navigate = useNavigate()
  const { data: genresById = {} } = useGenres()

  const year = useMemo(
    () => yearFromReleaseDate(movie.release_date),
    [movie.release_date],
  )

  const posterUrl = useMemo(() => {
    if (!movie.poster_path) return null
    return `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
  }, [movie.poster_path])

  const genreNames = useMemo(() => {
    if (!movie.genre_ids?.length) return []
    return movie.genre_ids.map((id) => genresById[id]).filter(Boolean)
  }, [genresById, movie.genre_ids])

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/movie/${movie.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') navigate(`/movie/${movie.id}`)
      }}
      aria-label={`Open movie ${movie.title}`}
    >
      <Poster>
        <Rating>{movie.vote_average.toFixed(1)}</Rating>
        {posterUrl ? (
          <img src={posterUrl} alt={movie.title} loading="lazy" />
        ) : null}
      </Poster>
      <Info>
        <Title>{movie.title}</Title>
        <Year>{year}</Year>
        <Overview>{movie.overview || 'No overview available.'}</Overview>
        {genreNames.length > 0 ? (
          <Genres aria-label="Genres">
            {genreNames.slice(0, 3).map((g) => (
              <GenreTag key={g}>{g}</GenreTag>
            ))}
          </Genres>
        ) : null}
      </Info>
    </Card>
  )
})
