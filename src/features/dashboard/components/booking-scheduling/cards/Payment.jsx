import InputField from "../../../../../ui/form-elements/InputField";

const Payment = ({ paymentType, setPaymentType }) => {
  return (
    <div className="payment_wapper">
      <div className="row m-0">
        <div className="col-12 p-2">
          <h6 className="form_title">Payment</h6>
        </div>
        <div className="col-12 p-2">
          <div className="checkboxs_inputs">
            <span
              className={`bg-active ${
                paymentType === "full payment" ? "left" : ""
              }`}
            />
            <label htmlFor="full_payment">
              <input
                type="radio"
                name="payment"
                id="full_payment"
                checked={paymentType === "full payment" ? true : false}
                onChange={() => {
                  setPaymentType("full payment");
                }}
              />
              <span>Full Payment</span>
            </label>
            <label htmlFor="advanced_payment">
              <input
                type="radio"
                name="payment"
                id="advanced_payment"
                checked={paymentType === "advanced payment" ? true : false}
                onChange={() => {
                  setPaymentType("advanced payment");
                }}
              />
              <span>Advanced Payment</span>
            </label>
          </div>
        </div>
        {paymentType === "advanced payment" && (
          <div className="col-12 p-2">
            <InputField
              label="Advanced Amount paid (Minimum 50%)"
              id=" percentage"
              name="percentage"
              type="number"
              placeholder="EX: 50%"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
