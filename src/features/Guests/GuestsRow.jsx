import styled from "styled-components";

import Table from "../../ui/Table";

import { useNavigate } from "react-router-dom";

const FullName = styled.div`
  font-weight: 500;
  color: var(--color-grey-600);
`;

const Img = styled.img`
  display: block;
  width: 5rem;
  height: 4rem;
  object-fit: contain;
  object-position: center;
`;

function GuestsRow({
  guest: { id: guestId, fullName, email, nationality, nationalID, countryFlag },
}) {
  return (
    <Table.Row>
      <FullName>{fullName}</FullName>
      <div>{email}</div>
      <div>{nationality}</div>
      <div>{nationalID}</div>
      <Img src={countryFlag} alt={nationality} />
    </Table.Row>
  );
}

export default GuestsRow;
