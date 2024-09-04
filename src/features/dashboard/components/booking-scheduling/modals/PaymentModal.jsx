import { Modal } from "react-bootstrap";
import BookingInfo from "../cards/BookingInfo";

const PaymentModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h6>Payment</h6>
      </Modal.Header>
      <Modal.Body className="booking_modal form_ui">
        <BookingInfo />
        {/* <Id />
        <PaymentContainer /> */}
        <button>Confirm & Save</button>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentModal;
