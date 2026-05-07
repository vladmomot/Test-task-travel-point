import type { UseQueryResult } from '@tanstack/react-query'

export function makeQueryResult<T>(
  override: Partial<UseQueryResult<T, unknown>> = {},
): UseQueryResult<T, unknown> {
  return {
    isFetching: false,
    isPending: false,
    isSuccess: false,
    isError: false,
    data: undefined,
    error: null,
    ...override,
  } as UseQueryResult<T, unknown>
}
