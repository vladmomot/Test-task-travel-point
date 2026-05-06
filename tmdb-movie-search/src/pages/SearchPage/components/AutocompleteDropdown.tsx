import styled from 'styled-components'

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10002;
  margin-top: 0.5rem;
  border: 1px solid rgba(118, 75, 162, 0.2);
  display: none;
`

export function AutocompleteDropdown() {
  return <Dropdown aria-hidden="true" />
}

