import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";
import SearchFilter from "../../ui/SearchFilter";

function GuestsTableOperations() {
  return (
    <TableOperations>
      <SearchFilter filterField="fullName" />

      <SortBy
        options={[
          {
            value: "fullName-asc",
            label: "Sort by Full Name (A-Z)",
          },
          {
            value: "fullName-desc",
            label: "Sort by Full Name (Z-A)",
          },
          {
            value: "nationality-asc",
            label: "Sort by Nationality (A-Z)",
          },
          { value: "nationality-desc", label: "Sort by Nationality (Z-A)" },
        ]}
      />
    </TableOperations>
  );
}

export default GuestsTableOperations;
