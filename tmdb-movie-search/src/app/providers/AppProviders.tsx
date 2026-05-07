import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary/ErrorBoundary'
import { GlobalStyle } from '../styles/GlobalStyle'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
    },
  },
})

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
