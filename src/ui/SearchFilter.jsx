import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledSearchFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const SearchInput = styled.input`
  background-color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
  }
`;

function SearchFilter({ filterField }) {
  const [searchParams, setSearchParams] = useSearchParams(); // save the state in the URL
  const currentFilter = searchParams.get(filterField) || "";

  function handleChange(event) {
    const { value } = event.target;

    searchParams.set(filterField, value);

    if (searchParams.get("page")) searchParams.set("page", 1); // reset the page number to 1 when the filter changes

    setSearchParams(searchParams);
  }

  return (
    <StyledSearchFilter>
      <SearchInput
        type="text"
        value={currentFilter}
        onChange={handleChange}
        placeholder="Search name..."
      />
    </StyledSearchFilter>
  );
}

export default SearchFilter;
