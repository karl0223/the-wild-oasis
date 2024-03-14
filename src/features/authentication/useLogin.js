import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log("An error occurred while logging in", error);
      toast.error(
        "Provided email or password are incorrect. Please try again."
      );
    },
  });

  return {
    login,
    isLoading,
  };
}
