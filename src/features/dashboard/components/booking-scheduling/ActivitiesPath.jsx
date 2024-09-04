import { useState } from "react";
import SelectField from "../../../../ui/form-elements/SelectField";
import ActivityCard from "./cards/ActivityCard";
import InputField from "../../../../ui/form-elements/InputField";
import Payment from "./cards/Payment";
import ActivityModal from "./modals/ActivityModal";
import PaymentModal from "./modals/PaymentModal";

const ActivitiesPath = ({ setPath }) => {
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
                <h6 className="form_title">Activities Path</h6>
              </div>
              <div className="col-lg-2 col-5 p-2">
                <SelectField
                  label="Price type"
                  id="price_type"
                  name="price_type"
                  options={[
                    { name: "Per Person", value: "per person" },
                    { name: "Per Group", value: "per group" },
                    { name: "Per Trip", value: "per trip" }
                  ]}
                />
              </div>
              <div className="col-lg-10 col-7 p-2">
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
                <ActivityCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <ActivityCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <ActivityCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-lg-3 col-md-6 col-12 p-2">
                <ActivityCard handleBook={() => setShowModal(true)} />
              </div>
              <div className="col-12 p-2">
                <InputField
                  label={"Quantity"}
                  id="quantity"
                  name="quantity"
                  type="number"
                  placeholder="00"
                />
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
                    <button
                      className="stroked"
                      onClick={() => setShowPaymentModal(true)}
                    >
                      Preview
                    </button>
                    <button className="filled">Add More Booking</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivityModal showModal={showModal} setShowModal={setShowModal} />
      <PaymentModal
        showModal={showPaymentModal}
        setShowModal={setShowPaymentModal}
      />
    </div>
  );
};

export default ActivitiesPath;
