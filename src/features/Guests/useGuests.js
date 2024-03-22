import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGuests() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // FILTER
  const filterValue = searchParams.get("fullName");
  const filter =
    !filterValue || filterValue === ""
      ? null
      : {
          field: "fullName",
          value: filterValue,
          method: "ilike",
        };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "fullName-asc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field,
    direction,
  };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: guests, count } = {}, isLoading } = useQuery({
    queryKey: ["guests", filter, sortBy, page],
    queryFn: () => getGuests({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1], // Pre-fetch the next page of bookings
      queryFn: () => getGuests({ filter, sortBy, page: page + 1 }), // Pre-fetch the next page of bookings
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1], // Pre-fetch the prev page of bookings
      queryFn: () => getGuests({ filter, sortBy, page: page - 1 }), // Pre-fetch the prev page of bookings
    });

  return {
    guests,
    isLoading,
    count,
  };
}
