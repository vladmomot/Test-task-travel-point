import type { ReactNode } from 'react'
import { Component } from 'react'

type ErrorBoundaryProps = {
  children: ReactNode
}

type ErrorBoundaryState = {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(_error: unknown, _errorInfo: unknown) {
    // Intentionally no-op: the UI is the main requirement.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, color: 'white', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 8 }}>Something went wrong</h2>
          <p>Try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children
  }
}

