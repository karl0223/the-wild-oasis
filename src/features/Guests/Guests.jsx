import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import GuestSignupForm from "./GuestSignupForm";
import GuestsTable from "./GuestsTable";

function Guests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Guests</Heading>
      </Row>

      <Row>
        <GuestsTable />
      </Row>

      <Row>
        <Heading as="h2">Add a Guest</Heading>
        <GuestSignupForm />
      </Row>
    </>
  );
}

export default Guests;
