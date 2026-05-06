import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppProviders } from './app/providers/AppProviders'

const SearchPage = lazy(() => import('./pages/SearchPage/SearchPage'))
const MoviePage = lazy(() => import('./pages/MoviePage/MoviePage'))

export default function App() {
  return (
    <AppProviders>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </Suspense>
    </AppProviders>
  )
}
