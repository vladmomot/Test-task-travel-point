import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

function Fallback() {
  return (
    <div style={{ padding: 24, color: 'white', textAlign: 'center' }}>
      <h2 style={{ marginBottom: 8 }}>Something went wrong</h2>
      <p>Try refreshing the page.</p>
    </div>
  )
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  )
}

