import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import { format } from "date-fns";

import { useForm } from "react-hook-form";
import Textarea from "../../ui/Textarea";

function CreateBookingForm({ bookingToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = bookingToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin">
        <Input
          type="text"
          id="cabin"
          {...register("cabin", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Guest">
        <Input
          type="text"
          id="guest"
          {...register("guest", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Start Date">
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "This field is required",
            // pattern: {
            //   value: format(getValues("date"), "yyyy-MM-dd"),
            //   message: "Please provide a valid date.",
            // },
          })}
        />
      </FormRow>
      <FormRow label="End Date">
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Number of Guests">
        <Input
          type="number"
          id="numGuest"
          {...register("numGuest", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Status">
        <Input
          type="text"
          id="status"
          {...register("status", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Observations">
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
          value={100}
          //   {...register("amount", {
          //     required: "This field is required",
          //   })}
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
