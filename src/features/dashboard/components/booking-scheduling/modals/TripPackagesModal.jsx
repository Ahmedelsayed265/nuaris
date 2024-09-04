import { Modal } from "react-bootstrap";
import packageImg from "../../../../../assets/images/package.jpg";
import PackageReservations from "./PackageReservations";
import SelectField from "../../../../../ui/form-elements/SelectField";
import TextField from "../../../../../ui/form-elements/TextField";
import Badge from "../../../../../ui/Badge";

const TripPackagesModal = ({ showModal, setShowModal }) => {
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
                <img src={packageImg} alt="package" />
              </div>
            </div>
            <div className="col-lg-6 col-12 p-2">
              <div className="content">
                <h3 className="title">Sunset Cruise Special</h3>
                <p>
                  Enjoy a luxurious evening aboard the stunning Yacht Serenity
                  with our Sunset Cruise Special. Indulge in a gourmet dinner
                  served with exquisite champagne as you watch the sun dip below
                  the horizon. Truly an unforgettable experience!
                </p>
                <div className="whatIncluded">
                  <h6>Addons & Avtivities</h6>
                  <div className="includes">
                    <p>
                      Inflatable boat <span>X2</span>
                    </p>
                    <p>
                      Jet ski <span>X4</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>price:</p>
                <h6>
                  $500<span> / person</span>
                </h6>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>Capacity:</p>
                <h6>12</h6>
              </div>
            </div>
            <div className="col-lg-4 col-12 p-2">
              <div className="bg_main10_card">
                <p>Available:</p>
                <h6>8</h6>
              </div>
            </div>
            <div className="col-12 p-2">
              <PackageReservations />
            </div>
            <div className="col-12 p-2">
              <SelectField
                label="Number of person"
                id="number_of_person"
                name="number_of_person"
                options={[
                  { value: "1", name: "1" },
                  { value: "2", name: "2" },
                  { value: "3", name: "3" },
                  { value: "4", name: "4" },
                  { value: "5", name: "5" },
                  { value: "6", name: "6" },
                  { value: "7", name: "7" },
                  { value: "8", name: "8" },
                  { value: "9", name: "9" },
                  { value: "10", name: "10" }
                ]}
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

export default TripPackagesModal;
