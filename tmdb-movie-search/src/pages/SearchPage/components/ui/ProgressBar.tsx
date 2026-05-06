import styled, { keyframes } from 'styled-components'

const move = keyframes`
  0% { width: 0%; }
  50% { width: 70%; }
  100% { width: 100%; }
`

const Root = styled.div`
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
`

const Fill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  animation: ${move} 2s ease-in-out infinite;
`

export function ProgressBar() {
  return (
    <Root aria-label="Loading">
      <Fill />
    </Root>
  )
}

