import Button from "../../ui/Button";
import CreateBookingForm from "./CreateBookingForm";
import Modal from "../../ui/Modal";
import { useCabins } from "../cabins/useCabins";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";

function AddBooking({ guestId }) {
  const { cabins, isLoading: isLoadingCabin } = useCabins();

  return (
    <div>
      <Modal>
        <Modal.Open opens="booking-form">
          <Button size="small" variation="secondary">
            <HiMiniArrowRightOnRectangle />
          </Button>
        </Modal.Open>
        <Modal.Window name="booking-form">
          <CreateBookingForm
            cabins={cabins}
            isLoadingCabin={isLoadingCabin}
            guestId={guestId}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBooking;
