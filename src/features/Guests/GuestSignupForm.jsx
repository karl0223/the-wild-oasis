import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useGuestSignup } from "./useGuestSignup";

import countries from "../../data/countryCodes.json";
import toast from "react-hot-toast";

// Email regex: /\S+@\S+\.\S+/

function GuestSignupForm() {
  const { guestSignup, isLoading } = useGuestSignup();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, nationalID, nationality }) {
    const capitalizedCountryName =
      nationality.charAt(0).toUpperCase() + nationality.slice(1);
    const countryCode = countries[capitalizedCountryName]?.toLowerCase();

    if (!countryCode) {
      toast.error(
        "Country not found. Please check the nationality and try again."
      );
      return;
    }

    const countryFlag = `https://flagcdn.com/${countryCode}.svg`;

    guestSignup(
      {
        fullName,
        email,
        nationalID,
        nationality: capitalizedCountryName,
        countryFlag,
      },
      {
        onSettled: reset, // Reset the form after the mutation is settled
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          disabled={isLoading}
          id="email"
          {...register("email", {
            required: "This field is required.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Nationality" error={errors?.nationality?.message}>
        <Input
          type="text"
          id="nationality"
          disabled={isLoading}
          {...register("nationality", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="National ID" error={errors?.nationalId?.message}>
        <Input
          type="text"
          id="nationalID"
          disabled={isLoading}
          {...register("nationalID", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new guest</Button>
      </FormRow>
    </Form>
  );
}

export default GuestSignupForm;
