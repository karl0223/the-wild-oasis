import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";

import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";
import { useCabins } from "../cabins/useCabins";

import Spinner from "../../ui/Spinner";
import styled from "styled-components";
import { useMemo, useState } from "react";
import { useCreateBooking } from "./useCreateBooking";
import { useSettings } from "../settings/useSettings";
import { subtractDates } from "../../utils/helpers";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const hasBreakfastOptions = [
  {
    key: "false1",
    label: "False",
    value: false,
  },
  {
    key: "true1",
    label: "True",
    value: true,
  },
];

const isPaidOptions = [
  {
    key: "false2",
    label: "False",
    value: false,
  },
  {
    key: "true2",
    label: "True",
    value: true,
  },
];

const statusOptions = [
  {
    key: "unconfirmed",
    label: "Unconfirmed",
    value: "unconfirmed",
  },
  {
    key: "checked-in",
    label: "Checked-in",
    value: "checked-in",
  },
  {
    key: "checked-out",
    label: "Checked-out",
    value: "checked-out",
  },
];

function CreateBookingForm({
  cabins,
  isLoadingCabin,
  guestId,
  bookingToEdit = {},
  onCloseModal,
}) {
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { isLoading: isLoadingSettings, error, settings } = useSettings();

  const { errors } = formState;

  const { createBooking, isCreatingBooking } = useCreateBooking({ reset });

  const cabinsOptions = cabins?.map((cabin) => ({
    label: cabin.name,
    value: cabin.id,
  }));

  const [selectedCabin, setSelectedCabin] = useState(cabinsOptions?.[0]?.value);

  const { maxCapacity, regularPrice } =
    cabins?.find((cabin) => cabin.id === Number(selectedCabin)) || {};

  if (isLoadingCabin || isLoadingSettings) return <Spinner />;

  const handleSelectChange = (e) => {
    setSelectedCabin(e.target.value);
  };

  function onSubmit(data) {
    const numNights = subtractDates(data.endDate, data.startDate) - 1;

    const calculatedAmount = regularPrice * numNights;

    const optionalBreakfastPrice =
      settings.breakfastPrice * numNights * Number(data.numGuests);

    const boolHasBreakfast = JSON.parse(data.hasBreakfast);
    const boolIsPaid = JSON.parse(data.isPaid);

    const newBooking = {
      cabinId: Number(data.cabin),
      endDate: data.endDate,
      guestId: guestId,
      isPaid: boolIsPaid,
      hasBreakfast: boolHasBreakfast,
      numGuests: Number(data.numGuests),
      observations: data.observations,
      startDate: data.startDate,
      status: data.status,
      totalPrice: boolHasBreakfast
        ? calculatedAmount + optionalBreakfastPrice
        : calculatedAmount,
      cabinPrice: calculatedAmount,
      extrasPrice: boolHasBreakfast ? optionalBreakfastPrice : 0,
      numNights,
    };

    if (isEditSession) {
      console.log("Editing booking", newBooking);
    } else {
      createBooking(newBooking, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin" error={errors?.cabin?.message}>
        <StyledSelect
          {...register("cabin", { required: "This field is required" })}
          onChange={handleSelectChange}
          value={selectedCabin}
        >
          {cabinsOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow
        label={`Cabin Capacity up to ${maxCapacity}`}
        error={errors?.numGuest?.message}
      >
        <Input
          type="number"
          id="numGuests"
          min={1}
          max={maxCapacity}
          defaultValue={1}
          {...register("numGuests", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="hasBreakfast" error={errors?.hasBreakfast?.message}>
        <StyledSelect {...register("hasBreakfast")}>
          {hasBreakfastOptions.map((option) => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>

      <FormRow label="isPaid" error={errors?.isPaid?.message}>
        <StyledSelect {...register("isPaid")}>
          {isPaidOptions.map((option) => (
            <option value={option.value} key={option.label}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow label="Status" error={errors?.status?.message}>
        <StyledSelect {...register("status")}>
          {statusOptions.map((option) => (
            <option value={option.value} key={option.key}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea
          type="text"
          id="observations"
          {...register("observations", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Cabin Price">
        <Input type="text" id="amount" disabled={true} value={regularPrice} />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button>{isEditSession ? "Edit cabin" : "Set Booking"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
