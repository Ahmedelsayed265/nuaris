import React from "react";

const Otpcontainer = () => {
  return (
    <div className="otp-container">
      <input
        className="otp-input"
        type="number"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]"
        required
        id="finput"
      />
      <input
        className="otp-input"
        type="number"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]"
        required
      />
      <input
        className="otp-input"
        type="number"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]"
        required
      />
      <input
        className="otp-input"
        type="number"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]"
        required
      />
      <input
        className="otp-input"
        type="number"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]"
        required
      />
      <input
        className="otp-input"
        type="number"
        maxlength="1"
        inputmode="numeric"
        pattern="[0-9]"
        required
      />
    </div>
  );
};

export default Otpcontainer;
