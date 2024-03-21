import { useQuery } from "@tanstack/react-query";
import { getGuests } from "../../services/apiGuests";

export function useGuests() {
  const {
    data: guests,

    isLoading,
  } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return {
    guests,
    isLoading,
  };
}
