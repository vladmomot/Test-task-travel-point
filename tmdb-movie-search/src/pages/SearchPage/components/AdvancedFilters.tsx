import styled from 'styled-components'
import {
  DEFAULT_SEARCH_FILTERS,
  type SearchFilters,
} from '../../../features/search/types'
import {
  LANGUAGE_OPTIONS,
  REGION_OPTIONS,
} from '../../../features/search/constants'
import { useState } from 'react'

const Root = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #e1e5e9;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    align-items: flex-start;
    flex-direction: column;
  }
`

const Toggle = styled.button`
  background: none;
  border: none;
  color: #764ba2;
  font-weight: 600;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: #5a3a7a;
  }
`

const ResetButton = styled.button`
  border: 1px solid #d9c9ef;
  background: white;
  color: #5b3f87;
  border-radius: 10px;
  padding: 0.45rem 0.8rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: rgba(118, 75, 162, 0.08);
    border-color: #b89bdc;
    color: #43276e;
    outline: none;
  }
`

const Content = styled.div<{ $open: boolean }>`
  display: ${(p) => (p.$open ? 'grid' : 'none')};
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
`

const Input = styled.input<{ $invalid?: boolean }>`
  padding: 0.75rem;
  border: 2px solid ${(p) => (p.$invalid ? '#dc2626' : '#e1e5e9')};
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${(p) => (p.$invalid ? '#dc2626' : '#764ba2')};

    box-shadow: 0 0 0 3px
      ${(p) =>
        p.$invalid ? 'rgba(220, 38, 38, 0.15)' : 'rgba(118, 75, 162, 0.15)'};
  }
`

const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 0.95rem;
  background: white;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #764ba2;
  }
`

const CheckboxField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;

  input[type='checkbox'] {
    width: 18px;
    height: 18px;
    accent-color: #764ba2;
  }

  label {
    font-size: 0.95rem;
    color: #333;
    cursor: pointer;
  }
`

function updateFilters(
  prev: SearchFilters,
  patch: Partial<SearchFilters>,
): SearchFilters {
  return { ...prev, ...patch }
}

const MIN_YEAR = 1900
const MAX_YEAR = new Date().getFullYear()

export function AdvancedFilters({
  filters,
  onFiltersChange,
  open,
  onOpenChange,
}: {
  filters: SearchFilters
  onFiltersChange: (next: SearchFilters) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const [draftYear, setDraftYear] = useState(filters.year?.toString() ?? '')
  const [isPageEditing, setIsPageEditing] = useState(false)
  const [draftReleaseYear, setDraftReleaseYear] = useState(
    filters.primaryReleaseYear?.toString() ?? '',
  )
  const [draftPage, setDraftPage] = useState(filters.page.toString())
  const pageValue = isPageEditing ? draftPage : filters.page.toString()

  function parseValidYear(value: string) {
    if (!value) return undefined
    const year = Number(value)
    if (!Number.isInteger(year)) return undefined
    if (year < MIN_YEAR || year > MAX_YEAR) return undefined
    return year
  }

  const isYearInvalid =
    draftYear.length >= 4 && parseValidYear(draftYear) === undefined

  const isReleaseYearInvalid =
    draftReleaseYear.length >= 4 &&
    parseValidYear(draftReleaseYear) === undefined

  const resetFilters = () => {
    setDraftYear('')
    setDraftReleaseYear('')
    setDraftPage(DEFAULT_SEARCH_FILTERS.page.toString())
    setIsPageEditing(false)
    onFiltersChange({ ...DEFAULT_SEARCH_FILTERS })
  }

  return (
    <Root>
      <Header>
        <Toggle type="button" onClick={() => onOpenChange(!open)}>
          {open ? '🔼 Hide Advanced Options' : '🔽 Advanced Search Options'}
        </Toggle>
        <ResetButton type="button" onClick={resetFilters}>
          Reset filters
        </ResetButton>
      </Header>
      <Content $open={open}>
        <Field>
          <Label htmlFor="language">Language</Label>
          <Select
            id="language"
            value={filters.language}
            onChange={(e) =>
              onFiltersChange(
                updateFilters(filters, { language: e.target.value }),
              )
            }
          >
            {LANGUAGE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="releaseYear">Release Year</Label>
          <Input
            id="releaseYear"
            $invalid={isReleaseYearInvalid}
            type="text"
            inputMode="numeric"
            min={MIN_YEAR}
            max={MAX_YEAR}
            maxLength={4}
            placeholder="e.g. 2024"
            value={draftReleaseYear}
            onChange={(e) => {
              const value = e.target.value
              if (!/^\d*$/.test(value)) return
              setDraftReleaseYear(value)
              onFiltersChange(
                updateFilters(filters, {
                  primaryReleaseYear: parseValidYear(value),
                }),
              )
            }}
          />
        </Field>
        <Field>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            $invalid={isYearInvalid}
            type="text"
            inputMode="numeric"
            min={MIN_YEAR}
            max={MAX_YEAR}
            maxLength={4}
            placeholder="e.g. 2024"
            value={draftYear}
            onChange={(e) => {
              const value = e.target.value
              if (!/^\d*$/.test(value)) return
              setDraftYear(value)
              onFiltersChange(
                updateFilters(filters, {
                  year: parseValidYear(value),
                }),
              )
            }}
          />
        </Field>
        <Field>
          <Label htmlFor="region">Region</Label>
          <Select
            id="region"
            value={filters.region}
            onChange={(e) =>
              onFiltersChange(
                updateFilters(filters, { region: e.target.value }),
              )
            }
          >
            {REGION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="page">Page</Label>
          <Input
            id="page"
            type="text"
            inputMode="numeric"
            min={1}
            value={pageValue}
            onFocus={() => {
              setIsPageEditing(true)
              setDraftPage(filters.page.toString())
            }}
            onChange={(e) => {
              const value = e.target.value
              if (!/^\d*$/.test(value)) return
              setDraftPage(value)
              if (!value) return
              const page = Number(value)
              if (!Number.isInteger(page)) return
              if (page < 1) return
              onFiltersChange(
                updateFilters(filters, {
                  page,
                }),
              )
            }}
            onBlur={() => {
              setIsPageEditing(false)
              if (!draftPage) {
                setDraftPage(filters.page.toString())
              }
            }}
          />
        </Field>
        <Field>
          <Label>Content Filter</Label>
          <CheckboxField>
            <input
              id="includeAdult"
              type="checkbox"
              checked={filters.includeAdult}
              onChange={(e) =>
                onFiltersChange(
                  updateFilters(filters, { includeAdult: e.target.checked }),
                )
              }
            />
            <label htmlFor="includeAdult">Include Adult Content</label>
          </CheckboxField>
        </Field>
      </Content>
    </Root>
  )
}
