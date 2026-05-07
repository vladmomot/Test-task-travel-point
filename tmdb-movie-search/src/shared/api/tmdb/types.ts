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

export type SearchMoviesParams = {
  query: string
  language?: string
  page?: number
  include_adult?: boolean
  region?: string
  year?: number
  primary_release_year?: number
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
export type TmdbMovieDetails = {
  id: number
  title: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  runtime: number | null
  tagline: string
  genres: {
    id: number
    name: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
}
