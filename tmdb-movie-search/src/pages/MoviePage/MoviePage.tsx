import { useParams } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: white;
`

export default function MoviePage() {
  const { movieId } = useParams<{ movieId: string }>()

  return (
    <Wrapper>
      <h2 style={{ marginBottom: 8 }}>Movie page</h2>
      <p>Movie id: {movieId}</p>
      <p>Coming soon...</p>
    </Wrapper>
  )
}

