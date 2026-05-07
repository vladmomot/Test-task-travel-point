import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Root = styled.div<{ $compact: boolean }>`
  text-align: center;
  padding: ${(p) => (p.$compact ? '1rem 1.25rem' : '3rem')};
  color: #666;
`

const Spinner = styled.div<{ $compact: boolean }>`
  width: ${(p) => (p.$compact ? '18px' : '40px')};
  height: ${(p) => (p.$compact ? '18px' : '40px')};
  border: ${(p) => (p.$compact ? '2px' : '4px')} solid #f0f0f0;
  border-top: ${(p) => (p.$compact ? '2px' : '4px')} solid #764ba2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: ${(p) => (p.$compact ? '0 auto 0.4rem' : '0 auto 1rem')};
`

export function LoadingState({
  text,
  compact = false,
}: {
  text: string
  compact?: boolean
}) {
  return (
    <Root $compact={compact}>
      <Spinner $compact={compact} />
      <p>{text}</p>
    </Root>
  )
}
