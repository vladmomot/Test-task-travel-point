export function yearFromReleaseDate(date: string | undefined | null): string {
  if (!date) return ''
  const y = date.slice(0, 4)
  return /^\d{4}$/.test(y) ? y : ''
}

