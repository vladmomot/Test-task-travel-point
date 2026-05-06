import { useSearchContext } from '../../features/search/context/SearchContext'
import { useMovieSearch } from '../../features/search/hooks/useMovieSearch'
import { useDebouncedValue } from '../../shared/hooks/useDebouncedValue'
import { SearchLayout } from './components/SearchLayout'

export default function SearchPage() {
  const { query, filters } = useSearchContext()
  const debouncedQuery = useDebouncedValue(query, 350)
  const result = useMovieSearch(debouncedQuery, filters)

  return <SearchLayout search={result} />
}

