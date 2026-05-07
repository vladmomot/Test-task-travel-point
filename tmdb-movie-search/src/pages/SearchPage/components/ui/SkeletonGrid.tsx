import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`

const Poster = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
`

const Info = styled.div`
  padding: 1.5rem;
`

const Line = styled.div<{ $w: string; $h: string }>`
  height: ${(p) => p.$h};
  width: ${(p) => p.$w};
  background: linear-gradient(90deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  border-radius: 4px;
  margin-bottom: 1rem;
`

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <Grid aria-label="Loading placeholder">
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx}>
          <Poster />
          <Info>
            <Line $w="80%" $h="20px" />
            <Line $w="30%" $h="16px" />
            <Line $w="100%" $h="16px" />
            <Line $w="90%" $h="16px" />
            <Line $w="60%" $h="16px" />
          </Info>
        </Card>
      ))}
    </Grid>
  )
}
