import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const Root = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #764ba2;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto 1rem;
`

export function LoadingState({ text }: { text: string }) {
  return (
    <Root>
      <Spinner />
      <p>{text}</p>
    </Root>
  )
}
