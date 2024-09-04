import Modal from "react-bootstrap/Modal";
import SubmitButton from "./../form-elements/SubmitButton";

const ConfirmDeleteModal = ({
  showDeleteModal,
  setShowDeleteModal,
  deletionTarget,
  loading,
  onConfirm
}) => {
  return (
    <Modal
      show={showDeleteModal}
      onHide={() => setShowDeleteModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="row m-0 confirmation_modal">
          <div className="col-12 p-2">
            <p>
              {`You are about to remove `} <span>{deletionTarget}</span>{" "}
              {`. When you continue, you cannot go
              back. Do you want to confirm the deletion?`}
            </p>
          </div>
          <div className="col-12 p-2 d-flex gap-2">
            <button
              className="cancel"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <SubmitButton
              name={"Confirm"}
              className="confirm red"
              loading={loading}
              event={onConfirm}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmDeleteModal;
