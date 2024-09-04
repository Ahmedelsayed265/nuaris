import { Modal } from "react-bootstrap";
import boat from "../../../../../assets/images/yacht2.jpeg";
import SelectField from "../../../../../ui/form-elements/SelectField";
import InputField from "../../../../../ui/form-elements/InputField";
import TextField from "../../../../../ui/form-elements/TextField";
import Badge from "../../../../../ui/Badge";

const BoatModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      size="lg"
      onHide={() => setShowModal(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton />
      <Modal.Body className="booking_modal form_ui">
        <div className="strocked_wrapper p-0 border-0">
          <div className="row m-0">
            <div className="col-12 p-2 pt-0 pb-0">
              <Badge state={1} content={"available"} />
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="img">
                <img src={boat} alt="boat" />
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h3 className="title">Santa Maria</h3>
                <h6 className="sub">Expert assistance </h6>
                <p>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using Content
                  here, content here, making it look like readable English. Many
                  desktop publishing packages and web page editors now use Lorem
                  Ipsum as their default model text, and a search for lorem
                  ipsum will uncover many web sites still in their infancy.
                  Various versions have evolved over the years, sometimes by
                  accident, sometimes on purpose
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>price:</p>
                <h6>
                  $500<span> / person</span>
                </h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Location:</p>
                <h6>Riyadh, Saudi Arabia</h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Capacity:</p>
                <h6>12</h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 p-2">
              <div className="bg_main10_card">
                <p>Capacity:</p>
                <h6>8</h6>
              </div>
            </div>
            <div className="col-12 p-2">
            </div>
            <div className="col-lg-4 col-12 p-2">
              <SelectField
                label="Rental type"
                id="rental_type"
                name="rental_type"
                options={[
                  { name: "full", value: "full" },
                  { name: "half", value: "half" }
                ]}
              />
            </div>
            <div className="col-lg-4 col-12 p-2">
              <SelectField
                label="Rental period"
                id="rental_period"
                name="rental_period"
                options={[
                  { name: "day", value: "day" },
                  { name: "week", value: "week" },
                  { name: "month", value: "month" }
                ]}
              />
            </div>
            <div className="col-lg-4 col-12 p-2">
              <InputField
                label="Booking start at"
                id="booking_start_at"
                name="booking_start_at"
                type="time"
              />
            </div>
            <div className="col-12 p-2">
              <TextField
                label="Client Notes"
                placeholder="write here"
                name="client_notes"
                id="client_notes"
              />
            </div>
            <div className="col-12 p-2">
              <button className="save">Confirm</button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BoatModal;
