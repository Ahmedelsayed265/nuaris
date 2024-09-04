import Modal from "react-bootstrap/Modal";

const ConfirmModal = ({
  showConfirmModal,
  setShowConfirmModal,
  handleConfirm,
  message
}) => {
  return (
    <Modal
      show={showConfirmModal}
      onHide={() => setShowConfirmModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="row m-0 confirmation_modal">
          <div className="col-12 p-2">
            <p>{message}</p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button
              className="cancel"
              onClick={() => setShowConfirmModal(false)}
            >
              Cancel
            </button>
            <button className="confirm" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmModal;
