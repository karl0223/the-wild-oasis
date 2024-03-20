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

function CreateBookingForm({
  cabins,
  isLoadingCabin,
  bookingToEdit = {},
  onCloseModal,
}) {
  const { id: editId, ...editValues } = bookingToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  const cabinsOptions = cabins?.map((cabin) => ({
    label: cabin.name,
    value: cabin.id,
  }));

  const [selectedCabin, setSelectedCabin] = useState(cabinsOptions?.[0]?.value);
  const [numGuest, setNumGuest] = useState(1);

  const { maxCapacity, regularPrice } =
    cabins?.find((cabin) => cabin.id === Number(selectedCabin)) || {};

  if (isLoadingCabin) return <Spinner />;

  const handleSelectChange = (e) => {
    setSelectedCabin(e.target.value);
  };

  const handleNumGuestChange = (e) => {
    setNumGuest(e.target.value);
  };

  function onSubmit(data) {
    const calculatedAmount = regularPrice * data.numGuest;
    const dataWithAmount = { ...data, amount: calculatedAmount };
    console.log(dataWithAmount);
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
      <FormRow label="Guest" error={errors?.guest?.message}>
        <Input
          type="text"
          id="guest"
          {...register("guest", {
            required: "This field is required",
          })}
        />
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
          id="numGuest"
          min={1}
          max={maxCapacity}
          defaultValue={1}
          {...register("numGuest", {
            required: "This field is required",
          })}
          onChange={handleNumGuestChange}
        />
      </FormRow>
      <FormRow label="Status" error={errors?.status?.message}>
        <Input
          type="text"
          id="status"
          {...register("status", {
            required: "This field is required",
          })}
        />
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
      <FormRow label="Amount">
        <Input
          type="text"
          id="amount"
          disabled={true}
          value={regularPrice * numGuest}
        />
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
