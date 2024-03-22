import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { useGuests } from "./useGuests";
import GuestsRow from "./GuestsRow";

function GuestsTable() {
  const { isLoading, count, guests = [] } = useGuests();

  if (isLoading) return <Spinner />;

  if (!guests.length) return <Empty resourceName="guests" />;

  return (
    <Menus>
      <Table columns="2fr 2fr 2.4fr 1.4fr 1fr 2rem 2rem">
        <Table.Header>
          <div>Full Name</div>
          <div>Email</div>
          <div>Nationality</div>
          <div>National ID</div>
          <div>Country Flag</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={guests}
          render={(guest) => <GuestsRow key={guest.id} guest={guest} />}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default GuestsTable;
