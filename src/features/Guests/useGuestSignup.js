import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useGuestSignup() {
  const { mutate: guestSignup, isPending: isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Guest signed up successfully.");
    },
  });

  return {
    guestSignup,
    isLoading,
  };
}
