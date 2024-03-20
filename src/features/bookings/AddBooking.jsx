import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import Modal from "../../ui/Modal";
import { useCabins } from "../cabins/useCabins";

function AddBooking() {
  const { cabins, isLoading: isLoadingCabin } = useCabins();

  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button>Add new booking</Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm cabins={cabins} isLoadingCabin={isLoadingCabin} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
