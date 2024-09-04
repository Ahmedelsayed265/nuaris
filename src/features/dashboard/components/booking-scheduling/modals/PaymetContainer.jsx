import React, { useState } from "react";
import CustomInputField from "../../../../ui/form-elements/CustomInputField";

const PaymetContainer = () => {
  const [paymentType, setPaymentType] = useState("cash");
  return (
    <div className="strocked_wrapper form_ui">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="title">Payment</h6>
        </div>
        <div className="col-12 p-2">
          <h6>Full Payment</h6>

          <div className="payment_tabs">
            <span className={`activeTab ${paymentType}`} />
            <div
              className={`tab ${paymentType === "cash" ? "active" : ""}`}
              onClick={() => setPaymentType("cash")}
            >
              <h6>Cash</h6>
            </div>
            <div
              className={`tab ${paymentType === "card" ? "active" : ""}`}
              onClick={() => setPaymentType("card")}
            >
              <h6>Card</h6>
            </div>
          </div>
        </div>
        <div className="col-12 p-2">
          {paymentType === "cash" ? (
            <CustomInputField
              label="Enter OTP"
              placeholder="OTP"
              id="otp"
              name="otp"
            />
          ) : (
            <div className="input-field">
              <label>Send Payment link to</label>
              <div className="media">
                <div className="checkField">
                  <input type="checkbox" name="media" id="email" />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="checkField">
                  <input type="checkbox" name="media" id="phone" />
                  <label htmlFor="phone">Phone number</label>
                </div>
                <div className="checkField">
                  <input type="checkbox" name="media" id="whatsApp" />
                  <label htmlFor="whatsApp">WhatsApp</label>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-12 p-2 mt-3">
          <div className="note">
            <h6 className="m-0">
              Note: By Verifying this OTP you Confirm receiving the Cash amount
              paid and agreed to the terms & conditions of Nuaris TechServices
              fees.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymetContainer;
