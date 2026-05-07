import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { TMDB_IMAGE_BASE_URL } from '../../shared/api/tmdb/config/tmdb'
import { useMovieDetails } from '../../features/movie/hooks/useMovieDetails'
import { formatRuntime, yearFromReleaseDate } from '../../shared/utils'

const Root = styled.main`
  min-height: 100vh;
  padding: 2rem;
  color: white;
`

const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
`

const Card = styled.section`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Poster = styled.div`
  position: relative;
  width: 100%;
  min-height: 420px;
  border-radius: 18px;
  overflow: hidden;
  background: #e5e7eb;

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
    position: relative;
    z-index: 1;

    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Title = styled.h1`
  font-size: 2.25rem;
  color: #333;
`

const Tagline = styled.p`
  color: #764ba2;
  font-weight: 600;
  font-style: italic;
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`

const Badge = styled.span`
  background: #eee9ff;
  color: #5a3a7a;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
`

const Overview = styled.p`
  color: #555;
  line-height: 1.7;
  font-size: 1rem;
`

const State = styled.div`
  max-width: 720px;
  margin: 4rem auto;
  text-align: center;
  color: white;
`

export default function MoviePage() {
  const { movieId } = useParams()
  const movie = useMovieDetails(movieId)

  if (movie.isPending) {
    return (
      <Root>
        <State>Loading movie details...</State>
      </Root>
    )
  }

  if (movie.isError) {
    return (
      <Root>
        <State>
          <h2>Failed to load movie</h2>
          <p>
            {movie.error instanceof Error
              ? movie.error.message
              : 'Something went wrong'}
          </p>
          <BackLink to="/">← Back to search</BackLink>
        </State>
      </Root>
    )
  }

  if (!movie.data) {
    return null
  }

  const posterUrl = movie.data.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${movie.data.poster_path}`
    : null

  const runtime = formatRuntime(movie.data.runtime)

  return (
    <Root>
      <BackLink to="/">← Back to search</BackLink>
      <Card>
        <Poster>
          {posterUrl ? <img src={posterUrl} alt={movie.data.title} /> : null}
        </Poster>
        <Content>
          <Title>{movie.data.title}</Title>
          {movie.data.tagline ? <Tagline>{movie.data.tagline}</Tagline> : null}
          <Meta>
            <Badge>{yearFromReleaseDate(movie.data.release_date)}</Badge>
            <Badge>⭐ {movie.data.vote_average.toFixed(1)}</Badge>
            <Badge>{movie.data.vote_count} votes</Badge>
            {runtime ? <Badge>{runtime}</Badge> : null}
          </Meta>
          {movie.data.genres.length > 0 ? (
            <Meta>
              {movie.data.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </Meta>
          ) : null}
          <Overview>{movie.data.overview || 'No overview available.'}</Overview>
          {movie.data.production_countries.length > 0 ? (
            <Overview>
              Production countries:{' '}
              {movie.data.production_countries
                .map((country) => country.name)
                .join(', ')}
            </Overview>
          ) : null}
        </Content>
      </Card>
    </Root>
  )
}
