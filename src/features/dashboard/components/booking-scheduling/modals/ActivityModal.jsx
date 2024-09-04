import { Modal } from "react-bootstrap";
import activity from "../../../../../assets/images/yacht1.jpeg";
import Badge from "../../../../../ui/Badge";
import ActivityReservations from "./ActivityReservations";
import SelectField from "../../../../../ui/form-elements/SelectField";
import InputField from "../../../../../ui/form-elements/InputField";
import TextField from "../../../../../ui/form-elements/TextField";

const ActivityModal = ({ showModal, setShowModal }) => {
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
                <img src={activity} alt="activity" />
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h3 className="title">Maritime Adventures</h3>
                <h6 className="sub">Water activities</h6>
                <p>
                  Maritime Adventures offers a thrilling voyage into the heart
                  of aquatic exploration. Embark on a journey filled with
                  exhilarating activities, from sailing across pristine waters
                  to casting lines for the catch of the day. Whether you seek
                  tranquil moments amidst breathtaking scenery or crave the
                  adrenaline rush of water sports, our group promises
                  unforgettable experiences tailored to every adventurer s
                  desires. Join us aboard and unlock the endless possibilities
                  that the open sea has to offer
                </p>
                <div className="whatIncluded">
                  <h6>Whats including</h6>
                  <div className="includes">
                    <p>
                      Hot drinks <span>Ultimate</span>
                    </p>
                    <p>
                      Hot drinks <span>Ultimate</span>
                    </p>
                  </div>
                </div>
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
              <ActivityReservations />
            </div>
            <div className="col-lg-6 col-12 p-2">
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
            <div className="col-lg-6 col-12 p-2">
              <InputField
                label="Booking start at"
                id="booking_start_at"
                name="booking_start_at"
                type="time"
              />
            </div>
            <div className="col-12 p-2">
              <InputField
                label="Number of person"
                id="number_of_person"
                name="number_of_person"
                type="number"
                placeholder="00"
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

export default ActivityModal;
