export function yearFromReleaseDate(date: string | undefined | null): string {
  if (!date) return ''
  const y = date.slice(0, 4)
  return /^\d{4}$/.test(y) ? y : ''
}

export function formatRuntime(runtime: number | null) {
  if (!runtime) return null
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  if (!hours) return `${minutes}m`
  return `${hours}h ${minutes}m`
}
