import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from '../../shared/ui/ErrorBoundary/ErrorBoundary'
import { GlobalStyle } from '../styles/GlobalStyle'
import { SearchProvider } from '../../features/search/context/SearchContext'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <BrowserRouter>
        <SearchProvider>{children}</SearchProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

