import styled from "styled-components";

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1; // span from the first row to the last row
`;

function Sidebar() {
  return <StyledSidebar>sidebar</StyledSidebar>;
}

export default Sidebar;
