import styled from 'styled-components'
import type { SearchFilters } from '../../../features/search/types'
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
  margin-bottom: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #5a3a7a;
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
  const [draftReleaseYear, setDraftReleaseYear] = useState(
    filters.primaryReleaseYear?.toString() ?? '',
  )
  const [draftPage, setDraftPage] = useState(filters.page.toString())

  const MIN_YEAR = 1900
  const MAX_YEAR = new Date().getFullYear()

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

  return (
    <Root>
      <Toggle type="button" onClick={() => onOpenChange(!open)}>
        {open ? '🔼 Hide Advanced Options' : '🔽 Advanced Search Options'}
      </Toggle>
      <Content $open={open}>
        <Field>
          <Label>Language</Label>
          <Select
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
          <Label>Release Year</Label>
          <Input
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
          <Label>Year</Label>
          <Input
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
          <Label>Region</Label>
          <Select
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
          <Label>Page</Label>
          <Input
            type="text"
            inputMode="numeric"
            min={1}
            value={draftPage}
            onChange={(e) => {
              const value = e.target.value
              if (!/^\d*$/.test(value)) return
              setDraftPage(value)
              const page = Number(value)
              if (!value) return
              if (!Number.isInteger(page)) return
              if (page < 1) return
              onFiltersChange(
                updateFilters(filters, {
                  page,
                }),
              )
            }}
            onBlur={() => {
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
