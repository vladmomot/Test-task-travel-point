export type TmdbMovie = {
  id: number
  title: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string | null
  vote_average: number
  vote_count: number
  adult: boolean
  original_language: string
  popularity: number
  genre_ids: number[]
}

export type TmdbSearchMovieResponse = {
  page: number
  results: TmdbMovie[]
  total_pages: number
  total_results: number
}

export type TmdbErrorResponse = {
  status_code?: number
  status_message?: string
}

export type TmdbGenre = {
  id: number
  name: string
}

export type TmdbGenreListResponse = {
  genres: TmdbGenre[]
}

