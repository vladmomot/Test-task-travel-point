import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'tmdb_recent_queries'
const MAX_HISTORY = 10

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([])
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as unknown
      if (!Array.isArray(parsed)) return
      const valid = parsed
        .filter(
          (v): v is string => typeof v === 'string' && v.trim().length > 0,
        )
        .slice(0, MAX_HISTORY)
      setHistory(valid)
    } catch {}
  }, [])

  const addQuery = useCallback((query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    setHistory((prev) => {
      const next = [trimmed, ...prev.filter((h) => h !== trimmed)].slice(
        0,
        MAX_HISTORY,
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setHistory([])
  }, [])

  return {
    history,
    addQuery,
    clearHistory,
  }
}
