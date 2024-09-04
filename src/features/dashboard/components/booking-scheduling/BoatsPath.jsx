import { useState } from "react";
import { Form } from "react-bootstrap";
import SelectField from "./../../../../ui/form-elements/SelectField";
import BoatCard from "./cards/BoatCard";
import AddonRow from "./cards/AddonRow";
import IdRow from "./cards/IdRow";
import Payment from "./cards/Payment";
import BoatModal from "./modals/BoatModal";
import PaymentModal from "./modals/PaymentModal";

const BoatsPath = ({ setPath }) => {
  const [paymentType, setPaymentType] = useState("full payment");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="form_ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <div className="inner_card gap-0">
            <div className="row m-0">
              <div className="col-12 p-2">
                <h6 className="form_title">Boats Path</h6>
              </div>
              <div className="col-lg-6 col-12 p-2">
                <SelectField
                  label="Choose Destination"
                  id="destination"
                  name="destination"
                  options={[
                    { name: "Cairo", value: "Cairo" },
                    { name: "Giza", value: "Giza" }
                  ]}
                />
              </div>
              <div className="col-lg-6 col-12 p-2">
                <SelectField
                  label="Location"
                  id="location"
                  name="location"
                  options={[
                    { name: "Cairo", value: "Cairo" },
                    { name: "Giza", value: "Giza" }
                  ]}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <BoatCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <BoatCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <BoatCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <BoatCard handleBook={() => setShowModal(true)} />
              </div>
              <AddonRow />
              <div className="col-12 p-2">
                <div className="require_id_wrapper">
                  <div className="row m-0">
                    <div className="col-12 p-2 d-flex align-items-center justify-content-between">
                      <label htmlFor="require_id" className="form_title">
                        Require ID
                      </label>
                      <Form.Check
                        name="require_id"
                        id="require_id"
                        type="switch"
                      />
                    </div>
                    <IdRow />
                  </div>
                </div>
              </div>
              <div className="col-12 p-2">
                <Payment
                  paymentType={paymentType}
                  setPaymentType={setPaymentType}
                />
              </div>
              <div className="col-12 p-2">
                <div className="path_footer">
                  <button className="stroked" onClick={() => setPath("main")}>
                    Back
                  </button>
                  <div className="d-flex gap-2">
                    <button className="stroked">Preview</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BoatModal showModal={showModal} setShowModal={setShowModal} />
      <PaymentModal
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
      />
    </div>
  );
};

export default BoatsPath;
