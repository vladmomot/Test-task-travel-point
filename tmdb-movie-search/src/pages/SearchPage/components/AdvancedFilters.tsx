import styled from 'styled-components'
import { useSearchContext } from '../../../features/search/context/SearchContext'

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

const Input = styled.input`
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

export function AdvancedFilters() {
  const { filters, setFilters, isFiltersOpen, setIsFiltersOpen } =
    useSearchContext()

  return (
    <Root>
      <Toggle type="button" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
        {isFiltersOpen ? '🔼 Hide Advanced Options' : '🔽 Advanced Search Options'}
      </Toggle>

      <Content $open={isFiltersOpen}>
        <Field>
          <Label>Language</Label>
          <Select
            value={filters.language}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, language: e.target.value }))
            }
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="it-IT">Italian</option>
            <option value="ja-JP">Japanese</option>
            <option value="ko-KR">Korean</option>
            <option value="zh-CN">Chinese</option>
          </Select>
        </Field>

        <Field>
          <Label>Release Year</Label>
          <Input
            type="number"
            min={1900}
            max={2030}
            placeholder="e.g. 2024"
            value={filters.primaryReleaseYear ?? ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                primaryReleaseYear: e.target.value
                  ? Number(e.target.value)
                  : undefined,
              }))
            }
          />
        </Field>

        <Field>
          <Label>Year</Label>
          <Input
            type="number"
            min={1900}
            max={2030}
            placeholder="e.g. 2024"
            value={filters.year ?? ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                year: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
          />
        </Field>

        <Field>
          <Label>Region</Label>
          <Select
            value={filters.region}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, region: e.target.value }))
            }
          >
            <option value="">All Regions</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="ES">Spain</option>
            <option value="IT">Italy</option>
            <option value="JP">Japan</option>
            <option value="KR">South Korea</option>
          </Select>
        </Field>

        <Field>
          <Label>Page</Label>
          <Input
            type="number"
            min={1}
            max={1000}
            value={filters.page}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                page: Math.max(1, Number(e.target.value || 1)),
              }))
            }
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
                setFilters((prev) => ({ ...prev, includeAdult: e.target.checked }))
              }
            />
            <label htmlFor="includeAdult">Include Adult Content</label>
          </CheckboxField>
        </Field>
      </Content>
    </Root>
  )
}

