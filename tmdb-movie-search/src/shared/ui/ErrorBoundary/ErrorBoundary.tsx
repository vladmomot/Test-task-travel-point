import type { ReactNode } from 'react'
import styled from 'styled-components'
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from 'react-error-boundary'

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1.5rem;
`

const Card = styled.div`
  width: min(100%, 560px);
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(220, 38, 38, 0.18);
  border-radius: 20px;
  padding: clamp(1.25rem, 4vw, 2rem);
  text-align: center;
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.25);
`

const Details = styled.pre`
  margin-top: 1.5rem;
  padding: 1rem;
  background: #111827;
  color: #f9fafb;
  border-radius: 12px;
  text-align: left;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.8rem;
  line-height: 1.5;
  max-height: 180px;
`

const Title = styled.h2`
  color: #991b1b;
  margin-bottom: 0.75rem;
`

const Text = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`

const Button = styled.button`
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  background: #764ba2;
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #5a3a7a;
  }
`

function Fallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error'

  return (
    <Wrapper role="alert">
      <Card>
        <Title>Something went wrong</Title>

        <Text>The app hit an unexpected React error.</Text>

        <Button type="button" onClick={resetErrorBoundary}>
          Try again
        </Button>

        {import.meta.env.DEV ? <Details>{errorMessage}</Details> : null}
      </Card>
    </Wrapper>
  )
}

export function ErrorBoundary({
  children,
  resetKeys,
}: {
  children: ReactNode
  resetKeys?: unknown[]
}) {
  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      resetKeys={resetKeys}
      onError={(error, info) => {
        console.error('React error boundary caught an error:', error, info)
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}
