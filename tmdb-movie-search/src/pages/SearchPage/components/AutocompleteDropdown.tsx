import styled from 'styled-components'
import type { TmdbMovie } from '../../../shared/api/tmdb/types'
import { useMemo } from 'react'
import { TMDB_IMAGE_BASE_URL } from '../../../shared/api/tmdb/config/tmdb'
import { useGenres } from '../../../shared/hooks/useGenres'
import { yearFromReleaseDate } from '../../../shared/utils'
import { LoadingState } from './ui/LoadingState'

const Dropdown = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  max-height: 480px;
  overflow-y: auto;
  z-index: 99999;
  margin-top: 0.5rem;
  border: 1px solid rgba(118, 75, 162, 0.2);
  display: ${(p) => (p.$open ? 'block' : 'none')};
`

const Item = styled.button<{ $active: boolean }>`
  padding: 1rem 1.5rem;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: left;
  background: ${(p) => (p.$active ? '#eee9ff' : 'white')};
  box-shadow: ${(p) => (p.$active ? 'inset 4px 0 0 #764ba2' : 'none')};

  &:hover {
    background-color: #eee9ff;
  }

  &:last-child {
    border-bottom: none;
  }
`

const Poster = styled.div`
  width: 40px;
  height: 60px;
  background: #e1e5e9;
  border-radius: 5px;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  &::before {
    content: '🎬';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
    opacity: 0.35;
    z-index: 0;
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

const Info = styled.div`
  h4 {
    color: #333;
    margin-bottom: 0.25rem;
    font-size: 1rem;
    font-weight: 600;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }

  mark {
    background: #f3e8ff;
    color: #4c1d95;
    border-radius: 4px;
    padding: 0 0.15rem;
  }
`

const StateRow = styled.div`
  padding: 1rem 1.5rem;
  color: #666;
  font-size: 0.95rem;
`

export function AutocompleteDropdown({
  open,
  items,
  query,
  activeIndex,
  onActiveIndexChange,
  onSelectIndex,
  isLoading,
  isEmpty,
}: {
  open: boolean
  items: TmdbMovie[]
  query: string
  activeIndex: number
  onActiveIndexChange: (idx: number) => void
  onSelectIndex: (idx: number) => void
  isLoading: boolean
  isEmpty: boolean
}) {
  const { data: genresById = {} } = useGenres()

  const autocompleteMovies = useMemo(() => {
    return items.map((movie) => {
      const year = yearFromReleaseDate(movie.release_date)
      const genreText = (movie.genre_ids || [])
        .map((id) => genresById[id])
        .filter(Boolean)
        .slice(0, 2)
        .join(', ')

      const meta = [year, genreText].filter(Boolean).join(' • ')
      const posterUrl = movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : null

      return { movie: movie, meta, posterUrl }
    })
  }, [genresById, items])

  const highlightedTitle = (title: string) => {
    const q = query.trim()
    if (!q) return title
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escaped})`, 'ig')
    const parts = title.split(regex)
    return parts.map((part, idx) =>
      idx % 2 === 1 ? <mark key={`${part}-${idx}`}>{part}</mark> : part,
    )
  }

  return (
    <Dropdown $open={open} role="listbox" aria-label="Suggestions">
      {isLoading && autocompleteMovies.length === 0 ? (
        <LoadingState text="Loading suggestions..." compact />
      ) : isEmpty ? (
        <StateRow>No movies found</StateRow>
      ) : null}
      {autocompleteMovies.map((data, idx) => (
        <Item
          key={data.movie.id}
          type="button"
          role="option"
          aria-selected={idx === activeIndex}
          $active={idx === activeIndex}
          onMouseEnter={() => onActiveIndexChange(idx)}
          onMouseDown={(e) => {
            e.preventDefault()
          }}
          onClick={() => onSelectIndex(idx)}
        >
          <Poster>
            {data.posterUrl ? <img src={data.posterUrl} alt="" /> : null}
          </Poster>
          <Info>
            <h4>{highlightedTitle(data.movie.title)}</h4>
            <p>{data.meta}</p>
          </Info>
        </Item>
      ))}
    </Dropdown>
  )
}
