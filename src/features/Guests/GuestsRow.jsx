import styled from "styled-components";

import Table from "../../ui/Table";

import { useNavigate } from "react-router-dom";

const FullName = styled.div`
  font-weight: 500;
  color: var(--color-grey-600);
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function GuestsRow({
  guest: { id: guestId, fullName, email, nationality, nationalID },
}) {
  return (
    <Table.Row>
      <FullName>{fullName}</FullName>
      <div>{email}</div>
      <div>{nationality}</div>
      <div>{nationalID}</div>
    </Table.Row>
  );
}

export default GuestsRow;
